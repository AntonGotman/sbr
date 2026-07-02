<template>
  <div class="home-page">
    <!-- Хедер -->
    <header class="header">
      <div class="container flex-between">
        <div class="header-left flex-center gap-2">
          <div class="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#2D5BFF"/>
              <path d="M12 28V12H18V20H22V12H28V28H22V20H18V28H12Z" fill="white"/>
            </svg>
            <span>Бронирование</span>
          </div>
          <nav class="nav">
            <a href="#" class="active">Календарь</a>
            <a href="#" @click.prevent="$router.push('/resources')">Ресурсы</a>
          </nav>
        </div>
        <div class="header-right flex-center gap-2">
          <div class="search-box">
            <input type="text" placeholder="Поиск..." v-model="searchQuery" />
          </div>
          <div class="user-avatar">
            <span>ИИ</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main">
      <div class="container">
        <!-- Верхняя панель -->
        <div class="top-bar flex-between">
          <div>
            <h1 class="page-title">Декабрь 2023</h1>
          </div>
          <div class="controls flex-center gap-2">
            <button class="btn btn-secondary" @click="today">Сегодня</button>
            <button class="btn btn-secondary" @click="prevMonth">‹</button>
            <button class="btn btn-secondary" @click="nextMonth">›</button>
            <button class="btn btn-primary" @click="showBookingModal = true">
              + Добавить
            </button>
          </div>
        </div>

        <!-- Календарь -->
        <div class="calendar-wrapper card">
          <div class="calendar-grid">
            <!-- Заголовки дней -->
            <div class="calendar-header">
              <div class="time-label"></div>
              <div
                v-for="day in days"
                :key="day"
                class="day-header"
                :class="{ weekend: day === 'Сб' || day === 'Выход' }"
              >
                {{ day }}
              </div>
            </div>

            <!-- Слоты времени -->
            <div
              v-for="hour in timeSlots"
              :key="hour"
              class="calendar-row"
            >
              <div class="time-label">{{ hour }}</div>
              <div
                v-for="(day, index) in days"
                :key="index"
                class="time-slot"
                :class="{
                  occupied: isSlotOccupied(hour, day),
                  'weekend': day === 'Сб' || day === 'Выход'
                }"
                @click="handleSlotClick(hour, day)"
              >
                <div
                  v-if="isSlotOccupied(hour, day)"
                  class="booking-indicator"
                >
                  <span class="booking-title">Мероприятие</span>
                  <span class="booking-time">{{ hour }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Модалка бронирования -->
        <div v-if="showBookingModal" class="modal-overlay" @click.self="showBookingModal = false">
          <div class="modal-content">
            <button class="modal-close" @click="showBookingModal = false">✕</button>
            <h2 class="modal-title">Новое мероприятие</h2>

            <form @submit.prevent="submitBooking">
              <div class="form-group">
                <label>Название</label>
                <input
                  v-model="bookingForm.title"
                  type="text"
                  placeholder="Введите название мероприятия"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label>Выберите время мероприятия</label>
                <div class="time-grid">
                  <button
                    v-for="time in timeSlots"
                    :key="time"
                    type="button"
                    class="time-btn"
                    :class="{ active: bookingForm.time === time }"
                    @click="bookingForm.time = time"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label>Ответственные лица</label>
                <div class="responsible-list">
                  <label v-for="person in responsiblePersons" :key="person" class="checkbox-label">
                    <input
                      type="checkbox"
                      :value="person"
                      v-model="bookingForm.responsible"
                    />
                    {{ person }}
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Дополнительная информация</label>
                <textarea
                  v-model="bookingForm.comment"
                  placeholder="Добавить комментарий"
                  class="form-textarea"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-actions flex gap-2">
                <button type="submit" class="btn btn-primary">Забронировать</button>
                <button type="button" class="btn btn-secondary" @click="showBookingModal = false">Отмена</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Модалка ошибки -->
        <div v-if="showErrorModal" class="modal-overlay" @click.self="showErrorModal = false">
          <div class="modal-content error-modal">
            <div class="error-icon">⚠️</div>
            <h2 class="modal-title">Ошибка</h2>
            <p class="error-text">Неверный запрос. Обратитесь в техподдержку</p>
            <button class="btn btn-primary" @click="showErrorModal = false">Принять</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Данные
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Выход']
const timeSlots = [
  '08.00 - 09.00', '09.00 - 10.00', '10.00 - 11.00',
  '11.00 - 12.00', '12.00 - 13.00', '13.00 - 14.00',
  '14.00 - 15.00', '15.00 - 16.00', '16.00 - 17.00',
  '17.00 - 18.00', '18.00 - 19.00', '19.00 - 20.00'
]

const responsiblePersons = ['Иван Иванов', 'Елена Иванова']

const searchQuery = ref('')
const showBookingModal = ref(false)
const showErrorModal = ref(false)

const bookingForm = reactive({
  title: '',
  time: '',
  responsible: [] as string[],
  comment: ''
})

// Мок занятых слотов
const occupiedSlots = ref([
  { day: 'Пн', time: '10.00 - 11.00' },
  { day: 'Вт', time: '14.00 - 15.00' },
  { day: 'Ср', time: '11.00 - 12.00' },
])

function isSlotOccupied(hour: string, day: string) {
  return occupiedSlots.value.some(slot => slot.day === day && slot.time === hour)
}

function handleSlotClick(hour: string, day: string) {
  if (day === 'Сб' || day === 'Выход') return
  if (isSlotOccupied(hour, day)) {
    showErrorModal.value = true
    return
  }
  bookingForm.time = hour
  showBookingModal.value = true
}

function submitBooking() {
  if (!bookingForm.title || !bookingForm.time || bookingForm.responsible.length === 0) {
    alert('Заполните все обязательные поля')
    return
  }

  occupiedSlots.value.push({
    day: 'Пн', // Здесь нужно определить день
    time: bookingForm.time
  })

  showBookingModal.value = false
  // Сброс формы
  bookingForm.title = ''
  bookingForm.time = ''
  bookingForm.responsible = []
  bookingForm.comment = ''
}

function today() {
  // Переход к сегодня
}

function prevMonth() {
  // Предыдущий месяц
}

function nextMonth() {
  // Следующий месяц
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.header {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    font-size: 20px;
    color: var(--gray-700);

    svg {
      flex-shrink: 0;
    }
  }

  .nav {
    display: flex;
    gap: 24px;
    margin-left: 32px;

    a {
      color: var(--gray-500);
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      padding: 4px 0;
      position: relative;

      &.active {
        color: var(--primary);

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
          border-radius: 1px;
        }
      }

      &:hover {
        color: var(--primary);
      }
    }
  }

  .search-box {
    input {
      padding: 8px 16px;
      border-radius: var(--border-radius);
      border: 1px solid var(--gray-200);
      background: var(--gray-100);
      font-size: 14px;
      width: 200px;
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: var(--primary);
        background: white;
        width: 260px;
      }
    }
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--primary-light);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }
}

