<script setup>
import { ref, computed } from 'vue'
import Modal from '../ui/Modal.vue'
import ErrorModal from '../ui/ErrorModal.vue'
import TimeSlotGrid from '../ui/TimeSlotGrid.vue'
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

const title = ref('')
const slotIndexes = ref([])
const responsible = ref(['Иван Иванов', 'Елена Иванова'])
const comment = ref('')
const errorMessage = ref('')
const submitted = ref(false)

function toggleResponsible(name) {
  responsible.value = responsible.value.includes(name)
    ? responsible.value.filter((n) => n !== name)
    : [...responsible.value, name]
}

function submit() {
  submitted.value = true
  if (!title.value.trim()) return
  if (!slotIndexes.value.length) return

  const result = resources.createBooking({
    resourceId: props.resource.id,
    dateKey: dateKey.value,
    slotIndexes: slotIndexes.value,
    title: title.value.trim(),
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
</script>

<template>
  <Modal width="482px" @close="$emit('close')">
    <h2 class="modal-title">Новое мероприятие</h2>

    <div class="field">
      <label class="field-label" for="event-title">Название</label>
      <input
        id="event-title"
        v-model="title"
        class="field-input"
        placeholder="Введите название мероприятия"
        autocomplete="off"
      />
      <p v-if="submitted && !title.trim()" class="field-error">Укажите название мероприятия</p>
    </div>

    <div class="field">
      <span class="field-label">Выберите время мероприятия</span>
      <TimeSlotGrid v-model="slotIndexes" :taken="taken" />
      <p v-if="submitted && !slotIndexes.length" class="field-error">Выберите хотя бы один слот</p>
    </div>

    <div class="field">
      <span class="field-label">Ответственные лица</span>
      <div class="chip-row">
        <button
          v-for="name in ['Иван Иванов', 'Елена Иванова']"
          :key="name"
          type="button"
          class="chip"
          :class="{ 'chip--active': responsible.includes(name) }"
          @click="toggleResponsible(name)"
        >
          {{ name }}
        </button>
        <button type="button" class="chip-add" aria-label="Добавить">+</button>
      </div>
    </div>

    <div class="field">
      <label class="field-label" for="event-comment">Дополнительная информация</label>
      <input
        id="event-comment"
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
