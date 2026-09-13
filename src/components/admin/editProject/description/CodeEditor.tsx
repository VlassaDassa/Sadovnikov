/* CodeMirror owns both the text and gutter. Keeping a single document prevents line-wrap drift. */
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { defaultKeymap, indentWithTab, history, historyKeymap, indentSelection, insertNewlineAndIndent } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { syntaxHighlighting, defaultHighlightStyle, indentOnInput, indentUnit } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView, drawSelection, highlightActiveLine, keymap, lineNumbers } from '@codemirror/view';
import styles from './CodeEditor.module.scss';

export type CodeLanguage = 'html' | 'css';
export interface CodeEditorHandle {
    insertText: (text: string) => void;
    getSelection: () => string;
    format: (value?: string) => void;
}
interface Props {
    value: string;
    language: CodeLanguage;
    ariaLabel: string;
    onChange: (value: string) => void;
}

const theme = EditorView.theme({
    '&': { backgroundColor: '#0d0d10', color: '#e1ddf5', height: '100%', fontSize: '15px' },
    '.cm-scroller': { fontFamily: 'Ubuntu, ui-monospace, SFMono-Regular, Consolas, monospace', lineHeight: '1.7', overflow: 'auto' },
    '.cm-content': { padding: '24px 22px', caretColor: '#f4f0ff', minHeight: '390px' },
    '.cm-line': { padding: '0' },
    // The app reset makes every span a block. CodeMirror's token spans must
    // remain inline or one HTML tag is rendered across several visual lines.
    '.cm-line span': { display: 'inline' },
    '.cm-gutters': { backgroundColor: '#0d0d10', color: '#676276', border: '0', borderRight: '1px solid rgba(255,255,255,.09)', minHeight: '100%' },
    '.cm-gutterElement': { padding: '0 14px 0 12px', minWidth: '42px', textAlign: 'right' },
    '.cm-activeLine': { backgroundColor: 'rgba(117,78,255,.07)' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(117,78,255,.12)', color: '#c6b9ff' },
    '.cm-selectionBackground, ::selection': { backgroundColor: 'rgba(116,79,255,.35) !important' },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#bba6ff' },
    '.cm-matchingBracket': { backgroundColor: 'rgba(142,108,255,.28)', outline: '1px solid rgba(177,151,255,.65)' },
}, { dark: true });

const CodeEditor = forwardRef<CodeEditorHandle, Props>(function CodeEditor({ value, language, ariaLabel, onChange }, ref) {
    const host = useRef<HTMLDivElement>(null);
    const view = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);
    const valueRef = useRef(value);
    onChangeRef.current = onChange;

    useEffect(() => {
        const parent = host.current;
        if (!parent) return;
        const languageExtension = language === 'html' ? html({ autoCloseTags: true }) : css();
        const state = EditorState.create({
            doc: value,
            extensions: [
                lineNumbers(), drawSelection(), highlightActiveLine(), history(), indentOnInput(), indentUnit.of('  '),
                keymap.of([{ key: 'Enter', run: insertNewlineAndIndent }, ...defaultKeymap, ...historyKeymap, indentWithTab, { key: 'Mod-Alt-f', run: indentSelection }]),
                languageExtension, syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                theme, EditorView.lineWrapping,
                EditorView.contentAttributes.of({ 'aria-label': ariaLabel, role: 'textbox', 'aria-multiline': 'true' }),
                EditorView.updateListener.of(update => {
                    if (!update.docChanged) return;
                    const next = update.state.doc.toString();
                    valueRef.current = next;
                    onChangeRef.current(next);
                }),
            ],
        });
        const editorView = new EditorView({ state, parent });
        view.current = editorView;
        valueRef.current = value;
        return () => { editorView.destroy(); view.current = null; };
        // A language change recreates the parser but keeps the actual value.
        // The view is intentionally recreated only when its language/label
        // changes. The controlled value is synchronized by the next effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, ariaLabel]);

    useEffect(() => {
        const editorView = view.current;
        if (!editorView || value === valueRef.current) return;
        const current = editorView.state.doc.toString();
        if (current !== value) editorView.dispatch({ changes: { from: 0, to: current.length, insert: value } });
        valueRef.current = value;
    }, [value]);

    useImperativeHandle(ref, () => ({
        insertText(text) {
            const editorView = view.current;
            if (!editorView) return;
            const { from, to } = editorView.state.selection.main;
            editorView.dispatch({ changes: { from, to, insert: text }, selection: { anchor: from + text.length }, scrollIntoView: true });
            editorView.focus();
        },
        getSelection() {
            const editorView = view.current;
            return editorView ? editorView.state.sliceDoc(editorView.state.selection.main.from, editorView.state.selection.main.to) : '';
        },
        format(next) {
            const editorView = view.current;
            if (!editorView) return;
            const source = next ?? editorView.state.doc.toString();
            editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: source }, selection: { anchor: Math.min(source.length, editorView.state.selection.main.head) } });
            editorView.focus();
        },
    }), []);

    return <div ref={host} className={styles.editor} aria-label={ariaLabel} />;
});

export default CodeEditor;
