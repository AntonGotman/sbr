<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const router = useRouter()
const open = ref(false)
const rootEl = ref(null)

function toggle() {
  open.value = !open.value
}
function onClickOutside(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) open.value = false
}
function logout() {
  auth.logout()
  open.value = false
  router.push('/')
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
  <div class="profile" ref="rootEl">
    <button class="profile__avatar" type="button" @click="toggle" :aria-expanded="open" aria-label="Профиль">
      {{ auth.user?.name?.[0] || '?' }}
    </button>
    <div v-if="open" class="profile__menu">
      <div class="profile__row">
        <span class="profile__name">{{ auth.user?.name }}</span>
      </div>
      <p class="profile__email">{{ auth.user?.email }}</p>
      <button class="btn btn-primary profile__logout" type="button" @click="logout">Выход</button>
    </div>
  </div>
</template>

<style scoped>
.profile { position: relative; }
.profile__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--c-accent);
  color: var(--c-white);
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  width: 200px;
  background: var(--c-white);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-card);
  padding: 20px;
  color: var(--c-text);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.profile__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.profile__name {
  font-weight: 600;
  font-size: 16px;
}
.profile__email {
  font-size: 13px;
  color: var(--c-text-muted);
  word-break: break-all;
}
.profile__logout { width: 100%; }
</style>
