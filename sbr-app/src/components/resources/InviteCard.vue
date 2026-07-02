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
    <p v-if="invitation.resourceName" class="invite__resource">
      {{ invitation.resourceName }}
    </p>
    <div class="invite__actions">
      <button type="button" class="invite__btn invite__btn--primary"
              @click="$emit('accept', invitation.id)">
        Подробнее
      </button>
      <button type="button" class="invite__btn invite__btn--secondary"
              @click="$emit('decline', invitation.id)">
        Отклонить
      </button>
    </div>
  </li>
</template>

<style scoped>
.invite {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
}
.invite__title {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
}
.invite__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 5px;
  background: var(--c-accent);
  color: var(--c-white);
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;
  white-space: nowrap;
}
.invite__resource {
  font-size: 13px;
  color: var(--c-text-muted);
  margin: -4px 0;
}
.invite__actions { display: flex; gap: 10px; }
.invite__btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: var(--radius-s);
  font-size: 14px;
  font-weight: 700;
  transition: opacity 0.12s ease;
}
.invite__btn:hover { opacity: 0.88; }
.invite__btn--primary  { background: var(--c-primary); color: var(--c-white); }
.invite__btn--secondary {
  background: var(--c-white);
  color: var(--c-text);
  font-weight: 400;
  box-shadow: var(--shadow-card);
}
</style>
