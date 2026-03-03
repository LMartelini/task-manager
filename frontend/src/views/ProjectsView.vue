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
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold">Projetos</h2>

			<button
				class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
			>
				+ Novo Projeto
			</button>
		</div>

		<p v-if="loading" class="text-gray-500">Carregando...</p>
		<p v-else-if="error" class="text-red-500">{{ error }}</p>

		<div
			v-else
			class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
		>
			<div
				v-for="project in projects"
				:key="project.id"
				@click="goToProject(project.id)"
				class="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer p-5 border"
			>
				<div class="flex justify-between items-start">
					<h3 class="text-lg font-semibold">
						{{ project.name }}
					</h3>

					<span
						class="text-xs px-2 py-1 rounded-full"
						:class="project.status === 'active'
							? 'bg-green-100 text-green-700'
							: 'bg-gray-200 text-gray-600'"
					>
						{{ project.status }}
					</span>
				</div>

				<p class="text-sm text-gray-600 mt-2 line-clamp-2">
					{{ project.description }}
				</p>

				<div class="mt-4 text-sm text-gray-500">
					{{ project.tasks_count }} tarefas
				</div>
			</div>
		</div>
	</AppLayout>
</template>