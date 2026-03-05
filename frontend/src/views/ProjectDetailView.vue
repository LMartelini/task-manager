<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue'
	import type { Task, TaskFilters } from '@/services/tasks.service'
	import { useRoute } from 'vue-router'
	import { useProject } from '@/composables/useProject'
	import { useTaskStore } from '@/stores/taskStore'
	import { storeToRefs } from 'pinia'
	import TaskCard from '@/components/tasks/TaskCard.vue'

	const route = useRoute()

	const { project, loading: projectLoading, error: projectError, fetchProject } = useProject()

	const taskStore = useTaskStore()
	const { tasks, loading: tasksLoading, error: tasksError } = storeToRefs(taskStore)

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

			taskStore.fetchTasks(Number(route.params.id), filters)
		}, 500)
	})

	onMounted(() => {
		const projectId = Number(route.params.id)

		fetchProject(projectId)
		taskStore.fetchTasks(projectId)
	})

	const newTask = ref({
		title: '',
		description: '',
		priority: 'medium' as 'low' | 'medium' | 'high',
		due_date: ''
	})

	const creatingTask = ref(false)
	const createTaskError = ref<string | null>(null)

	async function handleCreateTask() {
		if (!newTask.value.title) return

		creatingTask.value = true
		createTaskError.value = null

		try {
			await taskStore.createTask(
				Number(route.params.id),
				{
					title: newTask.value.title,
					description: newTask.value.description,
					priority: newTask.value.priority,
					due_date: newTask.value.due_date || null,
					status: 'todo'
				}
			)

			newTask.value = {
				title: '',
				description: '',
				priority: 'medium',
				due_date: ''
			}

		} catch {
			createTaskError.value = 'Erro ao criar tarefa'
		} finally {
			creatingTask.value = false
		}
	}
</script>

<template>
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

	<div class="bg-white p-4 rounded-xl shadow-sm border mb-6">
  		<h3 class="text-sm font-semibold mb-3">Nova Tarefa</h3>

  		<form @submit.prevent="handleCreateTask" class="grid gap-3">
			<input
				v-model="newTask.title"
				placeholder="Título"
				class="border rounded-lg px-3 py-2 text-sm"
				required
			/>

			<textarea
				v-model="newTask.description"
				placeholder="Descrição"
				class="border rounded-lg px-3 py-2 text-sm"
			/>

			<div class="flex gap-3 flex-wrap">
				<select
					v-model="newTask.priority"
					class="border rounded-lg px-3 py-2 text-sm"
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>

				<input
					type="date"
					v-model="newTask.due_date"
					class="border rounded-lg px-3 py-2 text-sm"
				/>
			</div>

			<p v-if="createTaskError" class="text-red-500 text-xs">
				{{ createTaskError }}
			</p>

			<button
				type="submit"
				:disabled="creatingTask"
				class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50 w-fit"
			>
				{{ creatingTask ? 'Criando...' : 'Criar Tarefa' }}
			</button>
  		</form>
	</div>

	<p v-if="tasksLoading">Carregando tarefas...</p>

	<p v-else-if="tasksError">
		{{ tasksError }}
	</p>

	<p
		v-else-if="tasks.length === 0"
		class="text-sm text-gray-500 mt-4"
	>
		Nenhuma tarefa encontrada. Crie a primeira tarefa do projeto.
	</p>

	<TransitionGroup
		v-else
		tag="div"
		name="task"
		class="grid gap-3"
	>
		<TaskCard 
			v-for="task in tasks" 
			:key="task.id" 
			:id="task.id" 
			:title="task.title" 
			:status="task.status" 
			:priority="task.priority" 
			:isOverdue="task.is_overdue" 
			@update-status="(value) => taskStore.updateTaskStatus(task.id, value)" 
		/> 
	</TransitionGroup> 
</template>

<style scoped>
	.task-enter-active,
	.task-leave-active {
		transition: all 0.25s ease;
	}

	.task-enter-from {
		opacity: 0;
		transform: translateY(-6px);
	}

	.task-leave-to {
		opacity: 0;
		transform: translateY(6px);
	}
</style>