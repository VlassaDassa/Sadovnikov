'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import SectionBackground from '@/components/admin/general/sectionBackground';
import SectionTitle from '@/components/admin/general/sectionTitle';
import Icon from '@/components/shared/icons/Icon';
import type { EditProjectProps, IProjectDescription } from '@/interfaces/general';
import { buildProjectPreviewDocument, getProjectPreviewFontCss, legacyTextToHtml, parseProjectDescription, serializeProjectDescription, type ProjectDescriptionDocument } from '@/lib/projectDescriptionEditor';
import { DESCRIPTION_IMAGE_ACCEPT } from '@/lib/descriptionImageUpload';
import { cssVars } from '@/styles/cssVariables';
import CodeEditor, { type CodeEditorHandle } from './CodeEditor';
import { formatDescriptionSource } from './formatSource';
import VisualEditor, { type VisualEditorHandle } from './VisualEditor';
import styles from './index.module.scss';

type Language = 'en' | 'ru';
type Mode = 'visual' | 'code';
type Source = 'html' | 'css';

const presets = [
    { id: 'paragraph', label: 'Paragraph', html: '<p>Paragraph text</p>' },
    { id: 'heading', label: 'Heading', html: '<h2>Section heading</h2>' },
    { id: 'note', label: 'Note', html: '<aside class="note"><p>Project note</p></aside>' },
    { id: 'list', label: 'Bulleted list', html: '<ul><li>First point</li><li>Second point</li></ul>' },
];

function toDocument(value?: string): ProjectDescriptionDocument {
    return parseProjectDescription(value) ?? { version: 1, html: legacyTextToHtml(value), css: '' };
}

interface EditorProps {
    item: IProjectDescription;
    projectId: number;
    language: Language;
    mode: Mode;
    busy: boolean;
    onBusyChange: (busy: boolean) => void;
    onModeChange: (mode: Mode) => void;
    setData: EditProjectProps['setData'];
}

