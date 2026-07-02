<template>
  <div class="page-container">
    <div class="calendar-card">
      <!-- Заголовок -->
      <div class="calendar-header">
        <h2 class="calendar-title">Декабрь 2023</h2>
        <div class="calendar-nav">
          <button class="nav-btn">Сегодня</button>
          <button class="nav-btn">&lt;</button>
          <button class="nav-btn">&gt;</button>
        </div>
      </div>

      <!-- Сетка календаря -->
      <div class="calendar-grid">
        <!-- Шапка -->
        <div class="grid-header">
          <div class="resource-label">Ресурс</div>
          <div class="days-header">
            <div class="day">Пн</div>
            <div class="day">Вт</div>
            <div class="day">Ср</div>
            <div class="day">Чт</div>
            <div class="day">Пт</div>
            <div class="day">С</div>
            <div class="day">Выход</div>
          </div>
        </div>

        <!-- Тело -->
        <div class="grid-body">
          <!-- Ресурсы -->
          <div class="resources">
            <div v-for="resource in resources" :key="resource.id" class="resource-item">
              <span class="resource-icon">{{ resource.icon }}</span>
              <span>{{ resource.name }}</span>
            </div>
          </div>

          <!-- Слоты -->
          <div class="slots">
            <div
              v-for="(row, rowIndex) in grid"
              :key="rowIndex"
              class="slot-row"
            >
              <div
                v-for="(cell, colIndex) in row"
                :key="colIndex"
                class="slot-cell"
                :class="{ booked: cell.booked }"
                @click="!cell.booked && openBooking(rowIndex, colIndex)"
              >
                <span v-if="cell.booked" class="booking-label">
                  {{ cell.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const resources = ref([
  { id: 1, name: 'Фотограф', icon: '📷' },
  { id: 2, name: 'Информация', icon: '📝' },
  { id: 3, name: 'Фотограф', icon: '📷' }
])

// Генерируем сетку 15 часов × 7 дней
const generateGrid = () => {
  const rows = 15 // с 08:00 до 22:00
  const cols = 7  // ПН-ВС

  return Array.from({ length: rows }, () => {
    return Array.from({ length: cols }, () => ({
      booked: Math.random() > 0.7,
      label: Math.random() > 0.7 ? 'Фото' : ''
    }))
  })
}

const grid = ref(generateGrid())

const openBooking = (row: number, col: number) => {
  alert(`Бронирование для слота ${row}:${col}`)
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.calendar-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.calendar-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
}

.calendar-nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #f7fafc;
  border-color: #2196f3;
}

.grid-header {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.resource-label {
  width: 120px;
  font-weight: 600;
  color: #2d3748;
}

.days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
}

.day {
  text-align: center;
  font-weight: 600;
  color: #2d3748;
}

.grid-body {
  display: flex;
  gap: 0;
}

.resources {
  width: 120px;
  flex-shrink: 0;
}

.resource-item {
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2d3748;
  height: 40px;
}

.resource-icon {
  font-size: 18px;
}

.slots {
  flex: 1;
}

.slot-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 40px;
}

.slot-cell {
  border: 1px solid #f7fafc;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.slot-cell:hover:not(.booked) {
  background: #f7faff;
  border-color: #2196f3;
}

.slot-cell.booked {
  background: #e3f2fd;
  cursor: default;
}

.booking-label {
  background: #2196f3;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}
</style>