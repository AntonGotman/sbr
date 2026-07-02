<script setup>
defineProps({
  title: { type: String, default: 'Ошибка' },
  message: { type: String, default: 'Неверный запрос. Обратитесь в техподдержку' }
})
defineEmits(['close'])
</script>

<template>
  <div class="error-overlay" @mousedown.self="$emit('close')">
    <div class="error-panel" role="alertdialog" aria-modal="true">
      <h2 class="error-panel__title">{{ title }}</h2>
      <p class="error-panel__message">{{ message }}</p>
      <button class="btn btn-primary error-panel__btn" type="button" @click="$emit('close')">
        Принять
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-overlay {
  position: fixed;
  inset: 0;
  background: rgba(21, 21, 20, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 950;
}
.error-panel {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 20px 30px;
  width: 100%;
  max-width: 372px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  animation: pop-in .16s ease;
}
.error-panel__title {
  font-weight: 600;
  font-size: 24px;
}
.error-panel__message {
  font-size: 14px;
  line-height: 19px;
}
.error-panel__btn { width: 100%; }
@keyframes pop-in {
  from { opacity: 0; transform: translateY(6px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
