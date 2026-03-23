<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Управление новостями</h1>
      <button @click="showAddModal = true" class="btn btn-primary">+ Создать новость</button>
    </div>

    <div class="space-y-4">
      <div v-for="news in newsList" :key="news.id" class="card">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">{{ news.title }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(news.publishedAt) }} • {{ news.author }}</p>
          </div>
          <button class="btn btn-sm btn-danger">Удалить</button>
        </div>
        <p class="text-gray-700 mb-4">{{ news.content }}</p>
        <button @click="editNews(news)" class="btn btn-sm btn-secondary">Редактировать</button>
      </div>
    </div>

    <!-- Модал добавления -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Создать новость</h3>
          <button @click="showAddModal = false" class="text-gray-500">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Заголовок</label>
            <input v-model="newNews.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Содержание</label>
            <textarea v-model="newNews.content" class="form-textarea" rows="6"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Автор</label>
            <input v-model="newNews.author" type="text" class="form-input" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">Отмена</button>
          <button @click="addNews" class="btn btn-primary">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockNews } from '@/mocks'

const showAddModal = ref(false)
const newsList = computed(() => mockNews)

const newNews = ref({
  title: '',
  content: '',
  author: ''
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const editNews = (news: any) => {
  newNews.value = { title: news.title, content: news.content, author: news.author }
  showAddModal.value = true
}

const addNews = () => {
  alert('Новость создана!')
  showAddModal.value = false
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-4 { margin-bottom: 16px; }
.mb-2 { margin-bottom: 8px; }
.space-y-4 > * + * { margin-top: 16px; }
.text-3xl { font-size: 30px; }
.text-gray-900 { color: #111827; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.flex { display: flex; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.font-semibold { font-weight: 600; }
.text-gray-500 { color: #6b7280; }
.text-xl { font-size: 20px; }
</style>
