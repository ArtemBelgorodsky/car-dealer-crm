<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Заказ-наряды</h1>
      <RouterLink to="/master/create-work-order" class="btn btn-primary">
        + Создать наряд
      </RouterLink>
    </div>

    <div class="space-y-4">
      <div v-for="order in workOrders" :key="order.id" class="card">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">{{ order.description }}</h3>
            <p class="text-sm text-gray-600">Клиент: {{ getClientName(order.clientId) }}</p>
          </div>
          <span :class="['badge', `badge-${getStatusColor(order.status)}`]">
            {{ getWorkOrderStatus(order.status) }}
          </span>
        </div>
        
        <div class="grid grid-3 gap-4 mb-4 text-sm text-gray-600">
          <div>
            <span class="text-gray-500">Авто:</span> {{ getCarName(order.clientCarId) }}
          </div>
          <div>
            <span class="text-gray-500">Дата создания:</span> {{ formatDate(order.createdDate) }}
          </div>
          <div>
            <span class="text-gray-500">Цена:</span> {{ formatPrice(order.totalCost) }}
          </div>
        </div>

        <div class="flex gap-2">
          <RouterLink :to="`/master/work-order/${order.id}`" class="btn btn-sm btn-primary">
            Подробнее
          </RouterLink>
          <button 
            v-if="order.status !== 'completed'"
            @click="changeStatus(order.id, getNextStatus(order.status))"
            class="btn btn-sm btn-secondary"
          >
            {{ getNextStatusLabel(order.status) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useGarageStore } from '@/stores/garageStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'
import type { WorkOrderStatus } from '@/types'

const workOrdersStore = useWorkOrdersStore()
const garageStore = useGarageStore()

const workOrders = computed(() => workOrdersStore.workOrders)

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

const getCarName = (carId: string) => {
  const car = garageStore.getCar(carId)
  return car ? `${car.brand} ${car.model}` : 'Неизвестное авто'
}

const getNextStatus = (status: string): WorkOrderStatus => {
  const statuses: Record<string, WorkOrderStatus> = {
    created: 'approved',
    approved: 'in_progress',
    in_progress: 'ready',
    ready: 'completed',
    completed: 'completed'
  }
  return statuses[status] || 'completed'
}

const getNextStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    created: 'Одобрить',
    approved: 'Начать работу',
    in_progress: 'Готово к отправке',
    ready: 'Завершить',
    completed: 'Завершено'
  }
  return labels[status] || 'Дальше'
}

const changeStatus = (orderId: string, newStatus: WorkOrderStatus) => {
  workOrdersStore.updateOrderStatus(orderId, newStatus)
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.space-y-4 > * + * { margin-top: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gap-4 { gap: 16px; }
.gap-2 { gap: 8px; }
.mb-4 { margin-bottom: 16px; }
.text-3xl { font-size: 30px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
</style>
