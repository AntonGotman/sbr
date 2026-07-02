<script setup>
import heroBg from '../../assets/hero-bg.jpg'

const LOREM =
  'Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле.'
</script>

<template>
  <section class="hero">
    <!-- Полное фото без обрезки — растягиваем на 100% ширины, высота авто -->
    <img class="hero__photo" :src="heroBg" alt="" aria-hidden="true" />
    <div class="hero__overlay" />

    <div class="container hero__inner">
      <!-- Логотип + СБР + расшифровка — центрированы как на макете -->
      <div class="hero__brand">
        <svg class="hero__logo" width="80" height="77" viewBox="0 0 219 211" fill="none" aria-hidden="true">
          <path d="M215.932 22.6109L196.343 3.03782C194.321 1.0141 191.661 0 189.006 0C186.351 0 183.697 1.00961 181.674 3.03333L166.005 18.6667L200.263 52.8859L215.932 37.257C219.981 33.2096 219.981 26.6448 215.932 22.6109Z" fill="white"/>
          <path d="M64.2906 120.252L98.5527 154.475L192.93 60.2177L158.668 25.994L64.2906 120.252Z" fill="white"/>
          <path d="M56.8956 127.575L49.5813 169.09L91.1577 161.794L56.8956 127.575Z" fill="white"/>
          <path d="M151.61 187.591H22.4273V58.3333H113.594L136.062 35.8975H14.5031C6.52503 35.8975 0 42.4263 0 50.409V195.52C0 203.502 6.52503 210.031 14.5031 210.031H159.529C167.507 210.031 174.032 203.502 174.032 195.52V91.7718L151.61 114.167V187.591Z" fill="white"/>
        </svg>
        <h1 class="hero__name">СБР</h1>
        <p class="hero__tagline">Сервис бронирования<br />ресурсов</p>
      </div>

      <div class="hero__actions">
        <router-link to="/login"    class="hero__btn">Вход</router-link>
        <router-link to="/register" class="hero__btn">Регистрация</router-link>
      </div>

      <p class="hero__lorem">{{ LOREM }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  color: var(--c-white);
  overflow: hidden;
}

/* Фото занимает полную ширину, высота пропорциональна — без обрезки */
.hero__photo {
  display: block;
  width: 100%;
  height: auto;
  min-height: 380px;
  object-fit: cover;
  object-position: center top;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.55) 100%);
}

/* Контент абсолютно поверх фото, по центру */
.hero__inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 48px 24px 40px;
}

/* Блок логотипа — горизонтальный ряд, центрирован */
.hero__brand {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 18px;
}
.hero__logo {
  flex-shrink: 0;
  margin-bottom: 2px;
}
.hero__name {
  font-weight: 600;
  font-size: clamp(52px, 7.5vw, 96px);
  line-height: 1;
  white-space: nowrap;
}
.hero__tagline {
  font-weight: 400;
  font-size: clamp(16px, 2.2vw, 32px);
  line-height: 1.3;
  padding-bottom: 4px;
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
  min-width: 150px;
  padding: 12px 40px;
  border-radius: var(--radius-l);
  background: var(--c-white);
  color: var(--c-text);
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0px 0px 20px rgba(255,255,255,0.5);
  transition: opacity 0.12s ease;
}
.hero__btn:hover { opacity: 0.92; }

.hero__lorem {
  max-width: 820px;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.95;
  text-align: center;
}

@media (max-width: 640px) {
  .hero__brand { flex-wrap: wrap; justify-content: center; gap: 10px; }
  .hero__tagline { text-align: center; }
}
</style>
