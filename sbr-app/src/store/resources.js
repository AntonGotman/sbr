import { defineStore } from 'pinia'
import { TIME_SLOTS, toDateKey, MOCK_DATE } from './constants'

let bookingCounter = 100
let resourceCounter = 100

function seedResources() {
  return [
    {
      id: 1,
      name: 'Коворкинг ИРНИТУ',
      type: 'space',
      coverImage: '/images/space-meeting.jpg',
      bookings: [
        {
          id: ++bookingCounter,
          date: MOCK_DATE,
          slotIndexes: [2, 3, 5],
          title: 'Съёмки в первомайском',
          responsible: ['Иванов И. В.', 'Фотограф'],
          comment: '',
          ownerEmail: 'example@yandex.ru'
        }
      ]
    },
    {
      id: 2,
      name: 'Переговорная ИРНИТУ',
      type: 'space',
      coverImage: '/images/space-coworking.jpg',
      bookings: [
        {
          id: ++bookingCounter,
          date: MOCK_DATE,
          slotIndexes: [2, 3],
          title: 'Съёмки в первомайском',
          responsible: ['Иванов И. В.'],
          comment: '',
          ownerEmail: 'example@yandex.ru'
        }
      ]
    },
    {
      id: 3,
      name: 'Камера Sony A7 III',
      type: 'equipment',
      coverImage: '/images/space-coworking.jpg',
      bookings: []
    },
    {
      id: 4,
      name: 'Проектор Epson EB-2250U',
      type: 'equipment',
      coverImage: '/images/space-meeting.jpg',
      bookings: []
    }
  ]
}

export const useResourcesStore = defineStore('resources', {
  state: () => ({
    resources: seedResources()
  }),
  getters: {
    spaces: (state) => state.resources.filter((r) => r.type === 'space'),
    equipment: (state) => state.resources.filter((r) => r.type === 'equipment')
  },
  actions: {
    getResource(id) {
      return this.resources.find((r) => r.id === id)
    },
    bookingsForDate(resourceId, dateKey) {
      const resource = this.getResource(resourceId)
      if (!resource) return []
      return resource.bookings.filter((b) => b.date === dateKey)
    },
    takenSlots(resourceId, dateKey) {
      const taken = new Set()
      this.bookingsForDate(resourceId, dateKey).forEach((b) => {
        b.slotIndexes.forEach((i) => taken.add(i))
      })
      return taken
    },
    checkAvailability(resourceId, dateKey, slotIndexes) {
      const existing = this.bookingsForDate(resourceId, dateKey)
      for (const booking of existing) {
        const overlap = booking.slotIndexes.some((i) => slotIndexes.includes(i))
        if (overlap) {
          return { ok: false, conflictingBooking: booking }
        }
      }
      return { ok: true, conflictingBooking: null }
    },
    createBooking({ resourceId, dateKey, slotIndexes, title, responsible, comment, ownerEmail }) {
      const resource = this.getResource(resourceId)
      if (!resource) {
        return { ok: false, message: 'Неверный запрос. Обратитесь в техподдержку' }
      }
      if (!slotIndexes.length) {
        return { ok: false, message: 'Выберите хотя бы один временной слот.' }
      }
      const availability = this.checkAvailability(resourceId, dateKey, slotIndexes)
      if (!availability.ok) {
        return { ok: false, message: 'Неверный запрос. Обратитесь в техподдержку' }
      }
      const booking = {
        id: ++bookingCounter,
        date: dateKey,
        slotIndexes: [...slotIndexes].sort((a, b) => a - b),
        title: title || 'Без названия',
        responsible: responsible.length ? responsible : ['Без ответственного'],
        comment: comment || '',
        ownerEmail: ownerEmail || 'example@yandex.ru'
      }
      resource.bookings.push(booking)
      return { ok: true, booking }
    },
    removeBooking(resourceId, bookingId) {
      const resource = this.getResource(resourceId)
      if (!resource) return
      resource.bookings = resource.bookings.filter((b) => b.id !== bookingId)
    },
    addResource({ name, type }) {
      const resource = {
        id: ++resourceCounter,
        name: name.trim(),
        type,
        coverImage: '/images/space-coworking.jpg',
        bookings: []
      }
      this.resources.push(resource)
      return resource
    },
    removeResource(id) {
      this.resources = this.resources.filter((r) => r.id !== id)
    }
  }
})

function slotLabelRange(indexes) {
  const sorted = [...indexes].sort((a, b) => a - b)
  const start = TIME_SLOTS[sorted[0]].split(' - ')[0]
  const end = TIME_SLOTS[sorted[sorted.length - 1]].split(' - ')[1]
  return `${start} - ${end}`
}
