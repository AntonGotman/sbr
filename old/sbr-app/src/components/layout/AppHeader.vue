<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import ProfileMenu from './ProfileMenu.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)
const profileOpen = ref(false)

const navItems = [
  { to: '/equipment', label: 'Аппаратура' },
  { to: '/people', label: 'Люди' },
  { to: '/space', label: 'Пространство' }
]

function goHome() {
  router.push('/space')
  mobileOpen.value = false
}

function openProfile() {
  profileOpen.value = true
}
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <button class="header__logo" type="button" @click="goHome" aria-label="На главную">
        <svg width="24" height="24" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <rect x="6" y="6" width="40" height="40" rx="6" stroke="currentColor" stroke-width="4" />
          <path d="M16 40 L40 16" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
      </button>

      <nav class="header__nav" :class="{ 'header__nav--open': mobileOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="header__link"
          :class="{ 'header__link--active': route.path === item.to }"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </router-link>
        <button
          type="button"
          class="header__link header__link--profile"
          @click="openProfile"
        >
          Профиль
        </button>
      </nav>

      <div class="header__actions">
        <ProfileMenu v-model:open="profileOpen" />
        <button class="header__burger" type="button" @click="mobileOpen = !mobileOpen" aria-label="Меню">
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--c-surface-strong);
  color: var(--c-white);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 24px;
}
.header__logo {
  display: flex;
  align-items: center;
  color: inherit;
  flex-shrink: 0;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 36px;
  flex: 1;
  justify-content: flex-end;
  margin-right: 12px;
}
.header__link {
  font-weight: 600;
  font-size: 16px;
  color: inherit;
  opacity: 0.85;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  background: none;
}
.header__link:hover {
  opacity: 1;
}
.header__link--active {
  opacity: 1;
  border-bottom-color: currentColor;
}
.header__link--profile {
  cursor: pointer;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header__burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  width: 24px;
}
.header__burger span {
  height: 2px;
  background: currentColor;
  border-radius: 2px;
}

@media (max-width: 860px) {
  .header__nav {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--c-surface-strong);
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px 24px;
    gap: 16px;
    display: none;
    margin-right: 0;
    z-index: 200;
  }
  .header__nav--open {
    display: flex;
  }
  .header__burger {
    display: flex;
  }
}
</style>
