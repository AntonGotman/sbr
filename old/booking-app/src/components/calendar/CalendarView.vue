<template>
  <div class="calendar-view">
    <div class="calendar-header flex-between">
      <h2>Декабрь 2023</h2>
      <div class="flex gap-1">
        <AppButton variant="secondary">Сегодня</AppButton>
        <AppButton variant="secondary">&lt;</AppButton>
        <AppButton variant="secondary">&gt;</AppButton>
      </div>
    </div>

    <div class="calendar-grid">
      <div class="calendar-grid-header">
        <div class="resource-header">Ресурс</div>
        <div class="days-header">
          <div class="day" v-for="day in days" :key="day">
            {{ day }}
          </div>
        </div>
      </div>

      <div class="calendar-grid-body">
        <div class="resources-column">
          <div class="resource-item" v-for="resource in resources" :key="resource.id">
            <div class="resource-info">
              <div class="resource-icon">📷</div>
              <span>{{ resource.name }}</span>
            </div>
          </div>
        </div>

        <div class="time-grid-container">
          <div class="time-slots">
            <div class="time-slot-label" v-for="hour in hours" :key="hour">
              {{ hour }}
            </div>
          </div>
          <div class="grid-slots">
            <div
              v-for="(slot, index) in gridSlots"
              :key="index"
              class="grid-slot"
              :class="{ booked: slot.isBooked }"
              @click="!slot.isBooked && openBooking(slot)"
            >
              <span v-if="slot.isBooked" class="booking-label">
                {{ slot.bookingTitle }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'С', 'Выход']
const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
]

const resources = ref([
  { id: 1, name: 'Фотограф', icon: '📷' },
  { id: 2, name: 'Информация', icon: '📝' },
  { id: 3, name: 'Фотограф', icon: '📷' }
])

// Генерируем слоты для сетки
const gridSlots = computed(() => {
  const slots = []
  for (let i = 0; i < 15 * 7; i++) {
    slots.push({
      isBooked: Math.random() > 0.7,
      bookingTitle: Math.random() > 0.7 ? 'Фото' : ''
    })
  }
  return slots
})

const openBooking = (slot: any) => {
  alert('Открыть бронирование')
}
</script>

<style scoped>
.calendar-view {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.calendar-header {
  margin-bottom: 20px;
}

.calendar-grid-header {
  display: flex;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 10px;
}

.resource-header {
  width: 150px;
  font-weight: 600;
  color: #2D3748;
}

.days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
}

.day {
  text-align: center;
  font-weight: 600;
  color: #2D3748;
}

.calendar-grid-body {
  display: flex;
  margin-top: 10px;
}

.resources-column {
  width: 150px;
  border-right: 1px solid #E2E8F0;
}

.resource-item {
  padding: 12px;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.resource-icon {
  font-size: 20px;
}

.time-grid-container {
  flex: 1;
  display: flex;
}

.time-slots {
  width: 60px;
  border-right: 1px solid #E2E8F0;
}

.time-slot-label {
  padding: 8px;
  font-size: 11px;
  color: #718096;
  text-align: right;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #F7FAFC;
}

.grid-slots {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(15, 36px);
}

.grid-slot {
  border: 1px solid #F7FAFC;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-slot:hover:not(.booked) {
  background: #E3F2FD;
}

.grid-slot.booked {
  background: #E3F2FD;
  cursor: default;
}

.booking-label {
  background: #2196F3;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}
</style>