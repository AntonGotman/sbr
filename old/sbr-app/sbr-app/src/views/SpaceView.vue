<script setup>
import { ref, computed } from 'vue'
import { useResourcesStore } from '../store/resources'
import { useInvitationsStore } from '../store/invitations'
import { useUiStore } from '../store/ui'
import { toDateKey } from '../store/constants'
import ResourceCard from '../components/resources/ResourceCard.vue'
import InviteCard from '../components/resources/InviteCard.vue'
import Calendar from '../components/ui/Calendar.vue'
import Modal from '../components/ui/Modal.vue'

const resources = useResourcesStore()
const invitations = useInvitationsStore()
const ui = useUiStore()

const selectedDate = ref(new Date())
const query = ref('')
const sort = ref('alpha')
const showAddModal = ref(false)
const newName = ref('')

const dateKey = computed(() => toDateKey(selectedDate.value))

const visibleSpaces = computed(() => {
  let list = resources.spaces.filter((r) =>
    r.name.toLowerCase().includes(query.value.trim().toLowerCase())
  )
  if (sort.value === 'alpha') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  if (sort.value === 'busy') {
    list = [...list].sort(
      (a, b) =>
        resources.takenSlots(b.id, dateKey.value).size -
        resources.takenSlots(a.id, dateKey.value).size
    )
  }
  return list
})

function acceptInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение принято. Бронирование подтверждено.', 'success')
}
function declineInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение отклонено.', 'error')
}
function createSpace() {
  if (!newName.value.trim()) return
  resources.addResource({ name: newName.value, type: 'space' })
  ui.notify(`Пространство «${newName.value.trim()}» добавлено.`, 'success')
  newName.value = ''
  showAddModal.value = false
}
</script>

<template>
  <div class="space-view container">
    <div class="space-view__toolbar">
      <div class="toolbar-control">
        <input v-model="query" class="toolbar-input" placeholder="Поиск" />
      </div>
      <select v-model="sort" class="toolbar-control toolbar-select">
        <option value="alpha">По алфавиту</option>
        <option value="busy">По загруженности</option>
      </select>
      <button type="button" class="toolbar-control toolbar-add" @click="showAddModal = true">
        Добавить +
      </button>
    </div>

    <div class="space-view__layout">
      <div class="space-view__list">
        <ResourceCard
          v-for="resource in visibleSpaces"
          :key="resource.id"
          :resource="resource"
          :date="selectedDate"
        />
        <p v-if="!visibleSpaces.length" class="empty-state">
          Ничего не найдено. Уточните запрос или добавьте новое пространство.
        </p>
      </div>

      <aside class="space-view__sidebar">
        <Calendar v-model="selectedDate" />

        <div class="sidebar-section">
          <h2 class="sidebar-title">Активные приглашения</h2>
          <ul class="invite-list">
            <InviteCard
              v-for="inv in invitations.invitations"
              :key="inv.id"
              :invitation="inv"
              @accept="acceptInvitation"
              @decline="declineInvitation"
            />
          </ul>
          <p v-if="!invitations.invitations.length" class="empty-state">Нет активных приглашений.</p>
        </div>
      </aside>
    </div>

    <Modal v-if="showAddModal" width="420px" @close="showAddModal = false">
      <h2 class="modal-title">Новое пространство</h2>
      <label class="field">
        <span class="field-label">Название</span>
        <input v-model="newName" class="field-input" placeholder="Например, Лекторий 2 этаж" @keyup.enter="createSpace" />
      </label>
      <div class="actions">
        <button type="button" class="btn btn-primary actions__submit" @click="createSpace">Добавить</button>
        <button type="button" class="btn btn-secondary" @click="showAddModal = false">Отмена</button>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.space-view { padding: 32px 24px 80px; }
.space-view__toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.toolbar-control {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 12px 16px;
}
.toolbar-input { width: 220px; font-size: 14px; }
.toolbar-select {
  border: none;
  background: var(--c-surface);
  font-size: 14px;
  color: var(--c-text);
}
.toolbar-add {
  margin-left: auto;
  font-weight: 600;
}
.space-view__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;
}
.space-view__list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.space-view__sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 96px;
}
.sidebar-section {
  background: transparent;
}
.sidebar-title { font-weight: 600; font-size: 20px; margin-bottom: 16px; }
.invite-list { display: flex; flex-direction: column; gap: 16px; }
.empty-state { color: var(--c-text-muted); font-size: 14px; }
.modal-title { font-weight: 600; font-size: 22px; margin-bottom: 20px; }
.field { display: flex; flex-direction: column; margin-bottom: 24px; }
.actions { display: flex; gap: 10px; }
.actions__submit { flex: 1; }

@media (max-width: 980px) {
  .space-view__layout { grid-template-columns: 1fr; }
  .space-view__sidebar { position: static; }
  .toolbar-add { margin-left: 0; }
}
</style>
