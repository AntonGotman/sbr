<script setup>
import { useUiStore } from '../../store/ui'

const ui = useUiStore()
</script>

<template>
  <div class="toast-stack" role="status" aria-live="polite">
    <transition-group name="toast">
      <div
        v-for="toast in ui.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
      >
        <span class="toast__dot" />
        <p class="toast__text">{{ toast.message }}</p>
        <button class="toast__close" @click="ui.dismiss(toast.id)" aria-label="Закрыть уведомление">×</button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: min(360px, 90vw);
}
.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--c-white);
  border-radius: var(--radius-s);
  box-shadow: 0 6px 24px rgba(0,0,0,.18);
  padding: 14px 16px;
}
.toast__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
  background: var(--c-primary);
}
.toast--error .toast__dot { background: var(--c-danger); }
.toast__text {
  font-size: 14px;
  line-height: 19px;
  flex: 1;
}
.toast__close {
  font-size: 16px;
  line-height: 1;
  color: var(--c-text-muted);
  padding: 0 2px;
}
.toast-enter-active, .toast-leave-active { transition: all .2s ease; }
.toast-enter-from { opacity: 0; transform: translateY(8px); }
.toast-leave-to { opacity: 0; transform: translateX(8px); }
</style>
