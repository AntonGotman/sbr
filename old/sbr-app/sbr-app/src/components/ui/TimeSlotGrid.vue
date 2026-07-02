<script setup>
import { TIME_SLOTS } from '../../store/constants'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }, // selected slot indexes
  taken: { type: Object, default: () => new Set() }, // taken slot indexes (Set)
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

function toggle(index) {
  if (props.disabled || props.taken.has(index)) return
  const current = props.modelValue
  const next = current.includes(index)
    ? current.filter((i) => i !== index)
    : [...current, index]
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="slot-grid">
    <button
      v-for="(label, index) in TIME_SLOTS"
      :key="label"
      type="button"
      class="slot"
      :class="{
        'slot--selected': modelValue.includes(index),
        'slot--taken': taken.has(index)
      }"
      :disabled="disabled || taken.has(index)"
      :aria-pressed="modelValue.includes(index)"
      @click="toggle(index)"
    >
      {{ label }}
    </button>
  </div>
</template>

<style scoped>
.slot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
}
.slot {
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--c-accent-soft);
  color: var(--c-text);
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
  text-align: center;
  transition: background .12s ease, color .12s ease, opacity .12s ease;
}
.slot:hover:not(:disabled) {
  background: #c7d8d5;
}
.slot--selected {
  background: var(--c-accent);
  color: var(--c-white);
  font-weight: 700;
}
.slot--taken {
  background: #e8e8e8;
  color: var(--c-text-faint);
  text-decoration: line-through;
  cursor: not-allowed;
}
.slot:disabled {
  opacity: .7;
  cursor: not-allowed;
}
@media (max-width: 520px) {
  .slot-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
