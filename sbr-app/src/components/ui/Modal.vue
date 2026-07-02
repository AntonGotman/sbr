<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  width: { type: String, default: '482px' }
})
const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="modal-overlay" @mousedown.self="$emit('close')">
    <div class="modal-panel" :style="{ maxWidth: width }" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(21, 21, 20, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 900;
}
.modal-panel {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 32px 36px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: pop-in .16s ease;
}
@keyframes pop-in {
  from { opacity: 0; transform: translateY(6px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
