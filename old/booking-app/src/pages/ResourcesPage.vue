<template>
  <div class="resources-page">
    <!-- Хедер -->
    <header class="header">
      <div class="container flex-between">
        <div class="header-left flex-center gap-2">
          <div class="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#2D5BFF"/>
              <path d="M12 28V12H18V20H22V12H28V28H22V20H18V28H12Z" fill="white"/>
            </svg>
            <span>Бронирование</span>
          </div>
          <nav class="nav">
            <a href="#" @click.prevent="$router.push('/')">Календарь</a>
            <a href="#" class="active">Ресурсы</a>
          </nav>
        </div>
        <div class="header-right flex-center gap-2">
          <div class="search-box">
            <input type="text" placeholder="Поиск..." v-model="searchQuery" />
          </div>
          <div class="user-avatar">
            <span>ИИ</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="main">
      <div class="container">
        <div class="top-bar flex-between">
          <div>
            <h1 class="page-title">Ресурсы</h1>
          </div>
          <div class="controls flex-center gap-2">
            <button class="btn btn-secondary">По алфавиту</button>
            <button class="btn btn-primary" @click="showResourceModal = true">
              + Добавить
            </button>
          </div>
        </div>

        <!-- Сетка ресурсов -->
        <div class="resources-grid">
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="resource-card card"
          >
            <div class="resource-image">
              <img :src="resource.image" :alt="resource.name" />
              <div class="resource-type">{{ resource.type }}</div>
            </div>
            <div class="resource-info">
              <h3 class="resource-name">{{ resource.name }}</h3>
              <p class="resource-description">{{ resource.description }}</p>
              <div class="resource-footer flex-between">
                <span class="resource-email">{{ resource.email }}</span>
                <div class="resource-actions flex gap-1">
                  <button class="btn btn-secondary btn-sm">Пригласить</button>
                  <button class="btn btn-primary btn-sm">Подробнее</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Модалка добавления -->
        <div v-if="showResourceModal" class="modal-overlay" @click.self="showResourceModal = false">
          <div class="modal-content">
            <button class="modal-close" @click="showResourceModal = false">✕</button>
            <h2 class="modal-title">Добавить ресурс</h2>

            <form @submit.prevent="addResource">
              <div class="form-group">
                <label>Имя</label>
                <input
                  v-model="resourceForm.name"
                  type="text"
                  placeholder="Введите имя"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label>Тип</label>
                <select v-model="resourceForm.type" class="form-input">
                  <option value="Фотограф">Фотограф</option>
                  <option value="Конференц-зал">Конференц-зал</option>
                  <option value="Оборудование">Оборудование</option>
                </select>
              </div>

              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="resourceForm.email"
                  type="email"
                  placeholder="example@yandex.ru"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label>Описание</label>
                <textarea
                  v-model="resourceForm.description"
                  placeholder="Описание ресурса..."
                  class="form-textarea"
                  rows="3"
                ></textarea>
              </div>

              <div class="form-actions flex gap-2">
                <button type="submit" class="btn btn-primary">Добавить</button>
                <button type="button" class="btn btn-secondary" @click="showResourceModal = false">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showResourceModal = ref(false)

const resourceForm = ref({
  name: '',
  type: 'Фотограф