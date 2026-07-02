import { defineStore } from 'pinia'
import { TIME_SLOTS, toDateKey } from './constants'

let bookingCounter = 100
let resourceCounter = 100

function seedResources() {
  return [
    {
      id: 1,
      name: 'Коворкинг ИРНИТУ',
      type: 'space',
      cover: 'linear-gradient(135deg, #2f5650 0%, #6f9d97 60%, #cfe3df 100%)',
      bookings: [
        {
          id: ++bookingCounter,
          date: toDateKey(new Date()),
          slotIndexes: [2, 3, 5],
          title: 'Съёмки в первомайском',
          responsible: ['Иванов И. В.', 'Фотограф'],
          comment: '',
          ownerEmail: 'demo@sbr.local'
        }
      ]
    },
    {
      id: 2,
      name: 'Переговорная ИРНИТУ',
      type: 'space',
      cover: 'linear-gradient(135deg, #2b4a63 0%, #5d85a8 55%, #e3a23c 100%)',
      bookings: [
        {
          id: ++bookingCounter,
          date: toDateKey(new Date()),
          slotIndexes: [2, 3],
          title: 'Совещание отдела продаж',
          responsible: ['Елена Иванова'],
          comment: '',
          ownerEmail: 'demo@sbr.local'
        }
      ]
    },
    {
      id: 3,
      name: 'Камера Sony A7 III',
      type: 'equipment',
      cover: 'linear-gradient(135deg, #3c3c3c 0%, #6b6b6b 100%)',
      bookings: []
    },
    {
      id: 4,
      name: 'Проектор Epson EB-2250U',
      type: 'equipment',
      cover: 'linear-gradient(135deg, #43716B 0%, #86AEAA 100%)',
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
    /** Returns the set of slot indexes already taken for a resource on a given date. */
    takenSlots(resourceId, dateKey) {
      const taken = new Set()
      this.bookingsForDate(resourceId, dateKey).forEach((b) => {
        b.slotIndexes.forEach((i) => taken.add(i))
      })
      return taken
    },
    /** Checks whether the requested slots are free; returns {ok, conflictingBooking}. */
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
        return { ok: false, message: 'Ресурс не найден. Обратитесь в техподдержку.' }
      }
      if (!slotIndexes.length) {
        return { ok: false, message: 'Выберите хотя бы один временной слот.' }
      }
      const availability = this.checkAvailability(resourceId, dateKey, slotIndexes)
      if (!availability.ok) {
        const range = slotLabelRange(availability.conflictingBooking.slotIndexes)
        return {
          ok: false,
          message: `Этот ресурс уже забронирован на ${range} ("${availability.conflictingBooking.title}"). Выберите другое время.`
        }
      }
      const booking = {
        id: ++bookingCounter,
        date: dateKey,
        slotIndexes: [...slotIndexes].sort((a, b) => a - b),
        title: title || 'Без названия',
        responsible: responsible.length ? responsible : ['Без ответственного'],
        comment: comment || '',
        ownerEmail: ownerEmail || 'demo@sbr.local'
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
      const palette = [
        'linear-gradient(135deg, #43716B 0%, #86AEAA 100%)',
        'linear-gradient(135deg, #2b4a63 0%, #5d85a8 100%)',
        'linear-gradient(135deg, #6f4a2f 0%, #c98a4b 100%)',
        'linear-gradient(135deg, #4a2f63 0%, #8a5dc9 100%)'
      ]
      const resource = {
        id: ++resourceCounter,
        name: name.trim(),
        type,
        cover: palette[Math.floor(Math.random() * palette.length)],
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
