<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()
const { projects, loading, error } = useProjects()

const goToProject = (id: number) => {
	router.push(`/projects/${id}`)
}
</script>

<template>
	<AppLayout>
		<div>
			<h2 class="text-2xl font-bold mb-6">Projetos</h2>

			<p v-if="loading">Carregando...</p>
			<p v-else-if="error">{{ error }}</p>

			<ul v-else>
				<li
					v-for="project in projects"
					:key="project.id"
					@click="goToProject(project.id)"
					style="cursor: pointer; margin-bottom: 10px;"
				>
					<strong>{{ project.name }}</strong>

					<br />

					Status: {{ project.status }}
					
					<br />
					
					Tarefas: {{ project.tasks_count }}
				</li>
			</ul>
		</div>
	</AppLayout>
</template>