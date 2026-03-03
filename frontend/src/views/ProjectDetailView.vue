<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProject } from '@/composables/useProject'
import { useTasks } from '@/composables/useTasks'


const route = useRoute()
const { project, loading, error, fetchProject } = useProject()

const { tasks, loading: tasksLoading, error: tasksError } =
  useTasks(Number(route.params.id))

onMounted(() => {
	fetchProject(Number(route.params.id))
})
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

	<ul v-else-if="tasks.length">
		<li v-for="task in tasks" :key="task.id">
			<strong>{{ task.title }}</strong>
			- {{ task.status }}
			- Prioridade: {{ task.priority }}
			<span v-if="task.is_overdue" style="color: red;">
			(Atrasada)
			</span>
		</li>
	</ul>

	<p v-else>Nenhuma tarefa encontrada.</p>
</template>