.main {
  padding: 24px 0 40px;
}

.top-bar {
  margin-bottom: 24px;

  .page-title {
    font-size: 28px;
    font-weight: 700;
    color: var(--gray-700);
  }
}

.calendar-wrapper {
  padding: 0;
  overflow: hidden;

  .calendar-grid {
    .calendar-header {
      display: grid;
      grid-template-columns: 80px repeat(7, 1fr);
      background: var(--gray-100);
      border-bottom: 1px solid var(--gray-200);

      .day-header {
        padding: 12px 8px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        color: var(--gray-600);

        &.weekend {
          color: var(--gray-400);
        }
      }
    }

    .calendar-row {
      display: grid;
      grid-template-columns: 80px repeat(7, 1fr);
      border-bottom: 1px solid var(--gray-100);

      &:last-child {
        border-bottom: none;
      }

      .time-label {
        padding: 8px;
        text-align: center;
        font-size: 12px;
        color: var(--gray-500);
        background: var(--gray-100);
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .time-slot {
        min-height: 48px;
        padding: 4px;
        border-right: 1px solid var(--gray-100);
        cursor: pointer;
        transition: all 0.15s;
        position: relative;

        &:hover:not(.weekend):not(.occupied) {
          background: var(--primary-light);
        }

        &.weekend {
          background: var(--gray-100);
          cursor: default;
        }

        &.occupied {
          background: var(--primary-light);
          cursor: pointer;

          &:hover {
            background: #D4DFFF;
          }
        }

        .booking-indicator {
          background: var(--primary);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          display: flex;
          flex-direction: column;
          gap: 2px;

          .booking-title {
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .booking-time {
            font-size: 10px;
            opacity: 0.8;
          }
        }
      }
    }
  }
}

// Стили формы
.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    color: var(--gray-600);
    margin-bottom: 8px;
  }
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-200);
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(45, 91, 255, 0.1);
  }
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .time-btn {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid var(--gray-200);
    background: white;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    &.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
  }
}

.responsible-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}

.form-actions {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--gray-200);
}

// Модалка ошибки
.error-modal {
  text-align: center;
  padding: 40px;

  .error-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .error-text {
    color: var(--gray-500);
    margin-bottom: 24px;
    font-size: 16px;
  }
}
</style>