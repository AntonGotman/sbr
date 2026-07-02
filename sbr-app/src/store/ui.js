import { defineStore } from 'pinia'

let counter = 0

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: []
  }),
  actions: {
    notify(message, type = 'success', timeout = 4200) {
      const id = ++counter
      this.toasts.push({ id, message, type })
      if (timeout) {
        setTimeout(() => this.dismiss(id), timeout)
      }
      return id
    },
    dismiss(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    }
  }
})
