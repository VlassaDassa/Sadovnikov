const TEXT_BLOCK_SELECTOR = 'p,h1,h2,h3,h4,h5,h6,li,blockquote';
const INLINE_CONTAINER_SELECTOR = 'p,h1,h2,h3,h4,h5,h6';
const BLOCK_SELECTOR = 'address,article,aside,blockquote,div,figure,figcaption,h1,h2,h3,h4,h5,h6,hr,ol,p,pre,section,table,ul';

function isBlock(node: Node): node is HTMLElement {
    return node.nodeType === Node.ELEMENT_NODE && (node as Element).matches(BLOCK_SELECTOR);
}

function elementFor(node: Node): Element | null {
    return node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement;
}

function hasContent(node: Node): boolean {
    return Boolean(node.textContent?.replace(/\u200b/g, '').trim()) || Boolean(
        'querySelector' in node && (node as ParentNode).querySelector('img,video,audio,iframe,hr,br'),
    );
}

function caretAt(node: Node, atEnd = false): Range {
    const range = node.ownerDocument!.createRange();
    range.selectNodeContents(node);
    range.collapse(!atEnd);
    return range;
}

function safeRange(editor: HTMLElement, inputRange: Range | null): Range {
    if (inputRange && editor.contains(inputRange.startContainer) && editor.contains(inputRange.endContainer)) {
        return inputRange.cloneRange();
    }
    return caretAt(editor, true);
}

function editableParagraph(owner: Document, content?: DocumentFragment): HTMLParagraphElement {
    const paragraph = owner.createElement('p');
    if (content) paragraph.append(content);
    if (!paragraph.hasChildNodes()) paragraph.append(owner.createElement('br'));
    return paragraph;
}

function topChild(editor: HTMLElement, node: Node): Node | null {
    if (node === editor) return null;
    let current = node;
    while (current.parentNode && current.parentNode !== editor) current = current.parentNode;
    return current.parentNode === editor ? current : null;
}

function contentBefore(host: Node, range: Range): DocumentFragment {
    const before = host.ownerDocument!.createRange();
    before.selectNodeContents(host);
    before.setEnd(range.startContainer, range.startOffset);
    return before.cloneContents();
}

function contentAfter(host: Node, range: Range): DocumentFragment {
    const after = host.ownerDocument!.createRange();
    after.selectNodeContents(host);
    after.setStart(range.endContainer, range.endOffset);
    return after.cloneContents();
}

function cloneWithContent(host: Node, content: DocumentFragment): Node {
    const clone = host.cloneNode(false);
    if (clone instanceof Element) clone.removeAttribute('id');
    clone.appendChild(content);
    return clone;
}

function wrapInlineRuns(container: HTMLElement): void {
    let paragraph: HTMLParagraphElement | null = null;
    for (const node of Array.from(container.childNodes)) {
        if (isBlock(node)) {
            paragraph = null;
            continue;
        }
        if (!paragraph && node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) continue;
        if (!paragraph) {
            paragraph = container.ownerDocument.createElement('p');
            container.insertBefore(paragraph, node);
        }
        paragraph.append(node);
    }
}

/** Normalize a detached copy; never reset the live editor DOM while typing. */
export function normalizeVisualHtml(html: string): string {
    const container = document.createElement('div');
    container.innerHTML = html;

    // Earlier presets inserted block notes inside headings. Split that heading
    // around each block while keeping formatting, classes and column layouts.
    let invalid = Array.from(container.querySelectorAll(INLINE_CONTAINER_SELECTOR))
        .find((node) => node.querySelector(BLOCK_SELECTOR));
    while (invalid) {
        const nested = invalid.querySelector(BLOCK_SELECTOR)!;
        const range = document.createRange();
        range.selectNode(nested);
        const before = contentBefore(invalid, range);
        const after = contentAfter(invalid, range);
        const replacement = document.createDocumentFragment();
        if (hasContent(before)) replacement.append(cloneWithContent(invalid, before));
        replacement.append(nested);
        if (hasContent(after)) replacement.append(cloneWithContent(invalid, after));
        invalid.replaceWith(replacement);
        invalid = Array.from(container.querySelectorAll(INLINE_CONTAINER_SELECTOR))
            .find((node) => node.querySelector(BLOCK_SELECTOR));
    }

    wrapInlineRuns(container);
    return container.innerHTML;
}

