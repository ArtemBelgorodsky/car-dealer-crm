<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Добро пожаловать, {{ user?.name }}!</h1>
      <p class="text-gray-600 mt-2">Управляйте своими автомобилями и услугами сервиса</p>
    </div>

    <!-- Быстрые действия -->
    <div class="grid grid-3 mb-8">
      <RouterLink to="/client/catalog" class="card card-hover">
        <div class="text-4xl mb-4">🚙</div>
        <h3 class="text-xl font-semibold mb-2">Каталог авто</h3>
        <p class="text-gray-600 text-sm">Просмотрите доступные автомобили</p>
      </RouterLink>
      <RouterLink to="/client/garage" class="card card-hover">
        <div class="text-4xl mb-4">🏠</div>
        <h3 class="text-xl font-semibold mb-2">Мой гараж</h3>
        <p class="text-gray-600 text-sm">Управляйте своими авто ({{ clientCars.length }})</p>
      </RouterLink>
      <RouterLink to="/client/service" class="card card-hover">
        <div class="text-4xl mb-4">🔧</div>
        <h3 class="text-xl font-semibold mb-2">Сервис</h3>
        <p class="text-gray-600 text-sm">Запись на техническое обслуживание</p>
      </RouterLink>
    </div>

    <!-- Мои заявки -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Мои заявки</h2>
        <RouterLink to="/client/booking" class="btn btn-sm btn-primary">
          Все заявки
        </RouterLink>
      </div>

      <div v-if="myRequests.length > 0" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Тип</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Примечание</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in myRequests.slice(0, 5)" :key="req.id">
              <td>{{ getRequestType(req.type) }}</td>
              <td>{{ formatDate(req.date) }}</td>
              <td>
                <span :class="['badge', `badge-${getStatusColor(req.status)}`]">
                  {{ getRequestStatus(req.status) }}
                </span>
              </td>
              <td class="text-sm text-gray-600">{{ req.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        У вас нет заявок. <RouterLink to="/client/booking" class="text-blue-600">Создать заявку</RouterLink>
      </div>
    </div>

    <!-- Текущие заказ-наряды -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Текущие работы</h2>
        <RouterLink to="/client/history" class="btn btn-sm btn-primary">
          История
        </RouterLink>
      </div>

      <div v-if="currentWorkOrders.length > 0">
        <div v-for="order in currentWorkOrders" :key="order.id" class="mb-4 p-4 border rounded-lg bg-gray-50">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-semibold text-gray-900">{{ order.description }}</h4>
            <span :class="['badge', `badge-${getStatusColor(order.status)}`]">
              {{ getWorkOrderStatus(order.status) }}
            </span>
          </div>
          <div class="grid grid-2 gap-4 text-sm text-gray-600">
            <div>
              <span class="text-gray-500">Автомобиль:</span> {{ getCarName(order.clientCarId) }}
            </div>
            <div>
              <span class="text-gray-500">Цена:</span> {{ formatPrice(order.totalCost) }}
            </div>
            <div>
              <span class="text-gray-500">Начало:</span> {{ order.startDate ? formatDate(order.startDate) : 'Не начинается' }}
            </div>
            <div>
              <span class="text-gray-500">Завершение:</span> {{ order.completionDate ? formatDate(order.completionDate) : 'В процессе' }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        У вас нет активных работ
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useGarageStore } from '@/stores/garageStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const requestsStore = useRequestsStore()
const workOrdersStore = useWorkOrdersStore()
const garageStore = useGarageStore()

const user = computed(() => authStore.user)
const clientCars = computed(() => {
  if (!user.value) return []
  return garageStore.getClientCars(user.value.id)
})

const myRequests = computed(() => {
  if (!user.value) return []
  return requestsStore.getRequestsByClient(user.value.id)
})

const currentWorkOrders = computed(() => {
  if (!user.value) return []
  const allOrders = workOrdersStore.getOrdersByClient(user.value.id)
  return allOrders.filter(o => ['in_progress', 'approved'].includes(o.status))
})

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

const getWorkOrderStatus = (status: string) => {
  const statuses: Record<string, string> = {
    created: 'Создано',
    approved: 'Одобрено',
    in_progress: 'В процессе',
    ready: 'Готово',
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
    ready: 'success',
    created: 'info',
    cancelled: 'danger'
  }
  return colors[status] || 'secondary'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
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

const getCarName = (carId: string) => {
  const car = garageStore.getCar(carId)
  return car ? `${car.brand} ${car.model}` : 'Неизвестное авто'
}
</script>

<style scoped>
.p-8 {
  padding: 32px;
}

.mb-8 {
  margin-bottom: 32px;
}

.mb-6 {
  margin-bottom: 24px;
}

.mt-2 {
  margin-top: 8px;
}

.text-3xl {
  font-size: 30px;
}

.text-2xl {
  font-size: 24px;
}

.text-xl {
  font-size: 20px;
}

.text-4xl {
  font-size: 36px;
}

.text-sm {
  font-size: 12px;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-500 {
  color: #6b7280;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.gap-4 {
  gap: 16px;
}

.p-4 {
  padding: 16px;
}

.border {
  border: 1px solid var(--border);
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.overflow-x-auto {
  overflow-x: auto;
}

.py-8 {
  padding-top: 32px;
  padding-bottom: 32px;
}

.mb-3 {
  margin-bottom: 12px;
}

.mb-4 {
  margin-bottom: 16px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .p-8 {
    padding: 16px;
  }
}
</style>
