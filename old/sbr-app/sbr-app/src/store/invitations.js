import { defineStore } from 'pinia'

let counter = 0

export const useInvitationsStore = defineStore('invitations', {
  state: () => ({
    invitations: [
      {
        id: ++counter,
        resourceName: 'Коворкинг ИРНИТУ',
        title: 'Съёмки в первомайском',
        slotLabel: '10.00 - 12.00',
        ownerName: 'Иванов И. В.',
        role: 'Фотограф'
      },
      {
        id: ++counter,
        resourceName: 'Переговорная ИРНИТУ',
        title: 'Съёмки в первомайском',
        slotLabel: '10.00 - 12.00',
        ownerName: 'Иванов И. В.',
        role: 'Фотограф'
      }
    ]
  }),
  actions: {
    add(invitation) {
      this.invitations.push({ id: ++counter, ...invitation })
    },
    resolve(id) {
      this.invitations = this.invitations.filter((i) => i.id !== id)
    }
  }
})