function ensureTextBlock(editor: HTMLElement, range: Range): { block: HTMLElement; range: Range } {
    const nearest = elementFor(range.startContainer)?.closest(TEXT_BLOCK_SELECTOR);
    if (nearest instanceof HTMLElement && editor.contains(nearest)) return { block: nearest, range };

    const owner = editor.ownerDocument;
    const marker = owner.createElement('span');
    range.insertNode(marker);
    const parent = marker.parentElement!;
    let first: Node = marker;
    while (first.previousSibling && !isBlock(first.previousSibling)) first = first.previousSibling;
    const paragraph = owner.createElement('p');
    parent.insertBefore(paragraph, first);
    let current: Node | null = first;
    while (current && !isBlock(current)) {
        const next: Node | null = current.nextSibling;
        paragraph.append(current);
        current = next;
    }
    const restored = owner.createRange();
    restored.setStartBefore(marker);
    restored.collapse(true);
    marker.remove();
    return { block: paragraph, range: restored };
}

/** One Enter creates a paragraph. Shift+Enter creates a visible line break. */
export function insertEditorParagraph(editor: HTMLElement, inputRange: Range | null, softBreak = false): Range {
    let range = safeRange(editor, inputRange);
    range.deleteContents();
    range.collapse(true);
    const owner = editor.ownerDocument;
    const listItem = elementFor(range.startContainer)?.closest('li');
    if (listItem instanceof HTMLLIElement && editor.contains(listItem) && !softBreak) {
        const list = listItem.parentElement;
        if (list instanceof HTMLOListElement || list instanceof HTMLUListElement) {
            const listItemHasMeaningfulContent = Boolean(listItem.textContent?.replace(/\u200b/g, '').trim())
                || Boolean(listItem.querySelector('img,video,audio,iframe,hr'));
            if (!listItemHasMeaningfulContent) {
                const paragraph = editableParagraph(owner);
                list.after(paragraph);
                return caretAt(paragraph);
            }
            const afterRange = owner.createRange();
            afterRange.selectNodeContents(listItem);
            afterRange.setStart(range.startContainer, range.startOffset);
            const after = afterRange.extractContents();
            const next = owner.createElement('li');
            if (hasContent(after)) next.append(after);
            else next.append(owner.createElement('br'));
            listItem.after(next);
            return caretAt(next);
        }
    }
    const closestNote = elementFor(range.startContainer)?.closest('aside.note');
    const note = closestNote instanceof HTMLElement && editor.contains(closestNote) ? closestNote : null;
    const ensured = note && !softBreak ? { block: note, range } : ensureTextBlock(editor, range);
    range = ensured.range;

    if (softBreak) {
        const trailing = contentAfter(ensured.block, range);
        const needsPlaceholder = !hasContent(trailing);
        const lineBreak = owner.createElement('br');
        range.insertNode(lineBreak);
        if (needsPlaceholder) lineBreak.after(owner.createElement('br'));
        range.setStartAfter(lineBreak);
        range.collapse(true);
        return range;
    }

    const block = note ?? ensured.block;
    if (note && !hasContent(contentBefore(note, range)) && hasContent(note)) {
        const previous = editableParagraph(owner);
        note.before(previous);
        return caretAt(previous);
    }
    const afterRange = owner.createRange();
    afterRange.selectNodeContents(block);
    afterRange.setStart(range.startContainer, range.startOffset);
    const after = afterRange.extractContents();
    const next = editableParagraph(owner);

    if (note === block) {
        // Content following the caret leaves the note, including its paragraph
        // wrappers. This prevents subsequent typing inheriting the callout.
        const holder = owner.createElement('div');
        holder.append(after);
        for (const nested of Array.from(holder.querySelectorAll(INLINE_CONTAINER_SELECTOR))) {
            if (nested.previousSibling) nested.before(owner.createElement('br'));
            nested.replaceWith(...Array.from(nested.childNodes));
        }
        if (hasContent(holder)) next.replaceChildren(...Array.from(holder.childNodes));
    } else if (hasContent(after)) {
        next.replaceChildren(after);
    }

    if (!hasContent(block)) block.replaceChildren(owner.createElement('br'));
    block.after(next);
    return caretAt(next);
}

