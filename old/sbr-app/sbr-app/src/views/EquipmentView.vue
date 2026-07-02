<script setup>
import { ref } from 'vue'
import { useResourcesStore } from '../store/resources'
import { useUiStore } from '../store/ui'
import ResourceCard from '../components/resources/ResourceCard.vue'
import Modal from '../components/ui/Modal.vue'

const resources = useResourcesStore()
const ui = useUiStore()

const selectedDate = ref(new Date())
const showAddModal = ref(false)
const newName = ref('')

function createEquipment() {
  if (!newName.value.trim()) return
  resources.addResource({ name: newName.value, type: 'equipment' })
  ui.notify(`Оборудование «${newName.value.trim()}» добавлено.`, 'success')
  newName.value = ''
  showAddModal.value = false
}

function remove(id) {
  resources.removeResource(id)
  ui.notify('Оборудование удалено из списка.', 'success')
}
</script>

<template>
  <div class="equipment-view container">
    <div class="equipment-view__toolbar">
      <h1 class="equipment-view__title">Аппаратура</h1>
      <button type="button" class="btn btn-primary" @click="showAddModal = true">Добавить оборудование</button>
    </div>

    <div class="equipment-view__grid">
      <div v-for="item in resources.equipment" :key="item.id" class="equipment-item">
        <ResourceCard :resource="item" :date="selectedDate" />
        <button type="button" class="equipment-item__remove" @click="remove(item.id)">
          Удалить ресурс
        </button>
      </div>
      <p v-if="!resources.equipment.length" class="empty-state">
        Список оборудования пуст. Добавьте первую единицу техники.
      </p>
    </div>

    <Modal v-if="showAddModal" width="420px" @close="showAddModal = false">
      <h2 class="modal-title">Новое оборудование</h2>
      <label class="field">
        <span class="field-label">Название</span>
        <input v-model="newName" class="field-input" placeholder="Например, Радиомикрофон Sennheiser" @keyup.enter="createEquipment" />
      </label>
      <div class="actions">
        <button type="button" class="btn btn-primary actions__submit" @click="createEquipment">Добавить</button>
        <button type="button" class="btn btn-secondary" @click="showAddModal = false">Отмена</button>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.equipment-view { padding: 32px 24px 80px; }
.equipment-view__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}
.equipment-view__title { font-weight: 600; font-size: 28px; }
.equipment-view__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 24px;
  align-items: start;
}
.equipment-item { display: flex; flex-direction: column; gap: 10px; }
.equipment-item__remove {
  align-self: flex-end;
  font-size: 13px;
  color: var(--c-text-muted);
}
.equipment-item__remove:hover { color: var(--c-danger); }
.empty-state { color: var(--c-text-muted); font-size: 14px; }
.modal-title { font-weight: 600; font-size: 22px; margin-bottom: 20px; }
.field { display: flex; flex-direction: column; margin-bottom: 24px; }
.actions { display: flex; gap: 10px; }
.actions__submit { flex: 1; }
</style>
