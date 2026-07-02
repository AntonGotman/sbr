<template>
  <div class="booking-form-new card">
    <h2># Новое мероприятие</h2>

    <div class="form-group">
      <label>Название</label>
      <input v-model="form.title" placeholder="Введите название мероприятия" />
    </div>

    <div class="form-group">
      <label>Выберите время мероприятия</label>
      <div class="time-grid" style="grid-template-columns: repeat(3, 1fr);">
        <div
          v-for="slot in timeSlots"
          :key="slot"
          class="time-slot"
          :class="{ selected: isSlotSelected(slot) }"
          @click="selectTime(slot)"
        >
          {{ slot }}
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Ответственные лица</label>
      <select v-model="form.responsiblePerson">
        <option value="">Выберите ответственного</option>
        <option value="ivanov">Иван Иванов</option>
        <option value="ivanova">Елена Иванова</option>
        <option value="petrov">Петр Петров</option>
      </select>
    </div>

    <div class="form-group">
      <label>Дополнительная информация</label>
      <textarea v-model="form.comment" placeholder="Добавить комментарий"></textarea>
    </div>

    <div class="flex gap-2">
      <AppButton variant="primary" @click="handleSubmit">
        Забронировать
      </AppButton>
      <AppButton variant="secondary" @click="handleCancel">
        Отмена
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

const timeSlots = [
  '08.00 - 09.00', '09.00 - 10.00', '10.00 - 11.00', '11.00 - 12.00',
  '12.00 - 13.00', '13.00 - 14.00', '14.00 - 15.00', '15.00 - 16.00',
  '16.00 - 17.00', '17.00 - 18.00', '18.00 - 19.00', '19.00 - 20.00'
]

const form = reactive({
  title: '',
  responsiblePerson: '',
  comment: '',
  selectedTime: ''
})

const selectedTime = ref('')

const isSlotSelected = (slot: string) => {
  return selectedTime.value === slot
}

const selectTime = (slot: string) => {
  selectedTime.value = slot
  form.selectedTime = slot
}

const handleSubmit = () => {
  if (!form.title || !selectedTime.value || !form.responsiblePerson) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }
  console.log('Новое мероприятие:', form)
  alert('Мероприятие создано!')
}

const handleCancel = () => {
  form.title = ''
  form.responsiblePerson = ''
  form.comment = ''
  selectedTime.value = ''
}
</script>

<style scoped>
.booking-form-new {
  max-width: 600px;
  margin: 0 auto;
}
</style>