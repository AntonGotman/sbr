<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">Сотрудники</h2>
      <div class="header-controls">
        <input v-model="search" placeholder="Поиск" class="search-input" />
        <button class="btn btn-secondary">По алфавиту</button>
        <button class="btn btn-primary">+ Добавить</button>
      </div>
    </div>

    <div class="employees-grid">
      <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-card">
        <div class="employee-top">
          <div class="employee-info">
            <div class="avatar">👤</div>
            <div>
              <h3 class="employee-name">{{ employee.name }}</h3>
              <p class="employee-email">{{ employee.email }}</p>
            </div>
          </div>
          <span class="status" :class="{ invited: employee.invited }">
            {{ employee.invited ? 'Приглашен' : 'Не приглашен' }}
          </span>
        </div>

        <p class="employee-desc">{{ employee.description }}</p>

        <div class="employee-actions">
          <button class="btn btn-primary btn-sm">Пригласить</button>
          <button class="btn btn-secondary btn-sm">Подробнее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const employees = ref([
  {
    id: 1,
    name: 'Иван Иванов',
    email: 'example@yandex.ru',
    description: 'Высококачественная видеосъёмка и аэросъёмка: доступные цены, профессиональное оборудование и опыт работы.',
    invited: false
  },
  {
    id: 2,
    name: 'Елена Иванова',
    email: 'elena@example.com',
    description: 'Профессиональный фотограф с 10-летним опытом работы в студийной и репортажной съёмке.',
    invited: true
  },
  {
    id: 3,
    name: 'Петр Петров',
    email: 'petr@example.com',
    description: 'Специалист по видеомонтажу и цветокоррекции, работа с материалами любой сложности.',
    invited: false
  }
])

const filteredEmployees = computed(() => {
  if (!search.value) return employees.value
  const q = search.value.toLowerCase()
  return employees.value.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.email.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
}

.header-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  padding: 8px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #2196f3;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #edf2f7;
}

.btn-sm {
  padding: 6px 16px;
  font-size: 13px;
}

.employees-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.employee-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s;
}

.employee-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.employee-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.employee-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  background: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.employee-name {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
}

.employee-email {
  font-size: 14px;
  color: #718096;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: #f7fafc;
  color: #718096;
  white-space: nowrap;
}

.status.invited {
  background: #e8f5e9;
  color: #388e3c;
}

.employee-desc {
  color: #4a5568;
  font-size: 14px;
  margin: 8px 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.employee-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f7fafc;
}
</style>