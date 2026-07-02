<template>
  <div class="default-layout">
    <header class="header">
      <div class="container flex-between">
        <div class="logo">
          <h1>📅 Бронирование</h1>
        </div>
        <nav class="nav flex gap-2">
          <router-link to="/" class="nav-link">Главная</router-link>
          <router-link to="/calendar" class="nav-link">Календарь</router-link>
          <router-link to="/booking" class="nav-link">Бронирование</router-link>
          <router-link to="/employees" class="nav-link">Сотрудники</router-link>
        </nav>
        <div class="user">
          <span>👤 Иван Иванов</span>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #E2E8F0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo h1 {
  font-size: 20px;
  margin: 0;
}

.nav-link {
  color: #4A5568;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #F7FAFC;
}

.nav-link.router-link-active {
  color: #2196F3;
  background: #E3F2FD;
}

.main {
  padding: 30px 0;
  min-height: calc(100vh - 80px);
}
</style>