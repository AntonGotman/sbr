<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  id?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>