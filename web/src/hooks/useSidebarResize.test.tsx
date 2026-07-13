import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSidebarResize } from './useSidebarResize'

describe('useSidebarResize', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('persists the collapsed state', () => {
        const first = renderHook(() => useSidebarResize())

        expect(first.result.current.isCollapsed).toBe(false)
        act(() => first.result.current.toggleCollapsed())
        expect(first.result.current.isCollapsed).toBe(true)
        first.unmount()

        const second = renderHook(() => useSidebarResize())
        expect(second.result.current.isCollapsed).toBe(true)
    })
})
