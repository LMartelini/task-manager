import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: '/',
        name: 'projects',
        component: ProjectsView,
    },
    {
        path: '/projects/:id',
        name: 'project-detail',
        component: ProjectDetailView,
        props: true,
    },
    ],
})

export default router