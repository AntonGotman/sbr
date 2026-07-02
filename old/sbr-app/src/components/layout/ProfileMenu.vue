<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

const props = defineProps({
  open: { type: Boolean, default: undefined }
})
const emit = defineEmits(['update:open'])

const auth = useAuthStore()
const router = useRouter()
const internalOpen = ref(false)
const rootEl = ref(null)

const isOpen = ref(false)

watch(
  () => props.open,
  (v) => {
    if (v !== undefined) isOpen.value = v
  },
  { immediate: true }
)

watch(isOpen, (v) => {
  if (props.open !== undefined) emit('update:open', v)
})

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function onClickOutside(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) close()
}

function logout() {
  auth.logout()
  close()
  router.push('/space')
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

defineExpose({ open: () => { isOpen.value = true }, close })
</script>

<template>
  <div class="profile" ref="rootEl">
    <button class="profile__avatar" type="button" @click="toggle" :aria-expanded="isOpen" aria-label="Профиль">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <div v-if="isOpen" class="profile__menu">
      <div class="profile__row">
        <span class="profile__name">{{ auth.user?.name || 'Иван Иванов' }}</span>
        <button type="button" class="profile__gear" aria-label="Настройки">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
      <p class="profile__email">{{ auth.user?.email || 'example@yandex.ru' }}</p>
      <button class="btn btn-primary profile__logout" type="button" @click="logout">Выход</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  position: relative;
}
.profile__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #686868;
  color: var(--c-white);
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  width: 220px;
  background: var(--c-white);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-card);
  padding: 20px;
  color: var(--c-text);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 300;
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
.profile__gear {
  color: var(--c-text-muted);
  padding: 4px;
}
.profile__email {
  font-size: 13px;
  color: var(--c-text-muted);
  word-break: break-all;
}
.profile__logout {
  width: 100%;
  border-radius: var(--radius-s);
}
</style>
