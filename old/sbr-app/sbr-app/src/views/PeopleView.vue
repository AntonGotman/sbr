<script setup>
import { ref } from 'vue'
import { usePeopleStore } from '../store/people'
import { useInvitationsStore } from '../store/invitations'
import { useUiStore } from '../store/ui'
import PersonCard from '../components/people/PersonCard.vue'
import InviteCard from '../components/resources/InviteCard.vue'
import Calendar from '../components/ui/Calendar.vue'
import Modal from '../components/ui/Modal.vue'

const people = usePeopleStore()
const invitations = useInvitationsStore()
const ui = useUiStore()

const calendarDate = ref(new Date())
const showAddModal = ref(false)
const form = ref({ name: '', role: '', description: '' })

function acceptInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение принято. Бронирование подтверждено.', 'success')
}
function declineInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение отклонено.', 'error')
}
function createPerson() {
  if (!form.value.name.trim()) return
  people.addPerson(form.value)
  ui.notify(`${form.value.name.trim()} добавлен(а) в список людей.`, 'success')
  form.value = { name: '', role: '', description: '' }
  showAddModal.value = false
}
</script>

<template>
  <div class="people-view container">
    <div class="people-view__toolbar">
      <div class="toolbar-control">
        <input
          :value="people.query"
          class="toolbar-input"
          placeholder="Поиск"
          @input="people.setQuery($event.target.value)"
        />
      </div>
      <select
        :value="people.sort"
        class="toolbar-control toolbar-select"
        @change="people.setSort($event.target.value)"
      >
        <option value="alpha">По алфавиту</option>
        <option value="role">По роли</option>
      </select>
      <button type="button" class="toolbar-control toolbar-add" @click="showAddModal = true">
        Добавить +
      </button>
    </div>

    <div class="people-view__layout">
      <div class="people-view__grid">
        <PersonCard v-for="p in people.filtered" :key="p.id" :person="p" />
        <p v-if="!people.filtered.length" class="empty-state">Никого не нашлось по запросу.</p>
      </div>

      <aside class="people-view__sidebar">
        <Calendar v-model="calendarDate" />
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
      <h2 class="modal-title">Новый человек</h2>
      <label class="field">
        <span class="field-label">Имя и фамилия</span>
        <input v-model="form.name" class="field-input" placeholder="Иван Иванов" />
      </label>
      <label class="field">
        <span class="field-label">Роль</span>
        <input v-model="form.role" class="field-input" placeholder="Фотограф" />
      </label>
      <label class="field">
        <span class="field-label">Описание</span>
        <textarea v-model="form.description" class="field-input field-textarea" rows="3" placeholder="Краткое описание услуг" />
      </label>
      <div class="actions">
        <button type="button" class="btn btn-primary actions__submit" @click="createPerson">Добавить</button>
        <button type="button" class="btn btn-secondary" @click="showAddModal = false">Отмена</button>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.people-view { padding: 32px 24px 80px; }
.people-view__toolbar {
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
.toolbar-select { border: none; background: var(--c-surface); font-size: 14px; }
.toolbar-add { margin-left: auto; font-weight: 600; }
.people-view__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;
}
.people-view__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-content: start;
}
.people-view__sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 96px; }
.sidebar-title { font-weight: 600; font-size: 20px; margin-bottom: 16px; }
.invite-list { display: flex; flex-direction: column; gap: 16px; }
.empty-state { color: var(--c-text-muted); font-size: 14px; }
.modal-title { font-weight: 600; font-size: 22px; margin-bottom: 20px; }
.field { display: flex; flex-direction: column; margin-bottom: 20px; }
.field-textarea { resize: vertical; font-family: inherit; }
.actions { display: flex; gap: 10px; }
.actions__submit { flex: 1; }

@media (max-width: 980px) {
  .people-view__layout { grid-template-columns: 1fr; }
  .people-view__sidebar { position: static; }
  .toolbar-add { margin-left: 0; }
}
@media (max-width: 640px) {
  .people-view__grid { grid-template-columns: 1fr; }
}
</style>
