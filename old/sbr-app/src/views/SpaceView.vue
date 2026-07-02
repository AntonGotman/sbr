<script setup>
import { ref, computed } from 'vue'
import { useResourcesStore } from '../store/resources'
import { useInvitationsStore } from '../store/invitations'
import { useUiStore } from '../store/ui'
import { MOCK_DATE } from '../store/constants'
import ResourceCard from '../components/resources/ResourceCard.vue'
import InviteCard from '../components/resources/InviteCard.vue'
import Calendar from '../components/ui/Calendar.vue'

const resources = useResourcesStore()
const invitations = useInvitationsStore()
const ui = useUiStore()

const selectedDate = ref(new Date(MOCK_DATE))

const visibleSpaces = computed(() => resources.spaces)

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
  <div class="space-view container">
    <div class="space-view__layout">
      <div class="space-view__list">
        <ResourceCard
          v-for="resource in visibleSpaces"
          :key="resource.id"
          :resource="resource"
          :date="selectedDate"
        />
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
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.space-view {
  padding: 32px 24px 80px;
}
.space-view__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
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
  .space-view__layout {
    grid-template-columns: 1fr;
  }
}
</style>
