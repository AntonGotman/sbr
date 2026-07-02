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
      class="person__avatar"
      :style="{ background: `linear-gradient(135deg, hsl(${person.hue},45%,38%), hsl(${person.hue + 30},55%,62%))` }"
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
}
.person__avatar {
  width: 166px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  padding: 10px;
}
.person__tag {
  background: rgba(242, 242, 242, 0.85);
  box-shadow: var(--shadow-card);
  border-radius: 28px;
  padding: 5px 16px;
  font-weight: 600;
  font-size: 11px;
}
.person__body {
  flex: 1;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: space-between;
}
.person__name { font-weight: 600; font-size: 22px; }
.person__desc { font-size: 14px; line-height: 19px; color: var(--c-text); }
.person__actions { display: flex; gap: 10px; }
.person__actions .btn { flex: 1; }

@media (max-width: 540px) {
  .person { flex-direction: column; }
  .person__avatar { width: 100%; height: 140px; }
}
</style>
