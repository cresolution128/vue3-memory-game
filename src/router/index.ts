import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/card-select',
      name: 'card-select',
      component: () => import('../views/CardSelectView.vue')
    },
    {
      path: '/room/:number',
      name: 'room',
      component: () => import('../views/RoomView.vue')
    },
  ]
})

export default router
