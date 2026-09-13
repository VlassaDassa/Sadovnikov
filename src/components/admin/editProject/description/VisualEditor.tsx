'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { prepareDescriptionImage } from '@/lib/descriptionImageUpload';
import { uploadProjectImage } from '@/lib/uploads/uploadProjectImage';
import { escapeHtml } from '@/lib/projectDescriptionEditor';
import { applyEditorNote, insertEditorHtml, insertEditorParagraph, normalizeVisualHtml } from './visualEditing';
import styles from './VisualEditor.module.scss';

export interface VisualEditorHandle {
    preset: (id: string) => void;
    command: (command: string) => void;
    insertImage: (url: string) => void;
    upload: (files: File[]) => void;
}

interface Props {
    html: string;
    projectId: number;
    label: string;
    onChange: (html: string) => void;
    onBusyChange: (busy: boolean) => void;
}

interface ImageBox { left: number; top: number; width: number; height: number }
type Corner = 'nw' | 'ne' | 'sw' | 'se';
type DropLocation = { block: HTMLElement; before: boolean };
type UploadJob = { id: string; name: string; file: File; previewUrl: string; controller: AbortController; error?: string };
type Bookmark = { start: number[]; startOffset: number; end: number[]; endOffset: number };
type Snapshot = { html: string; selection: Bookmark | null };

function cleanHtml(html: string) {
    return DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
        FORBID_ATTR: ['contenteditable'],
    });
}

