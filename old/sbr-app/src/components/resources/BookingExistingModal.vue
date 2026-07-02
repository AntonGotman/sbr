<script setup>
import { ref, computed } from 'vue'
import Modal from '../ui/Modal.vue'
import ErrorModal from '../ui/ErrorModal.vue'
import TimeSlotGrid from '../ui/TimeSlotGrid.vue'
import NewEventModal from './NewEventModal.vue'
import { useResourcesStore } from '../../store/resources'
import { usePeopleStore } from '../../store/people'
import { useAuthStore } from '../../store/auth'
import { useUiStore } from '../../store/ui'
import { toDateKey } from '../../store/constants'

const props = defineProps({
  resource: { type: Object, required: true },
  date: { type: Date, required: true }
})
const emit = defineEmits(['close', 'created'])

const resources = useResourcesStore()
const people = usePeopleStore()
const auth = useAuthStore()
const ui = useUiStore()

const dateKey = computed(() => toDateKey(props.date))
const taken = computed(() => resources.takenSlots(props.resource.id, dateKey.value))

const pastTitles = computed(() => {
  const titles = new Set(props.resource.bookings.map((b) => b.title))
  return [...titles]
})

const selectedEvent = ref('')
const slotIndexes = ref([])
const responsible = ref(['Иван Иванов', 'Елена Иванова'])
const comment = ref('')
const errorMessage = ref('')
const submitted = ref(false)
const showNewEvent = ref(false)

function submit() {
  submitted.value = true
  if (!selectedEvent.value) return
  if (!slotIndexes.value.length) return

  const result = resources.createBooking({
    resourceId: props.resource.id,
    dateKey: dateKey.value,
    slotIndexes: slotIndexes.value,
    title: selectedEvent.value,
    responsible: responsible.value,
    comment: comment.value.trim(),
    ownerEmail: auth.user?.email
  })

  if (!result.ok) {
    errorMessage.value = result.message
    return
  }

  ui.notify('Бронирование создано.', 'success')
  emit('created', result.booking)
  emit('close')
}

function onNewEventCreated(booking) {
  showNewEvent.value = false
  selectedEvent.value = booking.title
  emit('created', booking)
}
</script>

<template>
  <Modal width="482px" @close="$emit('close')">
    <h2 class="modal-title">Бронирование</h2>

    <div class="field">
      <label class="field-label" for="event-select">Мероприятие</label>
      <div class="select-wrap">
        <select id="event-select" v-model="selectedEvent" class="field-select">
          <option value="" disabled>Выберите мероприятие</option>
          <option v-for="t in pastTitles" :key="t" :value="t">{{ t }}</option>
        </select>
        <span class="select-chevron" aria-hidden="true">▾</span>
      </div>
      <button type="button" class="link-new" @click="showNewEvent = true">+ Новое мероприятие</button>
      <p v-if="submitted && !selectedEvent" class="field-error">Выберите мероприятие</p>
    </div>

    <div class="field">
      <span class="field-label">Выберите время мероприятия</span>
      <TimeSlotGrid v-model="slotIndexes" :taken="taken" />
      <p v-if="submitted && !slotIndexes.length" class="field-error">Выберите хотя бы один слот</p>
    </div>

    <div class="field">
      <span class="field-label">Ответственные лица</span>
      <div class="chip-row">
        <span
          v-for="name in responsible"
          :key="name"
          class="chip chip--active"
        >{{ name }}</span>
        <button type="button" class="chip-add" aria-label="Добавить">+</button>
      </div>
    </div>

    <div class="field">
      <label class="field-label" for="booking-comment">Дополнительная информация</label>
      <input
        id="booking-comment"
        v-model="comment"
        class="field-input"
        placeholder="Добавить комментарий"
      />
    </div>

    <div class="actions">
      <button type="button" class="btn btn-primary actions__submit" @click="submit">Забронировать</button>
      <button type="button" class="btn btn-secondary" @click="$emit('close')">Отмена</button>
    </div>
  </Modal>

  <NewEventModal
    v-if="showNewEvent"
    :resource="resource"
    :date="date"
    @close="showNewEvent = false"
    @created="onNewEventCreated"
  />

  <ErrorModal
    v-if="errorMessage"
    :message="errorMessage"
    @close="errorMessage = ''"
  />
</template>

<style scoped>
.modal-title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 24px;
}
.field {
  margin-bottom: 22px;
}
.field-error {
  color: var(--c-danger);
  font-size: 12px;
  margin-top: 6px;
}
.select-wrap {
  position: relative;
  border-bottom: 1px solid var(--c-text-muted);
  padding-bottom: 10px;
}
.field-select {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--c-text-muted);
  appearance: none;
  padding-right: 24px;
}
.field-select:valid,
.field-select option:not([value='']) {
  color: var(--c-text);
}
.select-chevron {
  position: absolute;
  right: 0;
  top: 2px;
  color: var(--c-text-muted);
  pointer-events: none;
}
.link-new {
  margin-top: 8px;
  font-size: 13px;
  color: var(--c-primary);
  font-weight: 600;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--c-text-muted);
}
.chip {
  padding: 6px 16px;
  border-radius: 5px;
  background: var(--c-accent-soft);
  color: var(--c-text);
  font-weight: 600;
  font-size: 12px;
}
.chip--active {
  background: var(--c-accent);
  color: var(--c-white);
}
.chip-add {
  font-size: 20px;
  color: var(--c-text);
  line-height: 1;
  padding: 0 4px;
}
.actions {
  display: flex;
  gap: 10px;
}
.actions__submit {
  flex: 1;
}
</style>
