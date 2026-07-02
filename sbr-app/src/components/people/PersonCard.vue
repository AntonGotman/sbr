<script setup>
import { useUiStore } from '../../store/ui'

const props = defineProps({
  person: { type: Object, required: true }
})

const ui = useUiStore()

function invite() {
  ui.notify(`${props.person.name} приглашён(а) к участию. Уведомление отправлено.`, 'success')
}

// Стиль левой панели: реальное фото или монотонный цвет
function photoStyle(person) {
  if (person.photo) {
    return {
      backgroundImage: `url(${person.photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top'
    }
  }
  return { backgroundColor: person.color || '#86AEAA' }
}
</script>

<template>
  <article class="person">
    <div class="person__photo" :style="photoStyle(person)">
      <span class="person__tag">{{ person.role }}</span>
    </div>
    <div class="person__body">
      <div class="person__top">
        <h3 class="person__name">{{ person.name }}</h3>
        <p class="person__desc">{{ person.description }}</p>
      </div>
      <div class="person__actions">
        <button type="button" class="btn btn-primary" @click="invite">Пригласить</button>
        <button type="button" class="btn btn-secondary">Подробнее</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.person {
  display: flex;
  background: var(--c-surface);
  border-radius: var(--radius-m);
  overflow: hidden;
  min-height: 166px;
}
.person__photo {
  width: 166px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  padding: 10px;
}
.person__tag {
  background: rgba(242, 242, 242, 0.92);
  box-shadow: var(--shadow-card);
  border-radius: 28px;
  padding: 5px 16px;
  font-weight: 600;
  font-size: 11px;
  white-space: nowrap;
}
.person__body {
  flex: 1;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
}
.person__top { display: flex; flex-direction: column; gap: 8px; }
.person__name { font-weight: 600; font-size: 20px; line-height: 1.2; }
.person__desc {
  font-size: 13px;
  line-height: 1.45;
  color: var(--c-text);
}
.person__actions { display: flex; gap: 10px; }
.person__actions .btn { flex: 1; padding: 8px 12px; font-size: 13px; }

@media (max-width: 540px) {
  .person { flex-direction: column; }
  .person__photo { width: 100%; height: 140px; }
}
</style>
