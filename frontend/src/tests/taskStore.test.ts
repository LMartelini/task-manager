import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import { tasksService } from '@/services/tasks.service'

vi.mock('@/services/tasks.service')

describe('Task Store', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should start with empty tasks', () => {
        const store = useTaskStore()

        expect(store.tasks.length).toBe(0)
    })

    it('should add task after createTask', async () => {
        const store = useTaskStore()

        const mockTask = {
            id: 1,
            title: 'Nova Task',
            description: null,
            status: 'todo',
            priority: 'medium',
            due_date: null,
            is_overdue: false,
            created_at: '2025-01-01'
        }

        vi.mocked(tasksService.create).mockResolvedValue(mockTask)

        vi.mocked(tasksService.getByProject).mockResolvedValue({
            data: [mockTask]
        } as any)

        await store.createTask(1, {
            title: 'Nova Task',
            priority: 'medium',
            status: 'todo'
        })

        expect(store.tasks.length).toBe(1)
        expect(store.tasks[0]!.title).toBe('Nova Task')
    })
})