<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

function submit() {
  const ok = auth.login(email.value, password.value)
  if (ok) {
    router.push(route.query.redirect || '/space')
  }
}
</script>

<template>
  <div class="auth-screen">
    <div class="auth-card">
      <router-link to="/space" class="auth-logo">СБР</router-link>
      <h1 class="auth-title">Вход</h1>
      <p class="auth-subtitle">Войдите, чтобы бронировать ресурсы и видеть приглашения</p>

      <form class="auth-form" @submit.prevent="submit">
        <label class="field">
          <span class="field-label">Email</span>
          <input v-model="email" type="email" class="field-input" placeholder="example@yandex.ru" required />
        </label>
        <label class="field">
          <span class="field-label">Пароль</span>
          <input v-model="password" type="password" class="field-input" placeholder="••••••••" required />
        </label>
        <p v-if="auth.error" class="auth-error">{{ auth.error }}</p>
        <button type="submit" class="btn btn-primary auth-submit">Войти</button>
      </form>

      <p class="auth-switch">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0e1f1c 0%, #1d3934 45%, #2f5650 100%);
  padding: 24px;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--c-white);
  border-radius: var(--radius-m);
  padding: 40px;
}
.auth-logo {
  display: inline-block;
  font-weight: 700;
  font-size: 20px;
  color: var(--c-primary);
  margin-bottom: 24px;
}
.auth-title { font-weight: 600; font-size: 28px; margin-bottom: 8px; }
.auth-subtitle { color: var(--c-text-muted); font-size: 14px; margin-bottom: 28px; }
.auth-form { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; }
.auth-error { color: var(--c-danger); font-size: 13px; }
.auth-submit { margin-top: 4px; }
.auth-switch {
  margin-top: 24px;
  font-size: 14px;
  color: var(--c-text-muted);
  text-align: center;
}
.auth-switch a { color: var(--c-primary); font-weight: 600; }
</style>
