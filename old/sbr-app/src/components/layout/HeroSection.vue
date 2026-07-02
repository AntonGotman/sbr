<script setup>
import heroBg from '../../assets/hero-bg.jpg'

const LOREM =
  'Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле.'
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero__overlay" />

    <div class="container hero__inner">
      <div class="hero__brand hero__brand--left">
        <svg class="hero__logo" width="88" height="88" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <rect x="6" y="6" width="40" height="40" rx="6" stroke="white" stroke-width="4" />
          <path d="M16 40 L40 16" stroke="white" stroke-width="4" stroke-linecap="round" />
          <path d="M34 14 L42 22" stroke="white" stroke-width="4" stroke-linecap="round" />
        </svg>
        <div class="hero__titles">
          <h1 class="hero__name">СБР</h1>
          <p class="hero__tagline">Сервис бронирования<br />ресурсов</p>
        </div>
      </div>

      <div class="hero__actions">
        <router-link to="/login" class="hero__btn">Вход</router-link>
        <router-link to="/register" class="hero__btn">Регистрация</router-link>
      </div>

      <p class="hero__lorem">{{ LOREM }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 380px;
  background-size: cover;
  background-position: center 30%;
  color: var(--c-white);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.55) 100%);
}
.hero__inner {
  position: relative;
  z-index: 1;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  padding: 48px 24px 40px;
}
.hero__brand {
  display: flex;
  align-items: center;
  gap: 28px;
  width: 100%;
}
.hero__brand--left {
  justify-content: flex-start;
  max-width: 720px;
  align-self: flex-start;
}
.hero__titles {
  text-align: left;
}
.hero__name {
  font-weight: 600;
  font-size: clamp(48px, 7vw, 72px);
  line-height: 1;
  margin-bottom: 6px;
}
.hero__tagline {
  font-weight: 400;
  font-size: clamp(18px, 2.5vw, 28px);
  line-height: 1.25;
}
.hero__actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  padding: 12px 36px;
  border-radius: var(--radius-l);
  background: var(--c-white);
  color: var(--c-text);
  font-size: 16px;
  font-weight: 400;
  box-shadow: var(--shadow-hero);
  transition: opacity 0.12s ease;
}
.hero__btn:hover {
  opacity: 0.92;
}
.hero__lorem {
  max-width: 820px;
  font-size: 14px;
  line-height: 1.45;
  opacity: 0.95;
  text-align: center;
  margin-top: auto;
}

@media (max-width: 640px) {
  .hero__brand {
    flex-direction: column;
    gap: 16px;
  }
  .hero__titles {
    text-align: center;
  }
}
</style>
