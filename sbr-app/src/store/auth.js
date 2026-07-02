import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: 'Иван Иванов',
      email: 'example@yandex.ru'
    },
    error: ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    login(email, password) {
      this.error = ''
      if (!email || !password) {
        this.error = 'Введите email и пароль'
        return false
      }
      this.user = {
        name: email.split('@')[0]
          .replace(/[._]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Иван Иванов',
        email
      }
      return true
    },
    register(name, email, password) {
      this.error = ''
      if (!name || !email || !password) {
        this.error = 'Заполните все поля'
        return false
      }
      this.user = { name, email }
      return true
    },
    logout() {
      this.user = {
        name: 'Иван Иванов',
        email: 'example@yandex.ru'
      }
    }
  },
  persist: false
})