function linkUrl(value: string) {
    const text = value.trim();
    if (!text || /\s/.test(text)) return null;
    // A pasted word is still text, not an implicit host name.
    if (!/^(https?:\/\/|mailto:)/i.test(text) && !/^(?:www\.)?[\p{L}\d-]+(?:\.[\p{L}\d-]+)+(?:[/:?#].*)?$/u.test(text)) return null;
    try {
        const url = new URL(/^[a-z]+:/i.test(text) ? text : `https://${text}`);
        return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
}

function imageSourceUrl(value: string) {
    const text = value.trim();
    const candidate = text.startsWith('/') && !text.startsWith('//') ? text : linkUrl(text);
    if (!candidate || candidate.startsWith('mailto:')) return null;
    const path = candidate.split(/[?#]/, 1)[0].toLowerCase();
    const directImage = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(path);
    const imageHost = /(?:^|\/\/)(?:images\.unsplash\.com|source\.unsplash\.com|i\.imgur\.com|res\.cloudinary\.com)(?:\/|$)/i.test(candidate);
    return directImage || imageHost ? candidate : null;
}

const VisualEditor = forwardRef<VisualEditorHandle, Props>(function VisualEditor({ html, projectId, label, onChange, onBusyChange }, ref) {
    const editor = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLDivElement>(null);
    const selected = useRef<HTMLImageElement | null>(null);
    const savedRange = useRef<Range | null>(null);
    const lastHtml = useRef(html);
    const callbacks = useRef({ onChange, onBusyChange });
    const history = useRef<Snapshot[]>([]);
    const historyIndex = useRef(-1);
    const lastTyping = useRef(0);
    const jobs = useRef(new Map<string, UploadJob>());
    const draggedImage = useRef<HTMLImageElement | null>(null);
    const dropLocation = useRef<DropLocation | null>(null);
    const drag = useRef<{ corner: Corner; x: number; y: number; width: number; height: number; ratio: number; maxWidth: number; frame: number; nextWidth: number } | null>(null);
    const [imageBox, setImageBox] = useState<ImageBox | null>(null);
    const [resizing, setResizing] = useState(false);
    const [dropMarker, setDropMarker] = useState<{ top: number; left: number; width: number } | null>(null);
    const [notice, setNotice] = useState('');
    const [uploads, setUploads] = useState<UploadJob[]>([]);
    const [historyState, setHistoryState] = useState({ undo: false, redo: false });

    useEffect(() => { callbacks.current = { onChange, onBusyChange }; }, [onChange, onBusyChange]);

    const measureImage = useCallback(() => {
        const image = selected.current;
        const host = canvas.current;
        if (!image || !image.isConnected || !host) {
            selected.current = null;
            setImageBox(null);
            return;
        }
        const bounds = image.getBoundingClientRect();
        const parent = host.getBoundingClientRect();
        setImageBox({ left: bounds.left - parent.left, top: bounds.top - parent.top + host.scrollTop, width: bounds.width, height: bounds.height });
    }, []);

    const clearImageDrag = useCallback(() => {
        draggedImage.current?.classList.remove(styles.draggingImage);
        draggedImage.current = null;
        dropLocation.current = null;
        setDropMarker(null);
    }, []);

    const findDropBlock = (target: EventTarget | null): HTMLElement | null => {
        const host = editor.current;
        const element = target instanceof HTMLElement ? target : null;
        const block = element?.closest('figure,p,h1,h2,h3,h4,h5,h6,aside,blockquote,ul,ol');
        return block instanceof HTMLElement && host?.contains(block) ? block : null;
    };

    const updateImageDropTarget = (event: React.DragEvent<HTMLDivElement>) => {
        const source = draggedImage.current?.closest('figure') ?? draggedImage.current;
        const host = canvas.current;
        const pointed = document.elementFromPoint(event.clientX, event.clientY) ?? event.target;
        const block = findDropBlock(pointed);
        if (!source || !block || block === source || source.contains(block) || !host) {
            dropLocation.current = null;
            setDropMarker(null);
            return;
        }
        const bounds = block.getBoundingClientRect();
        const parent = host.getBoundingClientRect();
        const before = event.clientY < bounds.top + bounds.height / 2;
        dropLocation.current = { block, before };
        setDropMarker({
            top: (before ? bounds.top : bounds.bottom) - parent.top + host.scrollTop - 2,
            left: bounds.left - parent.left,
            width: bounds.width,
        });
    };

    const moveDraggedImage = () => {
        const source = draggedImage.current?.closest('figure') ?? draggedImage.current;
        const location = dropLocation.current;
        if (!source || !location || source === location.block || source.contains(location.block)) return false;
        const parent = location.block.parentElement;
        if (!parent) return false;
        const reference = location.before ? location.block : location.block.nextSibling;
        if (reference === source) return false;
        parent.insertBefore(source, reference);
        const range = document.createRange();
        range.selectNodeContents(source);
        range.collapse(false);
        placeCaret(range);
        publish();
        return true;
    };

    useEffect(() => {
        const host = editor.current;
        if (!host) return;
        if (html !== lastHtml.current || !host.childNodes.length) {
            host.innerHTML = normalizeVisualHtml(cleanHtml(html)) || '<p><br></p>';
            host.querySelectorAll('img').forEach(image => { image.draggable = true; });
            savedRange.current = null;
            lastHtml.current = html;
        }
        if (!history.current.length) {
            history.current = [{ html: host.innerHTML, selection: null }];
            historyIndex.current = 0;
        }
    }, [html]);

    useEffect(() => {
        const observer = new ResizeObserver(measureImage);
        if (editor.current) observer.observe(editor.current);
        window.addEventListener('resize', measureImage);
        return () => { observer.disconnect(); window.removeEventListener('resize', measureImage); };
    }, [measureImage]);

    useEffect(() => {
        const activeJobs = jobs.current;
        return () => {
            activeJobs.forEach(job => { job.controller.abort(); URL.revokeObjectURL(job.previewUrl); });
            activeJobs.clear();
        };
    }, []);

    const getRange = () => {
        const host = editor.current;
        if (!host) return null;
        const selection = window.getSelection();
        const current = selection?.rangeCount ? selection.getRangeAt(0) : null;
        if (current && host.contains(current.commonAncestorContainer)) return current.cloneRange();
        if (savedRange.current && host.contains(savedRange.current.commonAncestorContainer)) return savedRange.current.cloneRange();
        const range = document.createRange();
        range.selectNodeContents(host);
        range.collapse(false);
        return range;
    };

    const placeCaret = (range: Range) => {
        editor.current?.focus({ preventScroll: true });
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        savedRange.current = range.cloneRange();
    };

    const bookmark = (): Bookmark | null => {
        const range = getRange();
        const host = editor.current;
        if (!range || !host) return null;
        const path = (node: Node) => {
            const result: number[] = [];
            while (node !== host && node.parentNode) {
                result.unshift(Array.from(node.parentNode.childNodes).indexOf(node as ChildNode));
                node = node.parentNode;
            }
            return result;
        };
        return { start: path(range.startContainer), startOffset: range.startOffset, end: path(range.endContainer), endOffset: range.endOffset };
    };

    const serializableHtml = () => {
        const clone = editor.current?.cloneNode(true) as HTMLElement | undefined;
        if (!clone) return '';
        clone.querySelectorAll('[data-editor-upload]').forEach(node => node.remove());
        return normalizeVisualHtml(clone.innerHTML);
    };

    const publish = (typing = false) => {
        const liveUploads = new Set(Array.from(editor.current?.querySelectorAll('[data-editor-upload]') ?? [])
            .map(node => node.getAttribute('data-editor-upload'))
            .filter((id): id is string => Boolean(id)));
        let prunedUpload = false;
        jobs.current.forEach((job, id) => {
            if (liveUploads.has(id)) return;
            job.controller.abort();
            URL.revokeObjectURL(job.previewUrl);
            jobs.current.delete(id);
            prunedUpload = true;
        });
        if (prunedUpload) updateUploads();
        const value = serializableHtml();
        lastHtml.current = value;
        callbacks.current.onChange(value);
        if (jobs.current.size === 0) {
            const snapshot = { html: value, selection: bookmark() };
            const entries = history.current.slice(0, historyIndex.current + 1);
            if (entries.at(-1)?.html !== value) {
                if (typing && Date.now() - lastTyping.current < 600 && entries.length > 1) entries[entries.length - 1] = snapshot;
                else entries.push(snapshot);
                history.current = entries.slice(-80);
                historyIndex.current = history.current.length - 1;
            }
            lastTyping.current = typing ? Date.now() : 0;
        }
        setHistoryState({ undo: historyIndex.current > 0, redo: historyIndex.current < history.current.length - 1 });
        measureImage();
    };

    const undoRedo = (direction: number) => {
        const host = editor.current;
        const index = historyIndex.current + direction;
        if (!host || jobs.current.size || !history.current[index]) return;
        const snapshot = history.current[index];
        historyIndex.current = index;
        host.innerHTML = snapshot.html || '<p><br></p>';
        savedRange.current = null;
        selected.current = null;
        measureImage();
        const range = document.createRange();
        range.selectNodeContents(host);
        range.collapse(false);
        if (snapshot.selection) {
            const locate = (path: number[]) => path.reduce<Node>((node, index) => node.childNodes[index] ?? node, host);
            const { start, end, startOffset, endOffset } = snapshot.selection;
            const startNode = locate(start), endNode = locate(end);
            try {
                range.setStart(startNode, Math.min(startOffset, startNode.nodeType === 3 ? startNode.textContent?.length ?? 0 : startNode.childNodes.length));
                range.setEnd(endNode, Math.min(endOffset, endNode.nodeType === 3 ? endNode.textContent?.length ?? 0 : endNode.childNodes.length));
            } catch { range.selectNodeContents(host); range.collapse(false); }
        }
        placeCaret(range);
        lastHtml.current = snapshot.html;
        callbacks.current.onChange(snapshot.html);
        lastTyping.current = 0;
        setHistoryState({ undo: index > 0, redo: index < history.current.length - 1 });
    };

    const insert = (markup: string) => {
        if (!editor.current) return;
        placeCaret(insertEditorHtml(editor.current, getRange(), cleanHtml(markup)));
        editor.current.querySelectorAll('img').forEach(image => { image.draggable = true; });
        publish();
    };

    const insertImageFromUrl = (url: string) => {
        const value = url.trim();
        const valid = value.startsWith('/') && !value.startsWith('//') ? value : linkUrl(value);
        if (!valid || valid.startsWith('mailto:')) { setNotice('Use an image URL starting with https:// or /'); return; }
        insert(`<figure><img src="${escapeHtml(valid)}" alt="Project image"></figure>`);
        setNotice('Image inserted. Click it to resize.');
    };

    const updateUploads = () => {
        const pending = Array.from(jobs.current.values());
        setUploads(pending);
        callbacks.current.onBusyChange(pending.length > 0);
    };

    const uploadJob = async (job: UploadJob) => {
        const timeout = window.setTimeout(() => job.controller.abort(), 60000);
        try {
            const file = await prepareDescriptionImage(job.file, job.controller.signal);
            const result = await uploadProjectImage({ file, projectId, category: 'description-image', signal: job.controller.signal });
            const figure = editor.current?.querySelector(`[data-editor-upload="${job.id}"]`);
            const image = figure?.querySelector('img');
            if (!figure || !image || job.controller.signal.aborted) {
                jobs.current.delete(job.id);
                URL.revokeObjectURL(job.previewUrl);
                updateUploads();
                if (!job.controller.signal.aborted) publish();
                return;
            }
            image.src = result.url;
            image.alt = job.file.name.replace(/\.[^.]+$/, '') || 'Project image';
            figure.removeAttribute('data-editor-upload');
            figure.querySelector('figcaption')?.remove();
            jobs.current.delete(job.id);
            const releasePreview = () => { URL.revokeObjectURL(job.previewUrl); measureImage(); };
            image.addEventListener('load', releasePreview, { once: true });
            image.addEventListener('error', releasePreview, { once: true });
            if (image.complete) releasePreview();
            updateUploads();
            publish();
            setNotice('Image uploaded');
        } catch (error) {
            if (!editor.current || !jobs.current.has(job.id)) return;
            job.error = job.controller.signal.aborted ? 'Upload timed out. Try again.' : (error instanceof Error ? error.message : 'Upload failed');
            updateUploads();
        } finally { window.clearTimeout(timeout); }
    };

    const upload = (files: File[]) => {
        const host = editor.current;
        if (!host) return;
        files.slice(0, 5).forEach(file => {
            if (!file.type.startsWith('image/')) return;
            const job: UploadJob = { id: crypto.randomUUID(), name: file.name || 'Clipboard image', file, previewUrl: URL.createObjectURL(file), controller: new AbortController() };
            jobs.current.set(job.id, job);
            placeCaret(insertEditorHtml(host, getRange(), `<figure data-editor-upload="${job.id}"><img src="${job.previewUrl}" alt="Uploading image"><figcaption>Uploading…</figcaption></figure>`));
            host.querySelectorAll('img').forEach(image => { image.draggable = true; });
            updateUploads();
            void uploadJob(job);
        });
    };

    const command = (name: string) => {
        if (name === 'undo' || name === 'redo') { undoRedo(name === 'undo' ? -1 : 1); return; }
        const range = getRange();
        if (!range) return;
        placeCaret(range);
        document.execCommand(name, false);
        publish();
    };

    const preset = (id: string) => {
        const host = editor.current;
        if (!host) return;
        const range = getRange();
        if (id === 'note') placeCaret(applyEditorNote(host, range));
        else if (id === 'heading' || id === 'paragraph') {
            if (!range) return;
            placeCaret(range);
            document.execCommand('formatBlock', false, id === 'heading' ? 'h2' : 'p');
        } else if (id === 'list') { command('insertUnorderedList'); return; }
        else if (id === 'image') { setNotice('Paste an image URL or image file directly into the editor.'); return; }
        publish();
    };

    useImperativeHandle(ref, () => ({ command, preset, insertImage: insertImageFromUrl, upload }));

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        const files = Array.from(event.clipboardData.items ?? []).filter(item => item.kind === 'file' && item.type.startsWith('image/')).map(item => item.getAsFile()).filter((file): file is File => file !== null);
        if (files.length) { event.preventDefault(); upload(files); return; }
        const text = event.clipboardData.getData('text/plain');
        const range = getRange();
        const url = linkUrl(text);
        const image = imageSourceUrl(text);
        if (image && range?.collapsed) {
            event.preventDefault();
            insertImageFromUrl(image);
            return;
        }
        if (url && range && !range.collapsed && range.toString().trim()) {
            event.preventDefault();
            placeCaret(range);
            document.execCommand('createLink', false, url);
            publish();
            return;
        }
        event.preventDefault();
        const rich = event.clipboardData.getData('text/html');
        if (rich) {
            const temp = document.createElement('div');
            temp.innerHTML = cleanHtml(rich);
            const embedded = Array.from(temp.querySelectorAll('img')).filter(image => image.src.startsWith('data:image/'));
            embedded.forEach(image => image.remove());
            if (temp.textContent?.trim() || temp.querySelector('img')) insert(temp.innerHTML);
            embedded.forEach(image => {
                void fetch(image.src).then(response => response.blob()).then(blob => upload([new File([blob], 'Clipboard image.png', { type: blob.type })]));
            });
        } else if (text) {
            const blocks = text.split(/\r?\n\s*\r?\n/).filter(Boolean)
                .map(block => `<p>${escapeHtml(block).replace(/\r?\n/g, '<br>')}</p>`)
                .join('');
            if (blocks) insert(blocks);
        }
    };

    const keyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.nativeEvent.isComposing) return;
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); undoRedo(event.shiftKey ? 1 : -1); return; }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); undoRedo(1); return; }
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (!selected.current) selected.current = imageAtCaret(event.key === 'Backspace' ? 'before' : 'after');
            if (selected.current) { event.preventDefault(); removeImage(); return; }
        }
        if (event.key === 'Escape') { selected.current = null; measureImage(); return; }
        if (event.key !== 'Enter' || !editor.current) return;
        event.preventDefault();
        placeCaret(insertEditorParagraph(editor.current, getRange(), event.shiftKey));
        publish();
    };

    const finishResize = (event: React.PointerEvent<HTMLButtonElement>) => {
        const state = drag.current;
        if (!state) return;
        cancelAnimationFrame(state.frame);
        if (selected.current) selected.current.style.width = `${Math.round(state.nextWidth)}px`;
        drag.current = null;
        setResizing(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        publish();
    };

    const startResize = (event: React.PointerEvent<HTMLButtonElement>, corner: Corner) => {
        const image = selected.current;
        if (!image || !editor.current) return;
        event.preventDefault();
        event.stopPropagation();
        const bounds = image.getBoundingClientRect();
        const available = image.parentElement?.clientWidth ?? editor.current.clientWidth;
        drag.current = { corner, x: event.clientX, y: event.clientY, width: bounds.width, height: bounds.height, ratio: bounds.width / Math.max(1, bounds.height), maxWidth: available, frame: 0, nextWidth: bounds.width };
        window.getSelection()?.removeAllRanges();
        event.currentTarget.setPointerCapture(event.pointerId);
        setResizing(true);
    };

    const moveResize = (event: React.PointerEvent<HTMLButtonElement>) => {
        const state = drag.current;
        if (!state) return;
        const dx = (event.clientX - state.x) * (state.corner.endsWith('w') ? -1 : 1);
        const dy = (event.clientY - state.y) * (state.corner.startsWith('n') ? -1 : 1) * state.ratio;
        const change = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
        state.nextWidth = Math.min(state.maxWidth, Math.max(64, state.width + change));
        cancelAnimationFrame(state.frame);
        state.frame = requestAnimationFrame(() => {
            if (!selected.current) return;
            selected.current.style.width = `${Math.round(state.nextWidth)}px`;
            selected.current.style.height = 'auto';
            measureImage();
        });
    };

    const removeImage = () => {
        const image = selected.current;
        if (!image) return;
        const parent = image.closest('figure');
        const pendingId = parent?.getAttribute('data-editor-upload');
        if (pendingId) {
            const job = jobs.current.get(pendingId);
            job?.controller.abort();
            if (job) URL.revokeObjectURL(job.previewUrl);
            jobs.current.delete(pendingId);
            updateUploads();
        }
        (parent ?? image).remove();
        selected.current = null;
        measureImage();
        publish();
    };

    const imageAtCaret = (direction: 'before' | 'after') => {
        const host = editor.current;
        const range = getRange();
        if (!host || !range?.collapsed) return null;
        const boundary = range.startContainer;
        const length = boundary.nodeType === Node.TEXT_NODE ? boundary.textContent?.length ?? 0 : boundary.childNodes.length;
        const atBoundary = direction === 'before' ? range.startOffset === 0 : range.startOffset === length;
        if (!atBoundary) return null;
        let block: HTMLElement | null = boundary instanceof HTMLElement ? boundary : boundary.parentElement;
        while (block && block.parentElement !== host) block = block.parentElement;
        const sibling = direction === 'before' ? block?.previousElementSibling : block?.nextElementSibling;
        return sibling?.matches('figure') ? sibling.querySelector('img') : null;
    };

    return <div className={styles.shell}>
        <div className={styles.tools}>
            <button type="button" title="Undo (Ctrl+Z)" disabled={!historyState.undo || uploads.length > 0} onMouseDown={e => e.preventDefault()} onClick={() => undoRedo(-1)}>↶ Undo</button>
            <button type="button" title="Redo (Ctrl+Shift+Z)" disabled={!historyState.redo || uploads.length > 0} onMouseDown={e => e.preventDefault()} onClick={() => undoRedo(1)}>↷ Redo</button>
            <span className={styles.separator} />
            <button type="button" aria-label="Bold" title="Bold (Ctrl+B)" onMouseDown={e => e.preventDefault()} onClick={() => command('bold')}><strong>B</strong></button>
            <button type="button" aria-label="Italic" title="Italic (Ctrl+I)" onMouseDown={e => e.preventDefault()} onClick={() => command('italic')}><em>I</em></button>
            <button type="button" title="Bulleted list" onMouseDown={e => e.preventDefault()} onClick={() => command('insertUnorderedList')}>• List</button>
            <span className={styles.shortcut}>Ctrl+V over selected text → link</span>
        </div>
        <div ref={canvas} className={`${styles.canvas} ${resizing ? styles.resizing : ''}`}>
            <div ref={editor} className={styles.content} contentEditable suppressContentEditableWarning role="textbox" aria-label={label} aria-multiline="true"
                onInput={() => publish(true)} onKeyDown={keyDown} onPaste={handlePaste}
                onMouseUp={() => { savedRange.current = getRange(); }} onKeyUp={() => { savedRange.current = getRange(); }}
                onLoadCapture={measureImage}
                onDragStart={event => {
                    if (!(event.target instanceof HTMLImageElement)) return;
                    draggedImage.current = event.target;
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', 'description-image');
                    event.target.classList.add(styles.draggingImage);
                    setDropMarker(null);
                }}
                onPointerDown={event => {
                    if (event.target instanceof HTMLImageElement) {
                        event.stopPropagation();
                        selected.current = event.target;
                        editor.current?.focus({ preventScroll: true });
                        measureImage();
                    } else { selected.current = null; measureImage(); }
                }}
                onDrop={event => {
                    if (draggedImage.current) {
                        event.preventDefault();
                        updateImageDropTarget(event);
                        moveDraggedImage();
                        clearImageDrag();
                        return;
                    }
                    if (event.dataTransfer.files.length) {
                        event.preventDefault();
                        clearImageDrag();
                        upload(Array.from(event.dataTransfer.files));
                    }
                }}
                onDragOver={event => {
                    if (draggedImage.current) {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        updateImageDropTarget(event);
                    } else if (event.dataTransfer.types.includes('Files')) {
                        event.preventDefault();
                    }
                }}
                onDragEnd={clearImageDrag}
                onDragLeave={event => {
                    if (event.currentTarget === event.target) clearImageDrag();
                }} />
            {dropMarker && <div className={styles.dropIndicator} style={{ top: dropMarker.top, left: dropMarker.left, width: dropMarker.width }} aria-hidden="true" />}
            {imageBox && <div className={`${styles.imageFrame} ${resizing ? styles.activeResize : ''}`} style={{ left: imageBox.left, top: imageBox.top, width: imageBox.width, height: imageBox.height }}>
                <div className={styles.imageTools}>
                    <span>{Math.round(imageBox.width)} × {Math.round(imageBox.height)}</span>
                    <button type="button" onClick={() => { if (selected.current) { selected.current.style.width = '100%'; publish(); } }}>Full width</button>
                    <button type="button" onClick={removeImage} aria-label="Remove selected image">Remove</button>
                </div>
                {(['nw', 'ne', 'sw', 'se'] as Corner[]).map(corner => <button key={corner} type="button" className={`${styles.handle} ${styles[corner]}`} aria-label={`Resize image ${corner}`} onPointerDown={e => startResize(e, corner)} onPointerMove={moveResize} onPointerUp={finishResize} onPointerCancel={finishResize}
                    onKeyDown={e => {
                        if (!['ArrowLeft', 'ArrowRight'].includes(e.key) || !selected.current) return;
                        e.preventDefault();
                        selected.current.style.width = `${Math.max(64, imageBox.width + (e.key === 'ArrowRight' ? 10 : -10))}px`;
                        publish();
                    }} />)}
            </div>}
        </div>
        {uploads.length > 0 && <div className={styles.uploads} aria-live="polite">{uploads.map(job => <div key={job.id} className={job.error ? styles.uploadError : styles.uploadProgress}>
            <span>{job.error ? `${job.name}: ${job.error}` : `Uploading ${job.name}…`}</span>
            {job.error && <button type="button" onClick={() => { job.error = undefined; job.controller = new AbortController(); updateUploads(); void uploadJob(job); }}>Retry</button>}
            <button type="button" onClick={() => { job.controller.abort(); editor.current?.querySelector(`[data-editor-upload="${job.id}"]`)?.remove(); jobs.current.delete(job.id); URL.revokeObjectURL(job.previewUrl); updateUploads(); publish(); }}>Cancel</button>
        </div>)}</div>}
        <div className={styles.footer}><span>Enter — new paragraph · Shift+Enter — line break</span><span role="status">{notice}</span></div>
    </div>;
});

export default VisualEditor;
