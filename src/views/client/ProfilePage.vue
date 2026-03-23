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
            <label class="form-label">Статус</label>
            <span class="badge badge-success">{{ user?.role === 'client' ? 'Клиент' : user?.role }}</span>
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
            <span class="text-gray-600">Автомобилей в гараже</span>
            <span class="text-2xl font-bold text-blue-600">{{ clientCars.length }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-green-50 rounded">
            <span class="text-gray-600">Всего заявок</span>
            <span class="text-2xl font-bold text-green-600">{{ allRequests.length }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-purple-50 rounded">
            <span class="text-gray-600">Завершённых работ</span>
            <span class="text-2xl font-bold text-purple-600">{{ completedOrders.length }}</span>
          </div>
          <div class="flex items-center justify-between p-4 bg-orange-50 rounded">
            <span class="text-gray-600">Текущих работ</span>
            <span class="text-2xl font-bold text-orange-600">{{ inProgressOrders.length }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- История активности -->
    <div class="card mt-8">
      <h3 class="text-xl font-semibold mb-6">Недавняя активность</h3>
      <div class="space-y-3">
        <div v-for="(activity, idx) in recentActivity" :key="idx" class="flex items-center justify-between pb-3 border-b last:border-b-0">
          <div>
            <p class="font-medium">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ formatDate(activity.date) }}</p>
          </div>
          <span class="badge" :class="`badge-${activity.type}`">{{ activity.type === 'info' ? 'Уведомление' : activity.type }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGarageStore } from '@/stores/garageStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const garageStore = useGarageStore()
const requestsStore = useRequestsStore()
const workOrdersStore = useWorkOrdersStore()

const user = computed(() => authStore.user)

const clientCars = computed(() => {
  if (!user.value) return []
  return garageStore.getClientCars(user.value.id)
})

const allRequests = computed(() => {
  if (!user.value) return []
  return requestsStore.getRequestsByClient(user.value.id)
})

const inProgressOrders = computed(() => {
  if (!user.value) return []
  return workOrdersStore.getOrdersByClient(user.value.id)
    .filter(o => o.status === 'in_progress')
})

const completedOrders = computed(() => {
  if (!user.value) return []
  return workOrdersStore.getOrdersByClient(user.value.id)
    .filter(o => o.status === 'completed')
})

const recentActivity = computed(() => {
  const activities = [
    { title: 'Добавлено авто в гараж', date: new Date(), type: 'info' },
    { title: 'Новая заявка на сервис', date: new Date(Date.now() - 86400000), type: 'info' },
    { title: 'Заказ-наряд завершён', date: new Date(Date.now() - 172800000), type: 'success' },
    { title: 'Приняло участие в тест-драйве', date: new Date(Date.now() - 259200000), type: 'info' }
  ]
  return activities
})

const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const days = Math.floor(diff / 86400000)
  
  if (days === 0) return 'Сегодня'
  if (days === 1) return 'Вчера'
  if (days < 7) return `${days} дней назад`
  
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mt-8 { margin-top: 32px; }
.mt-4 { margin-top: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.space-y-4 > * + * { margin-top: 16px; }
.space-y-3 > * + * { margin-top: 12px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-lg { font-size: 18px; }
.text-2xl { font-size: 24px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.text-orange-600 { color: #ea580c; }
.bg-blue-50 { background-color: #eff6ff; }
.bg-green-50 { background-color: #f0fdf4; }
.bg-purple-50 { background-color: #faf5ff; }
.bg-orange-50 { background-color: #fff7ed; }
.rounded { border-radius: var(--radius); }
.p-4 { padding: 16px; }
.pb-3 { padding-bottom: 12px; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.border-b { border-bottom: 1px solid var(--border); }

.last\:border-b-0:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; gap: 24px; }
  .p-8 { padding: 16px; }
}
</style>
