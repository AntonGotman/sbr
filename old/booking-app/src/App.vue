<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">📅 Бронирование</div>
        <div class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/calendar">Календарь</router-link>
          <router-link to="/booking">Бронирование</router-link>
          <router-link to="/employees">Сотрудники</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  background: #f5f7fa;
}

.navbar {
  background: white;
  padding: 16px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 30px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-links a:hover {
  background: #f7fafc;
}

.nav-links a.router-link-active {
  color: #2196f3;
  background: #e3f2fd;
}
</style>