<script setup>
import { useUiStore } from '../../store/ui'

const props = defineProps({
  person: { type: Object, required: true }
})

const ui = useUiStore()

function invite() {
  ui.notify(`${props.person.name} приглашён(а) к участию. Уведомление отправлено.`, 'success')
}
</script>

<template>
  <article class="person">
    <div
      class="person__photo"
      :style="{ backgroundImage: person.photo ? `url(${person.photo})` : undefined }"
    >
      <span class="person__tag">{{ person.role }}</span>
    </div>
    <div class="person__body">
      <h3 class="person__name">{{ person.name }}</h3>
      <p class="person__desc">{{ person.description }}</p>
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
  min-height: 180px;
}
.person__photo {
  width: 150px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  background-size: cover;
  background-position: center top;
  background-color: #ccc;
}
.person__tag {
  background: rgba(242, 242, 242, 0.92);
  box-shadow: var(--shadow-card);
  border-radius: 28px;
  padding: 5px 14px;
  font-weight: 600;
  font-size: 11px;
}
.person__body {
  flex: 1;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
}
.person__name {
  font-weight: 600;
  font-size: 20px;
}
.person__desc {
  font-size: 13px;
  line-height: 1.4;
  color: var(--c-text);
  flex: 1;
}
.person__actions {
  display: flex;
  gap: 10px;
}
.person__actions .btn {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
}

@media (max-width: 540px) {
  .person {
    flex-direction: column;
  }
  .person__photo {
    width: 100%;
    height: 140px;
  }
}
</style>
