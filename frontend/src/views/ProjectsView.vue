<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import { ref } from 'vue'
	import { api } from '@/services/api'

	import { useProjects } from '@/composables/useProjects'
	import AppLayout from '@/components/layout/AppLayout.vue'
	import BaseModal from '@/components/ui/BaseModal.vue'

	const router = useRouter()
	const { projects, loading, error, fetchProjects } = useProjects()

	const goToProject = (id: number) => {
		router.push(`/projects/${id}`)
	}


	const showModal = ref(false)

	const form = ref({
		name: '',
		description: '',
		status: 'active'
	})

	const creating = ref(false)
	const createError = ref<string | null>(null)

	async function createProject() {
		creating.value = true
		createError.value = null

		try {
			await api.post('/projects', form.value)

			showModal.value = false

			form.value = {
				name: '',
				description: '',
				status: 'active'
			}

			await fetchProjects()
		} catch (err: any) {
			createError.value =
			err.response?.data?.message ?? 'Erro ao criar projeto'
		} finally {
			creating.value = false
		}
	}
</script>

<template>
	<AppLayout>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-bold">Projetos</h2>

			<button
				@click="showModal = true"
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

		<BaseModal :show="showModal" @close="showModal = false">
			<h3 class="text-lg font-semibold mb-4">Novo Projeto</h3>

			<form @submit.prevent="createProject" class="space-y-4">
				<div>
					<label class="block text-sm mb-1">Nome</label>
					<input
						v-model="form.name"
						required
						class="w-full border rounded-lg px-3 py-2 text-sm"
					/>
				</div>

				<div>
					<label class="block text-sm mb-1">Descrição</label>
					<textarea
						v-model="form.description"
						class="w-full border rounded-lg px-3 py-2 text-sm"
					/>
				</div>

				<div>
					<label class="block text-sm mb-1">Status</label>
					<select
						v-model="form.status"
						class="w-full border rounded-lg px-3 py-2 text-sm"
					>
						<option value="active">Active</option>
						<option value="archived">Archived</option>
					</select>
				</div>

				<p v-if="createError" class="text-red-500 text-sm">
					{{ createError }}
				</p>

				<div class="flex justify-end gap-2 pt-2">
					<button
						type="button"
						@click="showModal = false"
						class="px-4 py-2 text-sm border rounded-lg"
					>
						Cancelar
					</button>

					<button
						type="submit"
						:disabled="creating"
						class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
					>
						{{ creating ? 'Criando...' : 'Criar' }}
					</button>
				</div>
			</form>
		</BaseModal>
	</AppLayout>
</template>