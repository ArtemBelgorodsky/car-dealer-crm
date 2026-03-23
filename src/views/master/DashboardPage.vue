<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Панель мастера-приёмника</h1>

    <!-- Статистика -->
    <div class="grid grid-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-4xl mb-2">📋</div>
        <p class="text-gray-600 text-sm">Всего заявок</p>
        <p class="text-3xl font-bold text-blue-600">{{ allRequests.length }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">⏳</div>
        <p class="text-gray-600 text-sm">На рассмотрении</p>
        <p class="text-3xl font-bold text-yellow-600">{{ pendingRequests.length }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">⚙️</div>
        <p class="text-gray-600 text-sm">В процессе</p>
        <p class="text-3xl font-bold text-blue-600">{{ inProgressOrders.length }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">✅</div>
        <p class="text-gray-600 text-sm">Завершённых</p>
        <p class="text-3xl font-bold text-green-600">{{ completedOrders.length }}</p>
      </div>
    </div>

    <!-- Новые заявки -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Новые заявки на рассмотрении</h2>
        <RouterLink to="/master/requests" class="btn btn-sm btn-primary">
          Все заявки
        </RouterLink>
      </div>

      <div v-if="pendingRequests.length > 0" class="space-y-3">
        <div v-for="req in pendingRequests.slice(0, 5)" :key="req.id" class="flex items-center justify-between p-4 bg-yellow-50 rounded border border-yellow-200">
          <div>
            <h4 class="font-medium">{{ getRequestType(req.type) }}</h4>
            <p class="text-sm text-gray-600">{{ formatDate(req.date) }} в {{ req.time }}</p>
          </div>
          <button @click="approveRequest(req.id)" class="btn btn-sm btn-success">
            Одобрить
          </button>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        Нет новых заявок
      </div>
    </div>

    <!-- Текущие работы -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Текущие работы</h2>
        <RouterLink to="/master/work-orders" class="btn btn-sm btn-primary">
          Все работы
        </RouterLink>
      </div>

      <div v-if="inProgressOrders.length > 0" class="space-y-3">
        <div v-for="order in inProgressOrders.slice(0, 5)" :key="order.id" class="flex items-center justify-between p-4 bg-blue-50 rounded border border-blue-200">
          <div>
            <h4 class="font-medium">{{ order.description }}</h4>
            <p class="text-sm text-gray-600">
              Клиент: {{ getClientName(order.clientId) }}
            </p>
          </div>
          <RouterLink :to="`/master/work-order/${order.id}`" class="btn btn-sm btn-primary">
            Подробнее
          </RouterLink>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        Нет активных работ
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const authStore = useAuthStore()
const requestsStore = useRequestsStore()
const workOrdersStore = useWorkOrdersStore()

const allRequests = computed(() => requestsStore.requests)
const pendingRequests = computed(() => requestsStore.pendingRequests)
const inProgressOrders = computed(() => workOrdersStore.inProgressOrders)
const completedOrders = computed(() => workOrdersStore.completedOrders)

const getRequestType = (type: string) => {
  const types: Record<string, string> = {
    test_drive: 'Тест-драйв',
    reserve: 'Резервирование',
    maintenance: 'Обслуживание',
    repair: 'Ремонт'
  }
  return types[type] || type
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const getClientName = (clientId: string) => {
  const client = mockUsers.find(u => u.id === clientId)
  return client?.name || 'Неизвестный клиент'
}

const approveRequest = (requestId: string) => {
  requestsStore.updateRequestStatus(requestId, 'approved')
  alert('Заявка одобрена!')
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.space-y-3 > * + * { margin-top: 12px; }
.text-3xl { font-size: 30px; }
.text-2xl { font-size: 24px; }
.text-4xl { font-size: 36px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.text-yellow-600 { color: #ca8a04; }
.text-green-600 { color: #16a34a; }
.bg-yellow-50 { background-color: #fefce8; }
.bg-blue-50 { background-color: #eff6ff; }
.border { border: 1px solid var(--border); }
.border-yellow-200 { border-color: #eab308; }
.border-blue-200 { border-color: #bfdbfe; }
.p-4 { padding: 16px; }
.rounded { border-radius: var(--radius); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.py-8 { padding-top: 32px; padding-bottom: 32px; }
</style>
