<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import ProfileMenu from './ProfileMenu.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { to: '/equipment', label: 'Аппаратура' },
  { to: '/people', label: 'Люди' },
  { to: '/space', label: 'Пространство' }
]

function goHome() {
  router.push(auth.isAuthenticated ? '/space' : '/')
  mobileOpen.value = false
}
</script>

<template>
  <header class="header" :class="{ 'header--light': !auth.isAuthenticated }">
    <div class="header__inner container">
      <button class="header__logo" type="button" @click="goHome" aria-label="На главную">
        <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
          <rect x="6" y="6" width="40" height="40" rx="6" stroke="currentColor" stroke-width="4" />
          <path d="M16 40 L40 16" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
        <span>СБР</span>
      </button>

      <template v-if="auth.isAuthenticated">
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
        </nav>
        <div class="header__actions">
          <ProfileMenu />
          <button class="header__burger" type="button" @click="mobileOpen = !mobileOpen" aria-label="Меню">
            <span /><span /><span />
          </button>
        </div>
      </template>

      <div v-else class="header__guest-actions">
        <router-link to="/login" class="btn btn-secondary">Вход</router-link>
        <router-link to="/register" class="btn btn-primary">Регистрация</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(21, 21, 20, 0.88);
  backdrop-filter: blur(6px);
  color: var(--c-white);
}
.header--light {
  background: var(--c-white);
  color: var(--c-text);
  box-shadow: 0 1px 0 rgba(0,0,0,.06);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 24px;
}
.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 22px;
  color: inherit;
  flex-shrink: 0;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
  justify-content: center;
}
.header__link {
  font-weight: 600;
  font-size: 18px;
  color: inherit;
  opacity: .82;
  padding: 6px 0;
  border-bottom: 1px solid transparent;
}
.header__link:hover { opacity: 1; }
.header__link--active {
  opacity: 1;
  border-bottom-color: currentColor;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header__guest-actions {
  display: flex;
  gap: 12px;
}
.header__guest-actions .btn-secondary { box-shadow: none; border: 1px solid #e3e3e3; }
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
    top: 76px;
    left: 0;
    right: 0;
    background: rgba(21, 21, 20, 0.96);
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px 24px;
    gap: 16px;
    display: none;
  }
  .header__nav--open { display: flex; }
  .header__burger { display: flex; }
}
</style>
