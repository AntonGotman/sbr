import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/LandingView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { bareLayout: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { bareLayout: true }
  },
  {
    path: '/space',
    name: 'space',
    component: () => import('../views/SpaceView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('../views/PeopleView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/EquipmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'space' }
  }
  return true
})

export default router
