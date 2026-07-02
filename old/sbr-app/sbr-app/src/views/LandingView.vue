<script setup>
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()

const features = [
  {
    title: 'Календарь бронирования',
    text: 'Видите занятость ресурса по дням и часам и выбираете время в пару кликов.'
  },
  {
    title: 'Уведомления участников',
    text: 'Все ответственные лица узнают о новом мероприятии сразу после бронирования.'
  },
  {
    title: 'Защита от пересечений',
    text: 'Система не даст забронировать уже занятый слот и подскажет, когда ресурс свободен.'
  },
  {
    title: 'Управление ресурсами',
    text: 'Добавляйте и удаляйте переговорные, оборудование и назначайте ответственных.'
  }
]
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="hero__bg" />
      <div class="hero__overlay" />
      <div class="container hero__content">
        <div class="hero__heading">
          <svg class="hero__icon" width="72" height="72" viewBox="0 0 56 56" fill="none">
            <rect x="6" y="6" width="40" height="40" rx="6" stroke="white" stroke-width="4" />
            <path d="M16 40 L40 16" stroke="white" stroke-width="4" stroke-linecap="round" />
            <path d="M34 14 L42 22" stroke="white" stroke-width="4" stroke-linecap="round" />
          </svg>
          <h1 class="hero__title">СБР</h1>
          <p class="hero__subtitle">Сервис бронирования<br />ресурсов</p>
        </div>

        <div class="hero__actions">
          <router-link v-if="!auth.isAuthenticated" to="/login" class="btn btn-secondary hero__btn">Вход</router-link>
          <router-link v-if="!auth.isAuthenticated" to="/register" class="btn btn-primary hero__btn">Регистрация</router-link>
          <router-link v-else to="/space" class="btn btn-primary hero__btn">Перейти в пространство</router-link>
        </div>

        <p class="hero__text">
          Бронируйте переговорные, коворкинги и оборудование, приглашайте коллег
          и фотографов на мероприятия — без звонков, таблиц и пересечений по времени.
        </p>
      </div>
    </section>

    <section class="features container">
      <h2 class="features__title">Что умеет сервис</h2>
      <div class="features__grid">
        <article v-for="f in features" :key="f.title" class="feature">
          <h3 class="feature__title">{{ f.title }}</h3>
          <p class="feature__text">{{ f.text }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 640px;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--c-white);
}
.hero__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(134,174,170,.55), transparent 55%),
    linear-gradient(120deg, #0e1f1c 0%, #1d3934 45%, #2f5650 75%, #6f9d97 100%);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45));
}
.hero__content {
  position: relative;
  z-index: 1;
  padding-top: 90px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;
}
.hero__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.hero__icon { margin-bottom: 8px; opacity: .9; }
.hero__title {
  font-weight: 600;
  font-size: clamp(56px, 9vw, 104px);
  line-height: 1;
}
.hero__subtitle {
  font-weight: 400;
  font-size: clamp(22px, 3.4vw, 38px);
  line-height: 1.3;
}
.hero__actions { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.hero__btn {
  border-radius: var(--radius-l);
  padding: 14px 40px;
  font-size: 18px;
}
.hero__actions .btn-secondary { box-shadow: var(--shadow-hero); }
.hero__text {
  max-width: 720px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  opacity: .92;
}

.features {
  padding: 72px 24px 96px;
}
.features__title {
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 32px;
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.feature {
  background: var(--c-surface);
  border-radius: var(--radius-m);
  padding: 24px;
}
.feature__title { font-weight: 600; font-size: 18px; margin-bottom: 10px; color: var(--c-primary); }
.feature__text { font-size: 14px; line-height: 1.5; color: var(--c-text); }
</style>
