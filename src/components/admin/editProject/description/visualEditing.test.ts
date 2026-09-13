import { describe, expect, it } from 'vitest';

import { applyEditorNote, insertEditorHtml, insertEditorParagraph, normalizeVisualHtml } from './visualEditing';

function editorWith(html: string): HTMLDivElement {
    const editor = document.createElement('div');
    editor.contentEditable = 'true';
    editor.innerHTML = html;
    return editor;
}

function textRange(node: Node, start: number, end = start): Range {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    return range;
}

describe('description visual editing', () => {
    it('creates the next editable paragraph on the first Enter at the end of text', () => {
        const editor = editorWith('<p>First paragraph</p>');
        const caret = insertEditorParagraph(editor, textRange(editor.firstChild!.firstChild!, 15));

        expect(editor.innerHTML).toBe('<p>First paragraph</p><p><br></p>');
        expect(caret.startContainer).toBe(editor.lastChild);
        expect(caret.startOffset).toBe(0);
        expect(caret.collapsed).toBe(true);
    });

    it('Enter in an empty paragraph creates another visible paragraph immediately', () => {
        const editor = editorWith('<p><br></p>');
        const caret = insertEditorParagraph(editor, textRange(editor.firstChild!, 0));

        expect(editor.innerHTML).toBe('<p><br></p><p><br></p>');
        expect(caret.startContainer).toBe(editor.lastChild);
    });

    it('splits paragraphs and preserves the inline formatting on both sides', () => {
        const editor = editorWith('<p>One <strong>two three</strong></p>');
        insertEditorParagraph(editor, textRange(editor.querySelector('strong')!.firstChild!, 3));

        expect(editor.innerHTML).toBe('<p>One <strong>two</strong></p><p><strong> three</strong></p>');
    });

    it('creates a sibling list item instead of an invalid paragraph inside the list', () => {
        const editor = editorWith('<ul><li>First item</li></ul>');
        const caret = insertEditorParagraph(editor, textRange(editor.querySelector('li')!.firstChild!, 10));

        expect(editor.innerHTML).toBe('<ul><li>First item</li><li><br></li></ul>');
        expect(caret.startContainer).toBe(editor.querySelectorAll('li')[1]);
    });

    it('exits an empty list item into a normal paragraph', () => {
        const editor = editorWith('<ul><li><br></li></ul>');
        const caret = insertEditorParagraph(editor, textRange(editor.querySelector('li')!, 0));

        expect(editor.innerHTML).toBe('<ul><li><br></li></ul><p><br></p>');
        expect(caret.startContainer).toBe(editor.lastChild);
    });

    it('Shift+Enter at the end adds a caret placeholder so the new line is visible', () => {
        const editor = editorWith('<p>Hello</p>');
        const caret = insertEditorParagraph(editor, textRange(editor.firstChild!.firstChild!, 5), true);

        expect(editor.innerHTML).toBe('<p>Hello<br><br></p>');
        expect(caret.startContainer).toBe(editor.firstChild);
        expect(caret.startOffset).toBe(2);
    });

    it('applies a note only to selected heading text without nesting blocks inside the heading', () => {
        const editor = editorWith('<h2>Before selected after</h2>');
        const caret = applyEditorNote(editor, textRange(editor.firstChild!.firstChild!, 7, 15));

        expect(editor.innerHTML).toBe('<h2>Before </h2><aside class="note"><p>selected</p></aside><h2> after</h2>');
        expect(editor.querySelector('h2 aside')).toBeNull();
        expect(caret.startContainer).toBe(editor.querySelector('aside'));
        expect(caret.collapsed).toBe(true);
    });

    it('leaves the note on the first Enter, so following text is a plain paragraph', () => {
        const editor = editorWith('<aside class="note"><p>A useful note</p></aside>');
        const caret = insertEditorParagraph(editor, textRange(editor.querySelector('p')!.firstChild!, 13));

        expect(editor.innerHTML).toBe('<aside class="note"><p>A useful note</p></aside><p><br></p>');
        expect(caret.startContainer).toBe(editor.lastChild);
    });

    it('splits a note at the caret and continues its remaining text outside the note', () => {
        const editor = editorWith('<aside class="note"><p>Note continued</p></aside>');
        insertEditorParagraph(editor, textRange(editor.querySelector('p')!.firstChild!, 4));

        expect(editor.innerHTML).toBe('<aside class="note"><p>Note</p></aside><p> continued</p>');
    });

    it('can leave the note immediately after applying its preset without adding empty note content', () => {
        const editor = editorWith('<p>Selected text</p>');
        const noteCaret = applyEditorNote(editor, textRange(editor.firstChild!.firstChild!, 0, 13));
        insertEditorParagraph(editor, noteCaret);

        expect(editor.innerHTML).toBe('<aside class="note"><p>Selected text</p></aside><p><br></p>');
    });

    it('Enter at the beginning of a note inserts an ordinary paragraph before it', () => {
        const editor = editorWith('<aside class="note"><p>Note</p></aside>');
        const caret = insertEditorParagraph(editor, textRange(editor.querySelector('p')!.firstChild!, 0));

        expect(editor.innerHTML).toBe('<p><br></p><aside class="note"><p>Note</p></aside>');
        expect(caret.startContainer).toBe(editor.firstChild);
    });

    it('toggles a note back into ordinary paragraphs', () => {
        const editor = editorWith('<aside class="note"><p>Note</p></aside>');
        applyEditorNote(editor, textRange(editor.querySelector('p')!.firstChild!, 1, 3));

        expect(editor.innerHTML).toBe('<p>Note</p>');
    });

    it('inserts a block image between paragraph halves and places the caret after the image', () => {
        const editor = editorWith('<p>Before after</p>');
        const caret = insertEditorHtml(editor, textRange(editor.firstChild!.firstChild!, 6), '<figure><img src="/photo.png" alt="Photo"></figure>');

        expect(editor.innerHTML).toBe('<p>Before</p><figure><img src="/photo.png" alt="Photo"></figure><p> after</p>');
        expect(caret.startContainer).toBe(editor.lastChild);
        expect(editor.querySelector('p figure')).toBeNull();
    });

    it('inserts links inline without breaking a paragraph', () => {
        const editor = editorWith('<p>Read this</p>');
        insertEditorHtml(editor, textRange(editor.firstChild!.firstChild!, 5, 9), '<a href="https://example.com">article</a>');

        expect(editor.innerHTML).toBe('<p>Read <a href="https://example.com">article</a></p>');
    });

    it('repairs old notes nested inside headings and wraps naked text independently', () => {
        const html = normalizeVisualHtml('Intro<h2>Title<aside class="note">Detail</aside>After</h2>Tail');

        expect(html).toBe('<p>Intro</p><h2>Title</h2><aside class="note">Detail</aside><h2>After</h2><p>Tail</p>');
    });

    it('preserves existing structural wrappers, classes, inline style and image dimensions', () => {
        const html = '<div class="two-columns" style="display:grid"><div><p>Left</p></div><div><figure><img src="/photo.png" width="240"></figure></div></div>';

        expect(normalizeVisualHtml(html)).toBe(html);
    });
});
