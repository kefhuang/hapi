import { describe, expect, it } from 'vitest'
import { getSessionTitle } from './sessionTitle'

describe('getSessionTitle', () => {
    it('prefers the session name', () => {
        expect(getSessionTitle({
            id: 'session-id',
            metadata: {
                name: 'Rename the browser tab',
                summary: { text: 'Summary' },
                path: '/work/hapi',
            },
        })).toBe('Rename the browser tab')
    })

    it('falls back to summary, directory, then shortened id', () => {
        expect(getSessionTitle({ id: 'session-id', metadata: { summary: { text: 'Summary' } } })).toBe('Summary')
        expect(getSessionTitle({ id: 'session-id', metadata: { path: '/work/hapi' } })).toBe('hapi')
        expect(getSessionTitle({ id: '1234567890' })).toBe('12345678')
    })
})
