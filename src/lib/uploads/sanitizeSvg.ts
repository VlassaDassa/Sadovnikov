import 'server-only'

import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window =
    new JSDOM('').window

const DOMPurify =
    createDOMPurify(
        window,
    )

DOMPurify.addHook(
    'uponSanitizeAttribute',
    (
        _node,
        data,
    ) => {
        const attributeName =
            data.attrName.toLowerCase()

        if (
            attributeName.startsWith(
                'on',
            )
        ) {
            data.keepAttr = false
            return
        }

        if (
            attributeName === 'href' ||
            attributeName ===
                'xlink:href'
        ) {
            const value =
                data.attrValue.trim()

            if (
                value &&
                !value.startsWith('#')
            ) {
                data.keepAttr = false
            }
        }

        if (
            attributeName === 'style' &&
            /url\s*\(/i.test(
                data.attrValue,
            )
        ) {
            data.keepAttr = false
        }
    },
)

export function sanitizeSvg(
    sourceBuffer: Buffer,
): Buffer {
    const source =
        sourceBuffer.toString('utf8')

    if (
        sourceBuffer.length >
        512 * 1024
    ) {
        throw new Error(
            'SVG_FILE_TOO_LARGE',
        )
    }

    if (
        /<!DOCTYPE/i.test(source) ||
        /<!ENTITY/i.test(source)
    ) {
        throw new Error(
            'UNSAFE_SVG_DECLARATION',
        )
    }

    const sanitized =
        DOMPurify.sanitize(
            source,
            {
                USE_PROFILES: {
                    svg: true,
                    svgFilters: true,
                },

                FORBID_TAGS: [
                    'script',
                    'foreignObject',
                    'iframe',
                    'object',
                    'embed',
                    'audio',
                    'video',
                ],

                RETURN_TRUSTED_TYPE:
                    false,
            },
        )

    if (
        !/<svg[\s>]/i.test(
            sanitized,
        )
    ) {
        throw new Error(
            'INVALID_SVG',
        )
    }

    return Buffer.from(
        sanitized,
        'utf8',
    )
}