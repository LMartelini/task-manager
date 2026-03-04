<script setup lang="ts">
	import { ref, watch } from 'vue'
	import type { TaskFilters } from '@/services/tasks.service'
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useProject } from '@/composables/useProject'
	import { useTasks } from '@/composables/useTasks'
	import TaskCard from '@/components/tasks/TaskCard.vue'
	import { api } from '@/services/api'


	const route = useRoute()
	const { project, loading, error, fetchProject } = useProject()

	const { 
		tasks, 
		loading: tasksLoading, 
		error: tasksError,
		fetchTasks
	} =
	useTasks(Number(route.params.id))

	const statusFilter = ref<TaskFilters['status'] | ''>('')
	const priorityFilter = ref<TaskFilters['priority'] | ''>('')

	let timeout: ReturnType<typeof setTimeout>

	watch([statusFilter, priorityFilter], () => {
	clearTimeout(timeout)

	timeout = setTimeout(() => {
		const filters: TaskFilters = {}

		if (statusFilter.value) {
		filters.status = statusFilter.value
		}

		if (priorityFilter.value) {
		filters.priority = priorityFilter.value
		}

		fetchTasks(filters)
	}, 500)
	})

	onMounted(() => {
		fetchProject(Number(route.params.id))
	})

	async function updateTaskStatus(taskId: number, newStatus: 'todo' | 'in_progress' | 'done') {
		const task = tasks.value.find(t => t.id === taskId)

		if (!task) return

		const oldStatus = task.status
		task.status = newStatus 

		try {
			await api.patch(`/tasks/${taskId}`, {
			status: newStatus
			})
		} catch {
			task.status = oldStatus
		}
	}
</script>

<template>
	<div>
		<p v-if="loading">Carregando...</p>
		<p v-else-if="error">{{ error }}</p>

		<div v-else-if="project">
			<h1>{{ project.name }}</h1>
			<p>{{ project.description }}</p>
			<p>Status: {{ project.status }}</p>
			<p>Tarefas: {{ project.tasks_count }}</p>
		</div>
	</div>

	<h2>Tarefas</h2>
	<div class="flex gap-4 mb-4 flex-wrap">

  <select
    v-model="statusFilter"
    class="border rounded-lg px-3 py-2 text-sm"
  >
    <option value="">Todos os status</option>
    <option value="todo">Todo</option>
    <option value="in_progress">In Progress</option>
    <option value="done">Done</option>
  </select>

  <select
    v-model="priorityFilter"
    class="border rounded-lg px-3 py-2 text-sm"
  >
    <option value="">Todas as prioridades</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

</div>

	<p v-if="tasksLoading">Carregando tarefas...</p>
	<p v-else-if="tasksError">{{ tasksError }}</p>

	<div class="grid gap-3">
		<TaskCard
			v-for="task in tasks"
			:key="task.id"
			:id="task.id"
			:title="task.title"
			:status="task.status"
			:priority="task.priority"
			:isOverdue="task.is_overdue"
			@update-status="(value) => updateTaskStatus(task.id, value)"
		/>
	</div>

</template>