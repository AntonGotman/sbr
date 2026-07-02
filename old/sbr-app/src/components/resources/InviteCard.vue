<script setup>
defineProps({
  invitation: { type: Object, required: true }
})
defineEmits(['accept', 'decline'])
</script>

<template>
  <li class="invite">
    <p class="invite__title">{{ invitation.title }}</p>
    <div class="invite__tags">
      <span class="tag">{{ invitation.slotLabel }}</span>
      <span class="tag">{{ invitation.ownerName }}</span>
      <span class="tag">{{ invitation.role }}</span>
    </div>
    <div class="invite__actions">
      <button type="button" class="btn btn-primary" @click="$emit('accept', invitation.id)">Подробнее</button>
      <button type="button" class="btn btn-secondary" @click="$emit('decline', invitation.id)">Отклонить</button>
    </div>
  </li>
</template>

<style scoped>
.invite {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.invite__title {
  font-weight: 600;
  font-size: 16px;
}
.invite__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.invite__actions {
  display: flex;
  gap: 10px;
}
.invite__actions .btn {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
}
</style>
