<template>
  <div class="error-page">
    <div class="error-card">
      <div class="error-icon">⚠️</div>
      <h1 class="error-title">Ошибка</h1>
      <p class="error-message">Неверный запрос. Обратитесь в техподдержку</p>
      <button class="btn btn-primary" @click="$router.push('/')">Принять</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 20px;
}

.error-card {
  background: white;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.error-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.error-message {
  color: #718096;
  font-size: 16px;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #2196f3;
  color: white;
}

.btn-primary:hover {
  background: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}
</style>