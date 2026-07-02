<script setup>
import { computed, ref } from 'vue'
import { WEEKDAYS, MONTHS, toDateKey } from '../../store/constants'

const props = defineProps({
  modelValue: { type: Date, required: true }
})
const emit = defineEmits(['update:modelValue'])

const viewDate = ref(new Date(props.modelValue.getFullYear(), props.modelValue.getMonth(), 1))

const today = new Date()
const todayKey = toDateKey(today)

const grid = computed(() => {
  const first = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), 1)
  // Monday-first offset
  const offset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(first.getDate() - offset)

  const cells = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    cells.push(d)
  }
  return cells
})

function isCurrentMonth(d) {
  return d.getMonth() === viewDate.value.getMonth()
}
function isWeekend(d) {
  return d.getDay() === 0 || d.getDay() === 6
}
function isSelected(d) {
  return toDateKey(d) === toDateKey(props.modelValue)
}
function isToday(d) {
  return toDateKey(d) === todayKey
}
function select(d) {
  emit('update:modelValue', d)
  if (!isCurrentMonth(d)) {
    viewDate.value = new Date(d.getFullYear(), d.getMonth(), 1)
  }
}
function prevMonth() {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1)
}
function nextMonth() {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1)
}
</script>

<template>
  <div class="calendar">
    <div class="calendar__head">
      <span class="calendar__month">{{ MONTHS[viewDate.getMonth()] }} {{ viewDate.getFullYear() }}</span>
      <div class="calendar__nav">
        <button type="button" aria-label="Предыдущий месяц" @click="prevMonth">‹</button>
        <button type="button" aria-label="Следующий месяц" @click="nextMonth">›</button>
      </div>
    </div>
    <div class="calendar__weekdays">
      <span v-for="d in WEEKDAYS" :key="d">{{ d }}</span>
    </div>
    <div class="calendar__grid">
      <button
        v-for="(d, i) in grid"
        :key="i"
        type="button"
        class="calendar__cell"
        :class="{
          'calendar__cell--muted': !isCurrentMonth(d),
          'calendar__cell--weekend': isWeekend(d) && isCurrentMonth(d),
          'calendar__cell--selected': isSelected(d),
          'calendar__cell--today': isToday(d) && !isSelected(d)
        }"
        @click="select(d)"
      >
        {{ d.getDate() }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  background: var(--c-surface);
  border-radius: 9px;
  padding: 24px;
}
.calendar__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.calendar__month {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.3px;
}
.calendar__nav {
  display: flex;
  gap: 8px;
}
.calendar__nav button {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 16px;
  color: var(--c-text-muted);
  background: var(--c-white);
}
.calendar__nav button:hover { color: var(--c-text); }
.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 12px;
  font-weight: 600;
  color: var(--c-primary-dark);
  text-align: center;
  margin-bottom: 4px;
}
.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 2px;
}
.calendar__cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  color: var(--c-text);
  margin: 2px auto;
  width: 34px;
  height: 34px;
}
.calendar__cell:hover { background: rgba(67, 113, 107, 0.12); }
.calendar__cell--muted { color: var(--c-text-faint); }
.calendar__cell--weekend { color: var(--c-danger); }
.calendar__cell--today { box-shadow: inset 0 0 0 1px var(--c-primary); }
.calendar__cell--selected {
  background: var(--c-primary);
  color: var(--c-white);
  font-weight: 600;
}
</style>
