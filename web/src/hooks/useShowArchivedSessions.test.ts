import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useShowArchivedSessions } from './useShowArchivedSessions'

describe('useShowArchivedSessions', () => {
    beforeEach(() => localStorage.clear())

    it('hides archived sessions by default', () => {
        const { result } = renderHook(() => useShowArchivedSessions())
        expect(result.current.showArchivedSessions).toBe(false)
    })

    it('persists the opt-in', () => {
        const { result } = renderHook(() => useShowArchivedSessions())
        act(() => result.current.setShowArchivedSessions(true))

        expect(result.current.showArchivedSessions).toBe(true)
        expect(localStorage.getItem('hapi-show-archived-sessions')).toBe('true')
    })

    it('synchronizes separate hook instances in the same page', () => {
        const first = renderHook(() => useShowArchivedSessions())
        const second = renderHook(() => useShowArchivedSessions())

        act(() => first.result.current.setShowArchivedSessions(true))
        expect(second.result.current.showArchivedSessions).toBe(true)

        act(() => first.result.current.setShowArchivedSessions(false))
        expect(second.result.current.showArchivedSessions).toBe(false)
    })
})
