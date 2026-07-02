<script setup>
import { useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import HeroSection from './components/layout/HeroSection.vue'
import ToastStack from './components/ui/ToastStack.vue'

const route = useRoute()
</script>

<template>
  <div class="app-shell">
    <template v-if="!route.meta.bareLayout">
      <HeroSection />
      <AppHeader />
    </template>
    <main class="app-main" :class="{ 'app-main--content': !route.meta.bareLayout }">
      <router-view />
    </main>
    <ToastStack />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex: 1;
}
.app-main--content {
  background: var(--c-page-bg);
}
</style>
