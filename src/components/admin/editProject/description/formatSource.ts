import * as prettier from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import postcssPlugin from 'prettier/plugins/postcss';
import type { CodeLanguage } from './CodeEditor';

export async function formatDescriptionSource(source: string, language: CodeLanguage): Promise<string> {
    if (!source.trim()) return '';
    try {
        return await prettier.format(source, {
            parser: language === 'html' ? 'html' : 'css',
            plugins: language === 'html' ? [htmlPlugin] : [postcssPlugin],
            tabWidth: 2,
            useTabs: false,
            printWidth: 100,
            singleQuote: false,
            bracketSameLine: false,
        });
    } catch {
        // Keep malformed source editable instead of replacing it with an error.
        return source;
    }
}

