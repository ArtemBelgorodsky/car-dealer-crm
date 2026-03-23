<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Мой профиль</h1>

    <div class="grid grid-2 gap-8">
      <!-- Информация профиля -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-6">Личная информация</h3>
        <div class="space-y-4">
          <div>
            <label class="form-label">ФИО</label>
            <p class="text-lg font-medium">{{ user?.name }}</p>
          </div>
          <div>
            <label class="form-label">Email</label>
            <p class="text-lg font-medium">{{ user?.email }}</p>
          </div>
          <div>
            <label class="form-label">Телефон</label>
            <p class="text-lg font-medium">{{ user?.phone }}</p>
          </div>
          <div>
            <label class="form-label">Должность</label>
            <span class="badge badge-primary">Администратор системы</span>
          </div>
          <button class="btn btn-primary mt-4">
            Редактировать профиль
          </button>
        </div>
      </div>

      <!-- Права доступа -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-6">Права доступа</h3>
        <div class="space-y-3">
          <div class="flex items-center p-3 bg-green-50 rounded">
            <span class="text-lg mr-3">✓</span>
            <span>Управление автомобилями</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded">
            <span class="text-lg mr-3">✓</span>
            <span>Управление пользователями</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded">
            <span class="text-lg mr-3">✓</span>
            <span>Управление заявками</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded">
            <span class="text-lg mr-3">✓</span>
            <span>Управление акциями и новостями</span>
          </div>
          <div class="flex items-center p-3 bg-green-50 rounded">
            <span class="text-lg mr-3">✓</span>
            <span>Просмотр статистики</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительная информация -->
    <div class="card mt-8">
      <h3 class="text-xl font-semibold mb-4">Информация системы</h3>
      <div class="grid grid-2 gap-6">
        <div>
          <p class="text-gray-600 text-sm mb-1">Версия системы</p>
          <p class="text-lg font-medium">1.0.0</p>
        </div>
        <div>
          <p class="text-gray-600 text-sm mb-1">Последний вход</p>
          <p class="text-lg font-medium">Сегодня в 10:30</p>
        </div>
        <div>
          <p class="text-gray-600 text-sm mb-1">Количество пользователей</p>
          <p class="text-lg font-medium">4</p>
        </div>
        <div>
          <p class="text-gray-600 text-sm mb-1">Дата создания учётной записи</p>
          <p class="text-lg font-medium">15 января 2023</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 16px; }
.mb-1 { margin-bottom: 4px; }
.mt-8 { margin-top: 32px; }
.mt-4 { margin-top: 16px; }
.mr-3 { margin-right: 12px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.gap-6 { gap: 24px; }
.space-y-4 > * + * { margin-top: 16px; }
.space-y-3 > * + * { margin-top: 12px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.bg-green-50 { background-color: #f0fdf4; }
.rounded { border-radius: var(--radius); }
.p-3 { padding: 12px; }
.flex { display: flex; }
.items-center { align-items: center; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; gap: 24px; }
  .p-8 { padding: 16px; }
}
</style>
