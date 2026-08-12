import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';




vi.mock('./config', () => ({
    uploadConfig: {
        root: path.resolve('/tmp/uploads'),
        publicPrefix: '/uploads/portfolio',
        maxImageBytes: 1024
    }
}))

import { 
    createPublicUploadUrl,
    getCategoryDirectory,
    getProjectUploadDirectory,
    isManageUpload,
    isProjectManageUpload

 } from './paths';


 describe('upload paths', () => {
    it.each([
        [
            'gallery',
            'gallery'
        ],
        [
            'feature-photo',
            path.join('features', 'photos')
        ],
        [
            'feature-icon',
            path.join('features', 'icons')
        ]
    ] as const)(
        'maps %s to a directory',
        (category, expected) => {
            expect(getCategoryDirectory(category)).toBe(expected)
        }
    )

    it('builds the project directory', () => {
        expect(getProjectUploadDirectory(7, 'gallery')).toBe(
            path.resolve(
                '/tmp/uploads',
                'projects',
                '7',
                'gallery'
            )
        )
    })

    it('builds a public URL with forward slashes', () => {
        expect(
            createPublicUploadUrl(
                7,
                'feature-photo',
                'image.webp'
            )
        ).toBe('/uploads/portfolio/projects/7/features/photos/image.webp')
    })

    it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])('rejects project id %s', (projectId) => {
        expect(() => {
            getProjectUploadDirectory(projectId, 'gallery')
        }).toThrow('INVALID_PROJECT_ID')
    })

    it('recognizes a managed upload', () => {
        expect(
            isManageUpload('/uploads/portfolio/projects/7/gallery/image.webp')
        ).toBe(true)
    })

    it('rejects a similar but different prefix', () => {
        expect(
            isManageUpload('/uploads/portfolio-copy/projects/7/gallery/image.webp')
        ).toBe(false)
    })

    it('checks ownership by project id', () => {
        const value = '/uploads/portfolio/projects/7/gallery/image.webp'
    
        expect(
            isProjectManageUpload(value, 7)
        ).toBe(true)

        expect(isProjectManageUpload(value, 8)).toBe(false)
    })
 })