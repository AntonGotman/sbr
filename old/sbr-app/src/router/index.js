import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/space'
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
    component: () => import('../views/SpaceView.vue')
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('../views/PeopleView.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/EquipmentView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/space'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
