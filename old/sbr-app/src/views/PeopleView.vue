<script setup>
import { ref } from 'vue'
import { usePeopleStore } from '../store/people'
import { useInvitationsStore } from '../store/invitations'
import { useUiStore } from '../store/ui'
import { MOCK_DATE } from '../store/constants'
import PersonCard from '../components/people/PersonCard.vue'
import InviteCard from '../components/resources/InviteCard.vue'
import Calendar from '../components/ui/Calendar.vue'

const people = usePeopleStore()
const invitations = useInvitationsStore()
const ui = useUiStore()

const calendarDate = ref(new Date(MOCK_DATE))

function acceptInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение принято. Бронирование подтверждено.', 'success')
}
function declineInvitation(id) {
  invitations.resolve(id)
  ui.notify('Приглашение отклонено.', 'error')
}
</script>

<template>
  <div class="people-view container">
    <div class="people-view__toolbar">
      <div class="toolbar-control toolbar-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
          <path d="M16 16l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
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
      </select>
      <button type="button" class="toolbar-control toolbar-add">
        Добавить +
      </button>
    </div>

    <div class="people-view__layout">
      <div class="people-view__grid">
        <PersonCard v-for="p in people.filtered" :key="p.id" :person="p" />
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
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.people-view {
  padding: 32px 24px 80px;
}
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
  font-size: 14px;
}
.toolbar-search {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 200px;
  max-width: 360px;
  color: var(--c-text-muted);
}
.toolbar-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--c-text);
}
.toolbar-select {
  border: none;
  background: var(--c-surface);
  color: var(--c-text);
}
.toolbar-add {
  margin-left: auto;
  font-weight: 600;
  background: var(--c-surface);
}
.people-view__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 28px;
  align-items: start;
}
.people-view__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  align-content: start;
}
.people-view__sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.sidebar-title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
}
.invite-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 980px) {
  .people-view__layout {
    grid-template-columns: 1fr;
  }
  .toolbar-add {
    margin-left: 0;
  }
}
@media (max-width: 640px) {
  .people-view__grid {
    grid-template-columns: 1fr;
  }
}
</style>
