<script setup>
import { useRoute } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import ToastStack from './components/ui/ToastStack.vue'

const route = useRoute()
</script>

<template>
  <div class="app-shell">
    <AppHeader v-if="!route.meta.bareLayout" />
    <main class="app-main">
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
</style>
