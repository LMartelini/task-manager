import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'

describe('Task Store', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should start with empty tasks', () => {
        const store = useTaskStore()

        expect(store.tasks).toEqual([])
    })

})