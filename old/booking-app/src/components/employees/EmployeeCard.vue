<template>
  <div class="employee-card card">
    <div class="employee-header flex-between">
      <div class="employee-info flex gap-1">
        <div class="avatar">👤</div>
        <div>
          <h4>{{ employee.name }}</h4>
          <p class="text-muted" style="font-size: 14px;">{{ employee.email }}</p>
        </div>
      </div>
      <span class="status" :class="{ invited: employee.isInvited }">
        {{ employee.isInvited ? 'Приглашен' : 'Не приглашен' }}
      </span>
    </div>

    <p class="employee-description">{{ employee.description }}</p>

    <div class="employee-actions flex gap-1">
      <AppButton variant="primary" size="sm">
        {{ employee.isInvited ? 'Отменить' : 'Пригласить' }}
      </AppButton>
      <AppButton variant="secondary" size="sm">Подробнее</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import type { Employee } from '@/types'

defineProps<{
  employee: Employee
}>()
</script>

<style scoped>
.employee-card {
  padding: 16px;
}

.employee-header {
  margin-bottom: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  background: #E3F2FD;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: #F5F7FA;
  color: #718096;
}

.status.invited {
  background: #E8F5E9;
  color: #388E3C;
}

.employee-description {
  color: #4A5568;
  font-size: 14px;
  margin: 8px 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.employee-actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F7FAFC;
}
</style>