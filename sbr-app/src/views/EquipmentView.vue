<script setup>
import { ref } from 'vue'
import { useResourcesStore } from '../store/resources'
import { MOCK_DATE } from '../store/constants'
import ResourceCard from '../components/resources/ResourceCard.vue'

const resources = useResourcesStore()
const selectedDate = ref(new Date(MOCK_DATE))
</script>

<template>
  <div class="equipment-view container">
    <div class="equipment-view__grid">
      <ResourceCard
        v-for="item in resources.equipment"
        :key="item.id"
        :resource="item"
        :date="selectedDate"
      />
    </div>
  </div>
</template>

<style scoped>
.equipment-view {
  padding: 32px 24px 80px;
}
.equipment-view__grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 720px;
}
</style>
