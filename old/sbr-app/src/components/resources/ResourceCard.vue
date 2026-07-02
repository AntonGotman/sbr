<script setup>
import { ref, computed } from 'vue'
import { TIME_SLOTS, toDateKey } from '../../store/constants'
import { useResourcesStore } from '../../store/resources'
import BookingExistingModal from './BookingExistingModal.vue'

const props = defineProps({
  resource: { type: Object, required: true },
  date: { type: Date, required: true }
})

const resources = useResourcesStore()
const tab = ref('photo')
const showBooking = ref(false)
const showDetails = ref(false)

const dateKey = computed(() => toDateKey(props.date))
const taken = computed(() => resources.takenSlots(props.resource.id, dateKey.value))
const dayBookings = computed(() => resources.bookingsForDate(props.resource.id, dateKey.value))

function bookingForSlot(index) {
  return dayBookings.value.find((b) => b.slotIndexes.includes(index))
}
</script>

<template>
  <article class="resource-card">
    <div
      class="resource-card__media"
      :style="{ backgroundImage: resource.coverImage ? `url(${resource.coverImage})` : undefined }"
    >
      <div class="resource-card__tabs">
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': tab === 'photo' }"
          @click="tab = 'photo'"
        >Фото</button>
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': tab === 'info' }"
          @click="tab = 'info'"
        >Информация</button>
      </div>
      <span class="resource-card__name">{{ resource.name }}</span>
    </div>

    <transition name="fade">
      <p v-if="tab === 'info'" class="resource-card__info">
        Тип ресурса: {{ resource.type === 'space' ? 'пространство' : 'оборудование' }}.
        Сегодня забронировано {{ taken.size }} из {{ TIME_SLOTS.length }} слотов.
      </p>
    </transition>

    <div class="resource-card__schedule">
      <div class="schedule-slots">
        <span
          v-for="(label, index) in TIME_SLOTS"
          :key="label"
          class="schedule-chip"
          :class="{ 'schedule-chip--taken': taken.has(index) }"
          :title="taken.has(index) ? bookingForSlot(index)?.title : 'Свободно'"
        >
          {{ label }}
        </span>
      </div>
      <div class="schedule-actions">
        <button type="button" class="btn btn-primary" @click="showBooking = true">Забронировать</button>
        <button type="button" class="btn btn-secondary" @click="showDetails = !showDetails">Подробнее</button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showDetails" class="resource-card__details">
        <p v-if="!dayBookings.length" class="details-empty">На выбранную дату бронирований нет.</p>
        <ul v-else class="details-list">
          <li v-for="b in dayBookings" :key="b.id" class="details-item">
            <span class="details-item__time">
              {{ TIME_SLOTS[b.slotIndexes[0]].split(' - ')[0] }}–{{ TIME_SLOTS[b.slotIndexes[b.slotIndexes.length - 1]].split(' - ')[1] }}
            </span>
            <span class="details-item__title">{{ b.title }}</span>
            <span class="details-item__people">{{ b.responsible.join(', ') }}</span>
          </li>
        </ul>
      </div>
    </transition>

    <BookingExistingModal
      v-if="showBooking"
      :resource="resource"
      :date="date"
      @close="showBooking = false"
    />
  </article>
</template>

<style scoped>
.resource-card {
  background: var(--c-white);
  border-radius: var(--radius-m);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}
.resource-card__media {
  position: relative;
  height: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  background-color: #2f5650;
}
.resource-card__tabs {
  display: flex;
  gap: 8px;
}
.tab-btn {
  padding: 6px 14px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 400;
}
.tab-btn--active {
  background: var(--c-white);
  font-weight: 600;
}
.resource-card__name {
  align-self: flex-start;
  background: var(--c-white);
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
}
.resource-card__info {
  padding: 14px 16px 0;
  font-size: 13px;
  color: var(--c-text-muted);
}
.resource-card__schedule {
  background: var(--c-surface);
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.schedule-slots {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: flex-start;
}
.schedule-chip {
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--c-accent-soft);
  font-size: 12px;
  color: var(--c-text);
  white-space: nowrap;
}
.schedule-chip--taken {
  background: var(--c-accent);
  color: var(--c-white);
  font-weight: 700;
}
.schedule-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  min-width: 140px;
}
.schedule-actions .btn {
  width: 100%;
  padding: 10px 16px;
}
.resource-card__details {
  padding: 16px;
  border-top: 1px solid #e6e6e6;
}
.details-empty {
  font-size: 13px;
  color: var(--c-text-muted);
}
.details-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.details-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  align-items: center;
}
.details-item__time {
  font-weight: 700;
  color: var(--c-primary);
}
.details-item__title {
  font-weight: 600;
}
.details-item__people {
  color: var(--c-text-muted);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .resource-card__schedule {
    flex-direction: column;
  }
  .schedule-actions {
    flex-direction: row;
    width: 100%;
    min-width: 0;
  }
  .schedule-actions .btn {
    flex: 1;
  }
}
</style>
