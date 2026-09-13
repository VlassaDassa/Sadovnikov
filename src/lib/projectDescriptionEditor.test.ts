import { describe, expect, it } from 'vitest';
import { buildProjectPreviewDocument, legacyTextToHtml, parseProjectDescription, sanitizeProjectHtml } from './projectDescriptionEditor';

describe('project description documents', () => {
    it('migrates legacy authored markup instead of escaping it into visible tags', () => {
        expect(legacyTextToHtml('<p>Read <a href="https://example.com">the docs</a></p>'))
            .toBe('<p>Read <a href="https://example.com">the docs</a></p>');
        expect(legacyTextToHtml('&lt;p&gt;Read &lt;a href=&quot;https://example.com&quot;&gt;the docs&lt;/a&gt;&lt;/p&gt;'))
            .toBe('<p>Read <a href="https://example.com">the docs</a></p>');
    });

    it('keeps ordinary legacy text in paragraphs and removes executable markup', () => {
        expect(legacyTextToHtml('First line\n\nSecond line')).toBe('<p>First line</p>\n<p>Second line</p>');
        expect(sanitizeProjectHtml('<p>Safe</p><script>alert(1)</script>')).toBe('<p>Safe</p>');
    });

    it('decodes entity encoded HTML inside the saved document format', () => {
        const parsed = parseProjectDescription(JSON.stringify({
            version: 1,
            html: '&lt;h2&gt;Title&lt;/h2&gt;',
            css: '',
        }));
        expect(parsed?.html).toBe('<h2>Title</h2>');
    });

    it('includes the same baseline layout in the live preview', () => {
        const preview = buildProjectPreviewDocument({ version: 1, html: '<aside class="note"><p>Note</p></aside>', css: '' }, '@font-face { font-family: Ubuntu; }');
        expect(preview).toContain('@font-face { font-family: Ubuntu; }');
        expect(preview).toContain(':where(.note, blockquote)');
        expect(preview).toContain('<aside class="note">');
    });
});
