<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">История заказ-нарядов</h1>

    <div v-if="workOrders.length > 0" class="space-y-4">
      <div v-for="order in workOrders" :key="order.id" class="card">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">{{ order.description }}</h3>
            <p class="text-sm text-gray-600">
              Создано: {{ formatDate(order.createdDate) }}
            </p>
          </div>
          <span :class="['badge', `badge-${getStatusColor(order.status)}`]">
            {{ getWorkOrderStatus(order.status) }}
          </span>
        </div>

        <div class="grid grid-2 gap-4 mb-4 p-4 bg-gray-50 rounded">
          <div>
            <span class="text-gray-500 text-sm">Автомобиль</span>
            <p class="font-medium">{{ getCarName(order.clientCarId) }}</p>
          </div>
          <div>
            <span class="text-gray-500 text-sm">Мастер</span>
            <p class="font-medium">{{ getMasterName(order.masterId) }}</p>
          </div>
          <div v-if="order.startDate">
            <span class="text-gray-500 text-sm">Начало</span>
            <p class="font-medium">{{ formatDate(order.startDate) }}</p>
          </div>
          <div v-if="order.completionDate">
            <span class="text-gray-500 text-sm">Завершение</span>
            <p class="font-medium">{{ formatDate(order.completionDate) }}</p>
          </div>
        </div>

        <!-- Работы -->
        <div v-if="order.works.length > 0" class="mb-4">
          <h4 class="font-semibold text-sm mb-2">Выполненные работы:</h4>
          <div class="space-y-1 text-sm">
            <div v-for="work in order.works" :key="work.id" class="flex justify-between text-gray-600">
              <span>{{ work.name }}</span>
              <span>{{ work.hours }}ч. × {{ work.hourlyRate }} ₽ = {{ work.cost }} ₽</span>
            </div>
          </div>
        </div>

        <!-- Запчасти -->
        <div v-if="order.parts.length > 0" class="mb-4">
          <h4 class="font-semibold text-sm mb-2">Использованные запчасти:</h4>
          <div class="space-y-1 text-sm">
            <div v-for="part in order.parts" :key="part.id" class="flex justify-between text-gray-600">
              <span>{{ part.name }}</span>
              <span>{{ part.quantity }} × {{ part.unitPrice }} ₽ = {{ part.totalPrice }} ₽</span>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Примечание:</p>
            <p class="text-gray-700">{{ order.notes }}</p>
          </div>
          <div class="text-right">
            <p class="text-gray-600 text-sm">Итого:</p>
            <p class="text-2xl font-bold text-blue-600">{{ formatPrice(order.totalCost) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card text-center py-12">
      <p class="text-gray-600">История заказ-нарядов пуста</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useGarageStore } from '@/stores/garageStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const authStore = useAuthStore()
const workOrdersStore = useWorkOrdersStore()
const garageStore = useGarageStore()

const workOrders = computed(() => {
  if (!authStore.user) return []
  return workOrdersStore.getOrdersByClient(authStore.user.id)
})

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
.mb-4 { margin-bottom: 16px; }
.mb-2 { margin-bottom: 8px; }
.space-y-4 > * + * { margin-top: 16px; }
.space-y-1 > * + * { margin-top: 4px; }
.gap-4 { gap: 16px; }
.p-4 { padding: 16px; }
.pt-4 { padding-top: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.text-3xl { font-size: 30px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-2xl { font-size: 24px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-blue-600 { color: #2563eb; }
.text-gray-500 { color: #6b7280; }
.bg-gray-50 { background-color: #f9fafb; }
.rounded { border-radius: var(--radius); }
.border-t { border-top: 1px solid var(--border); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.py-12 { padding-top: 48px; padding-bottom: 48px; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
</style>