function DescriptionEditor({ item, projectId, language, mode, busy, onBusyChange, onModeChange, setData }: EditorProps) {
    const [document, setDocument] = useState(() => toDocument(language === 'ru' ? item.contentRu : item.content));
    const documentRef = useRef(document);
    const [source, setSource] = useState<Source>('html');
    const [presetId, setPresetId] = useState('');
    const [previewOpen, setPreviewOpen] = useState(true);
    const [previewValue, setPreviewValue] = useState(document);
    const [formatting, setFormatting] = useState(false);
    const [message, setMessage] = useState('');
    const [previewFontCss, setPreviewFontCss] = useState('');
    const visualRef = useRef<VisualEditorHandle>(null);
    const codeRef = useRef<CodeEditorHandle>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const previewId = useId();
    const previewDocument = useMemo(() => buildProjectPreviewDocument(previewValue, previewFontCss), [previewValue, previewFontCss]);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setPreviewFontCss(getProjectPreviewFontCss()));
        return () => window.cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const timer = window.setTimeout(() => setPreviewValue(document), 400);
        return () => window.clearTimeout(timer);
    }, [document]);

    const update = (patch: Partial<ProjectDescriptionDocument>) => {
        const next = { ...documentRef.current, ...patch };
        documentRef.current = next;
        setDocument(next);
        const field = language === 'ru' ? 'contentRu' : 'content';
        setData(previous => ({ ...previous, description: previous.description.map(block => block.id === item.id ? { ...block, [field]: serializeProjectDescription(next) } : block) }));
    };

    const changeMode = async (next: Mode) => {
        if (busy || formatting || mode === next) return;
        if (next === 'code') {
            setFormatting(true);
            setMessage('');
            const original = documentRef.current;
            try {
                const [html, css] = await Promise.all([formatDescriptionSource(original.html, 'html'), formatDescriptionSource(original.css, 'css')]);
                if (documentRef.current === original) update({ html, css });
            } catch { setMessage('Some markup could not be formatted. You can still edit it in Code.'); }
            finally { setFormatting(false); }
        }
        onModeChange(next);
    };

    const applyPreset = () => {
        const preset = presets.find(option => option.id === presetId);
        if (!preset) return;
        if (mode === 'visual') visualRef.current?.preset(preset.id);
        else if (source === 'html') codeRef.current?.insertText(preset.html);
    };

    return <article className={styles.editorCard}>
        <header className={styles.editorHeader}>
            <div className={styles.editorHeading}>
                <span className={styles.iconWrapper}><Icon name={item.icon || 'text'} size={20} strokeColor={cssVars.white} fillColor="none" /></span>
                <div><h3 className={styles.itemTitle}>{language === 'ru' ? item.titleRu || item.title : item.title}</h3><p className={styles.itemHint}>Write, format and illustrate your project story.</p></div>
            </div>
            <div className={styles.modeTabs} role="tablist" aria-label="Editor mode">
                {(['visual', 'code'] as Mode[]).map(option => <button key={option} type="button" role="tab" aria-selected={mode === option} className={`${styles.modeTab} ${mode === option ? styles.active : ''}`} disabled={busy || formatting} onClick={() => void changeMode(option)}>{option === 'visual' ? 'Visual' : formatting ? 'Formatting…' : '〈/〉 Code'}</button>)}
            </div>
        </header>

        <div className={styles.editorToolbar}>
            {mode === 'code' && <div className={styles.sourceTabs} role="tablist" aria-label="Source type">{(['html', 'css'] as Source[]).map(option => <button key={option} type="button" role="tab" aria-selected={source === option} className={`${styles.sourceTab} ${source === option ? styles.active : ''}`} onClick={() => setSource(option)}>{option.toUpperCase()}</button>)}</div>}
            {(mode === 'visual' || source === 'html') && <div className={styles.presetControls}>
                <select className={styles.presetSelect} value={presetId} onChange={event => setPresetId(event.target.value)} aria-label="Choose a preset">
                    <option value="">Preset</option>{presets.map(preset => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
                </select>
                <button type="button" className={styles.toolbarButton} onMouseDown={event => event.preventDefault()} onClick={applyPreset} disabled={!presetId}>Apply</button>
            </div>}
            {mode === 'visual' && <div className={styles.imageControls}>
                <span className={styles.pasteHint}>Paste an image URL or file directly into the editor</span>
                <button type="button" className={styles.uploadButton} onMouseDown={event => event.preventDefault()} onClick={() => inputRef.current?.click()}>↑ Upload image</button>
                <input ref={inputRef} type="file" multiple accept={DESCRIPTION_IMAGE_ACCEPT} className={styles.fileInput} onChange={event => { visualRef.current?.upload(Array.from(event.currentTarget.files ?? [])); event.currentTarget.value = ''; }} />
            </div>}
        </div>

        <div className={styles.workspace} key={mode}>
            {mode === 'visual'
                ? <VisualEditor ref={visualRef} html={document.html} projectId={projectId} label={`Visual description editor for ${item.title}`} onChange={html => update({ html })} onBusyChange={onBusyChange} />
                : <CodeEditor ref={codeRef} value={document[source]} language={source} ariaLabel={`${source.toUpperCase()} source for ${item.title}`} onChange={value => update({ [source]: value })} />}
        </div>
        {message && <p className={styles.status} role="status">{message}</p>}
        <div className={styles.previewPane}>
            <button className={styles.previewHeader} type="button" aria-expanded={previewOpen} aria-controls={previewId} onClick={() => setPreviewOpen(open => !open)}>
                <strong>Preview</strong><span>{previewOpen ? 'Hide preview −' : 'Show preview +'}</span>
            </button>
            {previewOpen && <iframe id={previewId} className={styles.previewFrame} title="__PREVIEW_TITLE__" srcDoc={previewDocument} sandbox="allow-same-origin" />}
        </div>
    </article>;
}

export default function Description({ project, setData }: EditProjectProps) {
    const [requestedId, setRequestedId] = useState<number | null>(project.description[0]?.id ?? null);
    const [language, setLanguage] = useState<Language>('en');
    const [mode, setMode] = useState<Mode>('visual');
    const [busy, setBusy] = useState(false);
    const selected = project.description.find(item => item.id === requestedId) ?? project.description[0];
    const selectId = useId();

    return <section className={styles.section}>
        <SectionTitle title="DESCRIPTION" text="A story worth reading, one section at a time" counter count={project.description.length} />
        <div className={styles.descriptionPicker}>
            <label htmlFor={selectId}>Section</label>
            <select id={selectId} value={selected?.id ?? ''} disabled={busy || !selected} onChange={event => setRequestedId(Number(event.target.value))}>
                {project.description.map(item => <option key={item.id} value={item.id}>{language === 'ru' ? item.titleRu || item.title : item.title}</option>)}
            </select>
            <div className={styles.languageSwitch} aria-label="Content language">{(['en', 'ru'] as Language[]).map(option => <button key={option} type="button" aria-pressed={language === option} disabled={busy} className={`${styles.languageButton} ${language === option ? styles.active : ''}`} onClick={() => setLanguage(option)}>{option.toUpperCase()}</button>)}</div>
            {busy && <span className={styles.uploadHint} role="status">Images are uploading — keep editing your text.</span>}
        </div>
        <SectionBackground className={styles.editorList}>
            {selected ? <DescriptionEditor key={`${project.id}-${selected.id}-${language}`} item={selected} projectId={project.id} setData={setData} language={language} mode={mode} onModeChange={setMode} busy={busy} onBusyChange={setBusy} /> : <p className={styles.itemHint}>No description sections yet.</p>}
        </SectionBackground>
    </section>;
}