/** Apply a note to just the selection; applying inside a note removes it. */
export function applyEditorNote(editor: HTMLElement, inputRange: Range | null): Range {
    const owner = editor.ownerDocument;
    const range = safeRange(editor, inputRange);
    const existing = elementFor(range.startContainer)?.closest('aside.note');
    if (existing instanceof HTMLElement && editor.contains(existing) && existing.contains(range.endContainer)) {
        const holder = owner.createElement('div');
        holder.append(...Array.from(existing.childNodes));
        wrapInlineRuns(holder);
        if (!holder.hasChildNodes()) holder.append(editableParagraph(owner));
        const last = holder.lastChild!;
        existing.replaceWith(...Array.from(holder.childNodes));
        return caretAt(last, true);
    }

    if (range.collapsed) {
        const ensured = ensureTextBlock(editor, range);
        range.selectNodeContents(ensured.block);
    }

    const start = topChild(editor, range.startContainer);
    const end = topChild(editor, range.endContainer);
    const note = owner.createElement('aside');
    note.className = 'note';

    if (start && end && start instanceof HTMLElement && end instanceof HTMLElement) {
        const before = contentBefore(start, range);
        const after = contentAfter(end, range);
        note.append(range.cloneContents());
        wrapInlineRuns(note);
        if (!note.hasChildNodes()) note.append(editableParagraph(owner));
        const replacement = owner.createDocumentFragment();
        if (hasContent(before)) replacement.append(cloneWithContent(start, before));
        replacement.append(note);
        if (hasContent(after)) replacement.append(cloneWithContent(end, after));
        const deletion = owner.createRange();
        deletion.setStartBefore(start);
        deletion.setEndAfter(end);
        deletion.deleteContents();
        deletion.insertNode(replacement);
    } else {
        note.append(range.extractContents());
        wrapInlineRuns(note);
        if (!note.hasChildNodes()) note.append(editableParagraph(owner));
        range.insertNode(note);
    }
    return caretAt(note, true);
}

/** Insert images/templates as blocks, splitting an enclosing paragraph first. */
export function insertEditorHtml(editor: HTMLElement, inputRange: Range | null, html: string): Range {
    let range = safeRange(editor, inputRange);
    const owner = editor.ownerDocument;
    const template = owner.createElement('template');
    template.innerHTML = html;
    const content = template.content;
    if (!content.hasChildNodes()) return range;
    const insertsBlock = Array.from(content.childNodes).some(isBlock);
    range.deleteContents();
    range.collapse(true);

    if (!insertsBlock) {
        const ensured = ensureTextBlock(editor, range);
        range = ensured.range;
        const last = content.lastChild!;
        range.insertNode(content);
        range.setStartAfter(last);
        range.collapse(true);
        return range;
    }

    const enclosing = elementFor(range.startContainer)?.closest(INLINE_CONTAINER_SELECTOR);
    if (enclosing instanceof HTMLElement && editor.contains(enclosing)) {
        const afterRange = owner.createRange();
        afterRange.selectNodeContents(enclosing);
        afterRange.setStart(range.startContainer, range.startOffset);
        const after = afterRange.extractContents();
        const trailing = hasContent(after) ? cloneWithContent(enclosing, after) : editableParagraph(owner);
        const insertion = owner.createDocumentFragment();
        insertion.append(content, trailing);
        enclosing.after(insertion);
        if (!hasContent(enclosing)) enclosing.remove();
        return caretAt(trailing);
    }

    const trailing = editableParagraph(owner);
    content.append(trailing);
    range.insertNode(content);
    return caretAt(trailing);
}
