import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/documentos',
    name: 'Documentos',
    component: () => import('@/views/documents/index.vue')
  },
  {
    path: '/beneficios',
    name: 'Benefícios',
    component: () => import('@/views/benefit/index.vue')
  },
  {
    path: '/equipe',
    name: 'Equipe',
    component: () => import('@/views/team/index.vue')
  },
  {
    path: '/tutoriais',
    name: 'Tutoriais',
    component: () => import('@/views/tutorial/index.vue')
  },
  {
    path: '/permissoes',
    name: 'Permissões',
    component: () => import('@/views/permission/index.vue')
  },
  {
    path: '/email',
    name: 'Email',
    component: () => import('@/views/Email.vue')
  },
  {
    path: '/birthday',
    name: 'Birthday',
    component: () => import('@/views/Birthday.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('@/views/feed/feedView.vue')
  },
  {
    path: '/feed/:id',
    name: 'Visualizacao feed',
    component: () => import('@/views/feed/feedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
