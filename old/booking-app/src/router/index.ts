import { createRouter, createWebHistory } from 'vue-router'
import BookingPage from '@/pages/BookingPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import EmployeesPage from '@/pages/EmployeesPage.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
import BookingNewPage from '@/pages/BookingNewPage.vue'

const routes = [
  { path: '/', redirect: '/booking' },
  { path: '/booking', name: 'Booking', component: BookingPage },
  { path: '/booking-new', name: 'BookingNew', component: BookingNewPage },
  { path: '/calendar', name: 'Calendar', component: CalendarPage },
  { path: '/employees', name: 'Employees', component: EmployeesPage },
  { path: '/error', name: 'Error', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router