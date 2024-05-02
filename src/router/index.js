import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TaskGroupView from '@/views/TaskGroupView.vue'; // Adjust the path as necessary

import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/tasks/:taskType', // Dynamic segment for task type
      name: 'taskGroup',
      component: TaskGroupView
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.user === undefined) {
    await userStore.fetchUser()
  }
  if (to.name === 'login' && userStore.user) {
    next('/')
  } else if (to.name !== 'login' && !userStore.user) {
    next('/login')
  } else {
    next()
  }
})
export default router