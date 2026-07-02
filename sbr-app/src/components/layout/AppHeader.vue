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
  { to: '/people',    label: 'Люди' },
  { to: '/space',     label: 'Пространство' }
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
        <svg width="32" height="31" viewBox="0 0 219 211" fill="none" aria-hidden="true">
          <path d="M215.932 22.6109L196.343 3.03782C194.321 1.0141 191.661 0 189.006 0C186.351 0 183.697 1.00961 181.674 3.03333L166.005 18.6667L200.263 52.8859L215.932 37.257C219.981 33.2096 219.981 26.6448 215.932 22.6109Z" fill="white"/>
          <path d="M64.2906 120.252L98.5527 154.475L192.93 60.2177L158.668 25.994L64.2906 120.252Z" fill="white"/>
          <path d="M56.8956 127.575L49.5813 169.09L91.1577 161.794L56.8956 127.575Z" fill="white"/>
          <path d="M151.61 187.591H22.4273V58.3333H113.594L136.062 35.8975H14.5031C6.52503 35.8975 0 42.4263 0 50.409V195.52C0 203.502 6.52503 210.031 14.5031 210.031H159.529C167.507 210.031 174.032 203.502 174.032 195.52V91.7718L151.61 114.167V187.591Z" fill="white"/>
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
        <button type="button" class="header__link header__link--profile" @click="openProfile">
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
  /* Полупрозрачная лента ~70% как на макете */
  background: rgba(21, 21, 20, 0.70);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
.header__link:hover { opacity: 1; }
.header__link--active { opacity: 1; border-bottom-color: currentColor; }
.header__link--profile { cursor: pointer; }
.header__actions { display: flex; align-items: center; gap: 12px; }
.header__burger { display: none; flex-direction: column; gap: 4px; width: 24px; }
.header__burger span { height: 2px; background: currentColor; border-radius: 2px; }

@media (max-width: 860px) {
  .header__nav {
    position: absolute;
    top: 64px; left: 0; right: 0;
    background: rgba(21, 21, 20, 0.92);
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px 24px;
    gap: 16px;
    display: none;
    margin-right: 0;
    z-index: 200;
  }
  .header__nav--open { display: flex; }
  .header__burger { display: flex; }
}
</style>
