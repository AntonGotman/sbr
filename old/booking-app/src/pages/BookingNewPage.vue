<template>
  <div class="page-container">
    <div class="booking-card">
      <h1 class="page-title"># Новое мероприятие</h1>

      <!-- Название -->
      <div class="form-group">
        <label>Название</label>
        <input v-model="form.title" placeholder="Введите название мероприятия" />
      </div>

      <!-- Время -->
      <div class="form-group">
        <label>Выберите время мероприятия</label>
        <div class="time-grid">
          <button
            v-for="time in timeSlots"
            :key="time"
            class="time-slot"
            :class="{ active: selectedTime === time }"
            @click="selectedTime = time"
          >
            {{ time }}
          </button>
        </div>
      </div>

      <!-- Ответственные лица -->
      <div class="form-group">
        <label>Ответственные лица</label>
        <select v-model="form.responsible">
          <option value="">Выберите ответственного</option>
          <option value="ivanov">Иван Иванов</option>
          <option value="ivanova">Елена Иванова</option>
          <option value="petrov">Петр Петров</option>
        </select>
      </div>

      <!-- Комментарий -->
      <div class="form-group">
        <label>Дополнительная информация</label>
        <textarea v-model="form.comment" placeholder="Добавить комментарий"></textarea>
      </div>

      <!-- Кнопки -->
      <div class="button-group">
        <button class="btn btn-primary" @click="submitBooking">Забронировать</button>
        <button class="btn btn-secondary" @click="resetForm">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const timeSlots = [
  '08.00 - 09.00', '09.00 - 10.00', '10.00 - 11.00', '11.00 - 12.00',
  '12.00 - 13.00', '13.00 - 14.00', '14.00 - 15.00', '15.00 - 16.00',
  '16.00 - 17.00', '17.00 - 18.00', '18.00 - 19.00', '19.00 - 20.00'
]

const form = reactive({
  title: '',
  responsible: '',
  comment: ''
})

const selectedTime = ref('')

const submitBooking = () => {
  if (!form.title || !selectedTime.value || !form.responsible) {
    alert('Пожалуйста, заполните все поля')
    return
  }
  alert('Мероприятие создано!')
  console.log('Новое мероприятие:', { ...form, time: selectedTime.value })
}

const resetForm = () => {
  form.title = ''
  form.responsible = ''
  form.comment = ''
  selectedTime.value = ''
}
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.booking-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: #2d3748;
  margin-bottom: 8px;
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  background: white;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2196f3;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.time-slot {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  color: #2d3748;
}

.time-slot:hover {
  border-color: #2196f3;
  background: #f7faff;
}

.time-slot.active {
  border-color: #2196f3;
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #edf2f7;
}
</style>