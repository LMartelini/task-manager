<script setup lang="ts">
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useProject } from '@/composables/useProject'
	import { useTasks } from '@/composables/useTasks'
	import TaskCard from '@/components/tasks/TaskCard.vue'
	import { api } from '@/services/api'


	const route = useRoute()
	const { project, loading, error, fetchProject } = useProject()

	const { tasks, loading: tasksLoading, error: tasksError } =
	useTasks(Number(route.params.id))

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