import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'hapi-show-archived-sessions'
const CHANGE_EVENT = 'hapi-show-archived-sessions-change'

function readPreference(): boolean {
    if (typeof window === 'undefined') return false
    try {
        return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
        return false
    }
}

export function useShowArchivedSessions(): {
    showArchivedSessions: boolean
    setShowArchivedSessions: (show: boolean) => void
} {
    const [showArchivedSessions, setShowArchivedSessionsState] = useState(readPreference)

    useEffect(() => {
        const onStorage = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY) {
                setShowArchivedSessionsState(event.newValue === 'true')
            }
        }
        const onChange = (event: Event) => {
            setShowArchivedSessionsState((event as CustomEvent<boolean>).detail)
        }
        window.addEventListener('storage', onStorage)
        window.addEventListener(CHANGE_EVENT, onChange)
        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener(CHANGE_EVENT, onChange)
        }
    }, [])

    const setShowArchivedSessions = useCallback((show: boolean) => {
        setShowArchivedSessionsState(show)
        try {
            if (show) {
                localStorage.setItem(STORAGE_KEY, 'true')
            } else {
                localStorage.removeItem(STORAGE_KEY)
            }
        } catch {
            // Ignore storage errors; the setting still applies for this page load.
        }
        window.dispatchEvent(new CustomEvent<boolean>(CHANGE_EVENT, { detail: show }))
    }, [])

    return { showArchivedSessions, setShowArchivedSessions }
}
