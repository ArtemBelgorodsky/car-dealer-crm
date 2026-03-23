<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Управление заказ-нарядами</h1>

    <div class="grid grid-3 gap-4 mb-8">
      <div class="card text-center">
        <p class="text-gray-600 text-sm">Всего</p>
        <p class="text-3xl font-bold text-blue-600">{{ workOrders.length }}</p>
      </div>
      <div class="card text-center">
        <p class="text-gray-600 text-sm">В процессе</p>
        <p class="text-3xl font-bold text-orange-600">{{ inProgressCount }}</p>
      </div>
      <div class="card text-center">
        <p class="text-gray-600 text-sm">Завершено</p>
        <p class="text-3xl font-bold text-green-600">{{ completedCount }}</p>
      </div>
    </div>

    <div class="card overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Цена</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in workOrders" :key="order.id">
            <td>{{ getClientName(order.clientId) }}</td>
            <td>{{ order.description }}</td>
            <td>
              <span :class="['badge', `badge-${getStatusColor(order.status)}`]">
                {{ getStatus(order.status) }}
              </span>
            </td>
            <td>{{ formatPrice(order.totalCost) }}</td>
            <td>{{ formatDate(order.createdDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const workOrdersStore = useWorkOrdersStore()
const workOrders = computed(() => workOrdersStore.workOrders)
const inProgressCount = computed(() => workOrdersStore.inProgressOrders.length)
const completedCount = computed(() => workOrdersStore.completedOrders.length)

const getStatus = (status: string) => {
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const getClientName = (clientId: string) => {
  const client = mockUsers.find(u => u.id === clientId)
  return client?.name || 'Неизвестный клиент'
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.text-3xl { font-size: 30px; }
.text-gray-900 { color: #111827; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gap-4 { gap: 16px; }
.overflow-x-auto { overflow-x: auto; }
.text-sm { font-size: 12px; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.text-orange-600 { color: #ea580c; }
.text-green-600 { color: #16a34a; }
.font-bold { font-weight: 700; }
</style>
