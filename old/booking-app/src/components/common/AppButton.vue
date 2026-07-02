<template>
  <button
    :class="['btn', `btn-${variant}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>