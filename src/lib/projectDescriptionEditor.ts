import { cssVars } from '@/styles/cssVariables';

export const PROJECT_DESCRIPTION_DOCUMENT_VERSION = 1;

export interface ProjectDescriptionDocument {
    version: typeof PROJECT_DESCRIPTION_DOCUMENT_VERSION;
    html: string;
    css: string;
}

const emptyDocument = (): ProjectDescriptionDocument => ({
    version: PROJECT_DESCRIPTION_DOCUMENT_VERSION,
    html: '',
    css: '',
});

export function parseProjectDescription(value: string | null | undefined): ProjectDescriptionDocument | null {
    if (!value?.trim()) {
        return emptyDocument();
    }

    try {
        const parsed: unknown = JSON.parse(value);

        if (
            parsed &&
            typeof parsed === 'object' &&
            'version' in parsed &&
            parsed.version === PROJECT_DESCRIPTION_DOCUMENT_VERSION &&
            'html' in parsed &&
            typeof parsed.html === 'string' &&
            'css' in parsed &&
            typeof parsed.css === 'string'
        ) {
            return {
                version: PROJECT_DESCRIPTION_DOCUMENT_VERSION,
                html: decodeStoredMarkup(parsed.html),
                css: parsed.css,
            };
        }
    } catch {
        // No operation
    }

    return null;
}

export function serializeProjectDescription(document: ProjectDescriptionDocument): string {
    return JSON.stringify({
        version: PROJECT_DESCRIPTION_DOCUMENT_VERSION,
        html: document.html,
        css: document.css,
    });
}

export function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

/** Recover markup that older editor versions stored as HTML entities. */
export function decodeStoredMarkup(value: string): string {
    if (!/&lt;\/?(?:p|h[1-6]|a|aside|blockquote|ul|ol|li|figure|img|br|strong|em|pre|code)\b/i.test(value)) {
        return value;
    }

    return value
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&#039;', "'")
        .replaceAll('&amp;', '&');
}

export function legacyTextToHtml(value: string | null | undefined): string {
    const raw = decodeStoredMarkup(value?.trim() ?? '');
    // Older editor versions stored authored markup directly in the text
    // column. Migrate that content as markup so saved links, notes and
    // headings remain functional instead of becoming visible tag text.
    if (/<\/?(?:p|h[1-6]|a|aside|blockquote|ul|ol|li|figure|img|br|strong|em|pre|code)\b/i.test(raw)) {
        return sanitizeProjectHtml(raw);
    }
    const paragraphs = (value ?? '').split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

    if (paragraphs.length === 0) {
        return '';
    }

    return paragraphs
        .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll('\n', '<br />')}</p>`)
        .join('\n');
}

export function sanitizeProjectHtml(value: string): string {
    // Keep the sanitizer deterministic on the server and in the browser. A
    // browser-only sanitizer such as DOMPurify can normalize markup slightly
    // differently during hydration, which makes React report a mismatch.
    return value
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
        .replace(/<(object|embed|form|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<\/?(object|embed|form|style)[^>]*>/gi, '')
        .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/\s(href|src|xlink:href)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, (attribute) => (
            /javascript\s*:/i.test(attribute) ? '' : attribute
        ))
        .replace(/javascript\s*:/gi, '');
}

export function sanitizeProjectCss(value: string): string {
    return value
        .replace(/<\/?style[^>]*>/gi, '')
        .replace(/@import[^;{}]*;?/gi, '')
        .replace(/url\s*\(\s*["']?\s*javascript:[^)]*\)/gi, '');
}

/** Call after mount to reuse the site's self-hosted Ubuntu files inside the preview. */
export function getProjectPreviewFontCss(): string {
    if (typeof document === 'undefined') return '';
    const fontFaces = new Set<string>();
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            for (const rule of Array.from(sheet.cssRules)) {
                if (rule.type !== CSSRule.FONT_FACE_RULE) continue;
                const face = rule as CSSFontFaceRule;
                if (!/ubuntu/i.test(face.style.getPropertyValue('font-family'))) continue;
                const base = sheet.href || document.baseURI;
                // srcdoc resolves paths relative to the page, not the parent stylesheet.
                const css = rule.cssText.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g, (_match, _quote: string, url: string) => (
                    `url("${new URL(url.trim(), base).href}")`
                ));
                fontFaces.add(css);
            }
        } catch {
            // Browsers deny access to rules in cross-origin stylesheets.
        }
    }
    return Array.from(fontFaces).join('\n');
}

export function buildProjectPreviewDocument(document: ProjectDescriptionDocument, fontCss = ''): string {
    const html = sanitizeProjectHtml(document.html);
    const css = sanitizeProjectCss(document.css);

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
${fontCss}
:root { color-scheme: dark; }
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
body {
    padding: 30px clamp(18px, 3vw, 32px);
    background: ${cssVars.neutral_1000};
    color: ${cssVars.neutral_200};
    font-family: Ubuntu, Arial, sans-serif;
    font-size: 18px;
    line-height: 1.75;
    white-space: normal;
    overflow-wrap: anywhere;
}
:where(h1, h2, h3, h4, h5, h6, p, figure, aside, blockquote, ul, ol, pre) { margin: 0 0 1em; }
:where(h1, h2, h3, h4, h5, h6) { color: ${cssVars.white}; font-family: inherit; line-height: 1.3; }
:where(h1) { font-size: 1.85em; }
:where(h2) { font-size: 1.55em; }
:where(h3) { font-size: 1.25em; }
:where(h4, h5, h6) { font-size: 1.1em; }
:where(p) { min-height: 1.75em; }
:where(ul, ol) { padding-left: 1.5em; }
:where(ul) { list-style: disc; }
:where(ol) { list-style: decimal; }
:where(li) { padding-left: .25em; }
:where(li)::marker { color: ${cssVars.brand_500}; }
:where(li + li) { margin-top: .25em; }
:where(a) { color: ${cssVars.brand_400}; text-decoration: underline; text-underline-offset: 4px; }
:where(a):hover { color: ${cssVars.white}; }
:where(.note, blockquote) { padding: 18px 22px; border-left: 3px solid ${cssVars.brand_600}; border-radius: 8px; background: ${cssVars.brand_600}17; }
:where(.note, blockquote) > :last-child { margin-bottom: 0; }
:where(img) { display: block; max-width: 100%; height: auto; border-radius: 10px; }
:where(figure) { max-width: 100%; }
:where(figcaption) { color: ${cssVars.neutral_500}; margin-top: 8px; font-size: 14px; }
:where(pre) { overflow-x: auto; white-space: pre-wrap; border-radius: 8px; padding: 16px; background: ${cssVars.white}0a; }
:where(code) { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9em; color: ${cssVars.brand_400}; }
:where(:not(pre) > code) { padding: .15em .4em; border-radius: 4px; background: ${cssVars.brand_600}17; }
:where(hr) { margin: 1.5em 0; border: 0; border-top: 1px solid ${cssVars.white}1f; }
body > :last-child { margin-bottom: 0; }
@media (max-width: 600px) { body { padding: 28px 18px; font-size: 17px; } }
${css}
</style>
</head>
<body>${html || '<p style="color: #949494">Start writing your project section…</p>'}</body>
</html>`;
}
