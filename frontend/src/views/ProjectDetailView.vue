<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProject } from '@/composables/useProject'

const route = useRoute()
const { project, loading, error, fetchProject } = useProject()

onMounted(() => {
	fetchProject(Number(route.params.id))
})
</script>

<template>
	<div>
		<p v-if="loading">Carregando...</p>
		<p v-else-if="error">{{ error }}</p>

		<div v-else-if="project">
			<pre>{{ project }}</pre>
			<h1>{{ project.name }}</h1>
			<p>{{ project.description }}</p>
			<p>Status: {{ project.status }}</p>
			<p>Tarefas: {{ project.tasks_count }}</p>
		</div>
	</div>
</template>