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
            <span class="badge badge-success">Мастер-приёмник</span>
          </div>
          <button class="btn btn-primary mt-4">
            Редактировать профиль
          </button>
        </div>
      </div>

      <!-- Статистика -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-6">Статистика</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-blue-50 rounded">
            <span class="text-gray-600">Всего нарядов</span>
            <span class="text-2xl font-bold text-blue-600">{{ totalOrders }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-orange-50 rounded">
            <span class="text-gray-600">В работе</span>
            <span class="text-2xl font-bold text-orange-600">{{ inProgressOrders.length }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-green-50 rounded">
            <span class="text-gray-600">Завершено</span>
            <span class="text-2xl font-bold text-green-600">{{ completedOrders.length }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-purple-50 rounded">
            <span class="text-gray-600">Заявок принято</span>
            <span class="text-2xl font-bold text-purple-600">{{ totalRequests }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const workOrdersStore = useWorkOrdersStore()
const requestsStore = useRequestsStore()

const user = computed(() => authStore.user)
const inProgressOrders = computed(() => workOrdersStore.inProgressOrders)
const completedOrders = computed(() => workOrdersStore.completedOrders)
const totalOrders = computed(() => workOrdersStore.workOrders.length)
const totalRequests = computed(() => requestsStore.requests.length)
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mt-4 { margin-top: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.space-y-4 > * + * { margin-top: 16px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-lg { font-size: 18px; }
.text-2xl { font-size: 24px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.text-orange-600 { color: #ea580c; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.bg-blue-50 { background-color: #eff6ff; }
.bg-orange-50 { background-color: #fff7ed; }
.bg-green-50 { background-color: #f0fdf4; }
.bg-purple-50 { background-color: #faf5ff; }
.p-4 { padding: 16px; }
.rounded { border-radius: var(--radius); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }

@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; gap: 24px; }
  .p-8 { padding: 16px; }
}
</style>
