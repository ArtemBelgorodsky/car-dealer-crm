<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Панель администратора</h1>

    <!-- Основная статистика -->
    <div class="grid grid-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-4xl mb-2">🚙</div>
        <p class="text-gray-600 text-sm">Всего авто</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.totalCars }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">👥</div>
        <p class="text-gray-600 text-sm">Клиентов</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.totalClients }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">💰</div>
        <p class="text-gray-600 text-sm">Доход</p>
        <p class="text-3xl font-bold text-purple-600">{{ formatPrice(stats.totalRevenue) }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">✅</div>
        <p class="text-gray-600 text-sm">Завершено</p>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.completedOrders }}</p>
      </div>
    </div>

    <!-- Быстрые ссылки -->
    <div class="grid grid-3 gap-6 mb-8">
      <RouterLink to="/admin/cars" class="card card-hover">
        <div class="text-4xl mb-4">🔧</div>
        <h3 class="text-lg font-semibold">Управление авто</h3>
        <p class="text-sm text-gray-600">Добавить, редактировать или удалить автомобили</p>
      </RouterLink>
      <RouterLink to="/admin/users" class="card card-hover">
        <div class="text-4xl mb-4">👨‍💼</div>
        <h3 class="text-lg font-semibold">Управление пользователями</h3>
        <p class="text-sm text-gray-600">Создавать и управлять учётными записями</p>
      </RouterLink>
      <RouterLink to="/admin/promotions" class="card card-hover">
        <div class="text-4xl mb-4">🎁</div>
        <h3 class="text-lg font-semibold">Акции и предложения</h3>
        <p class="text-sm text-gray-600">Создавать и управлять акциями</p>
      </RouterLink>
    </div>

    <!-- Последние заявки -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Последние заявки</h2>
        <RouterLink to="/admin/requests" class="btn btn-sm btn-primary">
          Все заявки
        </RouterLink>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Тип</th>
              <th>Клиент</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in latestRequests" :key="req.id">
              <td>{{ getRequestType(req.type) }}</td>
              <td>{{ getClientName(req.clientId) }}</td>
              <td>{{ formatDate(req.date) }}</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(req.status)}`]">
                  {{ getRequestStatus(req.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCarsStore } from '@/stores/carsStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const carsStore = useCarsStore()
const requestsStore = useRequestsStore()
const workOrdersStore = useWorkOrdersStore()

const stats = computed(() => ({
  totalCars: carsStore.cars.length,
  totalClients: mockUsers.filter(u => u.role === 'client').length,
  totalRevenue: workOrdersStore.completedOrders.reduce((sum, o) => sum + o.totalCost, 0),
  completedOrders: workOrdersStore.completedOrders.length,
  pendingOrders: requestsStore.pendingRequests.length
}))

const latestRequests = computed(() => 
  requestsStore.requests.slice(-5)
)

const getRequestType = (type: string) => {
  const types: Record<string, string> = {
    test_drive: 'Тест-драйв',
    reserve: 'Резервирование',
    maintenance: 'Обслуживание',
    repair: 'Ремонт'
  }
  return types[type] || type
}

const getRequestStatus = (status: string) => {
  const statuses: Record<string, string> = {
    pending: 'Ожидание',
    approved: 'Одобрено',
    in_progress: 'В процессе',
    completed: 'Завершено',
    cancelled: 'Отменено'
  }
  return statuses[status] || status
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'info',
    approved: 'success',
    in_progress: 'warning',
    completed: 'success',
    cancelled: 'danger'
  }
  return colors[status] || 'secondary'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}

const getClientName = (clientId: string) => {
  const client = mockUsers.find(u => u.id === clientId)
  return client?.name || 'Неизвестный клиент'
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.text-3xl { font-size: 30px; }
.text-2xl { font-size: 24px; }
.text-4xl { font-size: 36px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.text-green-600 { color: #16a34a; }
.text-purple-600 { color: #9333ea; }
.text-yellow-600 { color: #ca8a04; }
.overflow-x-auto { overflow-x: auto; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
</style>
