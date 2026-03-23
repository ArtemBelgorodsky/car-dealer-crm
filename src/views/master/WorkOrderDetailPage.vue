<template>
  <div class="p-8">
    <RouterLink to="/master/work-orders" class="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center">
      ← Вернуться к нарядам
    </RouterLink>

    <div v-if="order" class="card">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">{{ order.description }}</h1>
        <span :class="['badge', `badge-${getStatusColor(order.status)}`]">
          {{ getWorkOrderStatus(order.status) }}
        </span>
      </div>

      <div class="grid grid-2 gap-8 mb-8">
        <!-- Информация о заказе -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Информация о заказе</h3>
          <div class="space-y-3 text-sm">
            <div><span class="text-gray-500">Клиент:</span> <span class="font-medium">{{ getClientName(order.clientId) }}</span></div>
            <div><span class="text-gray-500">Автомобиль:</span> <span class="font-medium">{{ getCarName(order.clientCarId) }}</span></div>
            <div><span class="text-gray-500">Мастер:</span> <span class="font-medium">{{ getMasterName(order.masterId) }}</span></div>
            <div><span class="text-gray-500">Дата создания:</span> <span class="font-medium">{{ formatDate(order.createdDate) }}</span></div>
            <div v-if="order.startDate"><span class="text-gray-500">Начало работ:</span> <span class="font-medium">{{ formatDate(order.startDate) }}</span></div>
          </div>
        </div>

        <!-- Сумма -->
        <div class="bg-blue-50 p-6 rounded">
          <h3 class="text-xl font-semibold mb-4">Итого</h3>
          <div class="text-3xl font-bold text-blue-600 mb-4">{{ formatPrice(order.totalCost) }}</div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Работы:</span>
              <span>{{ formatPrice(order.works.reduce((sum, w) => sum + w.cost, 0)) }}</span>
            </div>
            <div class="flex justify-between border-t pt-2">
              <span>Запчасти:</span>
              <span>{{ formatPrice(order.parts.reduce((sum, p) => sum + p.totalPrice, 0)) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Работы -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Выполняемые работы</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Работа</th>
                <th>Часы</th>
                <th>Ставка</th>
                <th>Сумма</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="work in order.works" :key="work.id">
                <td>{{ work.name }}</td>
                <td>{{ work.hours }}ч.</td>
                <td>{{ work.hourlyRate }} ₽</td>
                <td>{{ work.cost }} ₽</td>
                <td>
                  <span :class="['badge', `badge-${work.status === 'completed' ? 'success' : 'warning'}`]">
                    {{ work.status === 'completed' ? 'Завершено' : 'В процессе' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Запчасти -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Использованные запчасти</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Запчасть</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Сумма</th>
                <th>Наличие</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in order.parts" :key="part.id">
                <td>{{ part.name }}</td>
                <td>{{ part.quantity }}</td>
                <td>{{ part.unitPrice }} ₽</td>
                <td>{{ part.totalPrice }} ₽</td>
                <td>
                  <span :class="['badge', `badge-${part.stock > 0 ? 'success' : 'danger'}`]">
                    {{ part.stock }} шт.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Примечания -->
      <div class="card bg-gray-50">
        <h3 class="text-lg font-semibold mb-2">Примечания</h3>
        <p class="text-gray-700">{{ order.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useGarageStore } from '@/stores/garageStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const route = useRoute()
const workOrdersStore = useWorkOrdersStore()
const garageStore = useGarageStore()

const orderId = route.params.id as string
const order = computed(() => workOrdersStore.getOrder(orderId))

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
    created: 'info',
    approved: 'info',
    in_progress: 'warning',
    ready: 'success',
    completed: 'success',
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

const getClientName = (clientId: string) => {
  const client = mockUsers.find(u => u.id === clientId)
  return client?.name || 'Неизвестный клиент'
}

const getCarName = (carId: string) => {
  const car = garageStore.getCar(carId)
  return car ? `${car.brand} ${car.model}` : 'Неизвестное авто'
}

const getMasterName = (masterId: string | undefined) => {
  if (!masterId) return '-'
  const master = mockUsers.find(u => u.id === masterId)
  return master?.name || 'Неизвестный мастер'
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 16px; }
.mb-2 { margin-bottom: 8px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.gap-8 { gap: 32px; }
.space-y-3 > * + * { margin-top: 12px; }
.space-y-2 > * + * { margin-top: 8px; }
.p-6 { padding: 24px; }
.p-4 { padding: 16px; }
.pt-2 { padding-top: 8px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-500 { color: #6b7280; }
.text-blue-600 { color: #2563eb; }
.hover\:text-blue-700:hover { color: #1d4ed8; }
.bg-blue-50 { background-color: #eff6ff; }
.bg-gray-50 { background-color: #f9fafb; }
.rounded { border-radius: var(--radius); }
.border-t { border-top: 1px solid var(--border); }
.overflow-x-auto { overflow-x: auto; }
.inline-flex { display: inline-flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.flex { display: flex; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
</style>
