<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Статистика</h1>

    <!-- Основные показатели -->
    <div class="grid grid-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-4xl mb-2">🚙</div>
        <p class="text-gray-600 text-sm">Всего автомобилей</p>
        <p class="text-3xl font-bold text-blue-600">{{ stats.totalCars }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ stats.availableCars }} доступных</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">👥</div>
        <p class="text-gray-600 text-sm">Всего клиентов</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.totalClients }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">💰</div>
        <p class="text-gray-600 text-sm">Общий доход</p>
        <p class="text-3xl font-bold text-purple-600">{{ formatPrice(stats.totalRevenue) }}</p>
      </div>
      <div class="card text-center">
        <div class="text-4xl mb-2">📊</div>
        <p class="text-gray-600 text-sm">Выполнено заказов</p>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.completedOrders }}</p>
      </div>
    </div>

    <!-- Детальная статистика -->
    <div class="grid grid-2 gap-8">
      <!-- Статус автомобилей -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-6">Статус автомобилей</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-green-50 rounded">
            <span class="font-medium">В наличии</span>
            <span class="text-lg font-bold text-green-600">{{ stats.availableCars }}</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-yellow-50 rounded">
            <span class="font-medium">Зарезервировано</span>
            <span class="text-lg font-bold text-yellow-600">{{ stats.reservedCars }}</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span class="font-medium">Продано</span>
            <span class="text-lg font-bold text-gray-600">{{ stats.soldCars }}</span>
          </div>
        </div>
      </div>

      <!-- Статус заявок -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-6">Статус заявок</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-blue-50 rounded">
            <span class="font-medium">На рассмотрении</span>
            <span class="text-lg font-bold text-blue-600">{{ stats.pendingRequests }}</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-orange-50 rounded">
            <span class="font-medium">В процессе</span>
            <span class="text-lg font-bold text-orange-600">{{ stats.inProgressRequests }}</span>
          </div>
          <div class="flex items-center justify-between p-3 bg-green-50 rounded">
            <span class="font-medium">Завершено</span>
            <span class="text-lg font-bold text-green-600">{{ stats.completedRequests }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Динамика продаж -->
    <div class="card mt-8">
      <h3 class="text-xl font-semibold mb-6">Среднедневная статистика</h3>
      <div class="grid grid-3 gap-4">
        <div class="p-4 bg-blue-50 rounded text-center">
          <p class="text-sm text-gray-600">Среднее кол-во заявок в день</p>
          <p class="text-2xl font-bold text-blue-600">{{ (stats.pendingRequests / 30).toFixed(1) }}</p>
        </div>
        <div class="p-4 bg-green-50 rounded text-center">
          <p class="text-sm text-gray-600">Среднее кол-во продаж в день</p>
          <p class="text-2xl font-bold text-green-600">{{ (stats.completedOrders / 30).toFixed(1) }}</p>
        </div>
        <div class="p-4 bg-purple-50 rounded text-center">
          <p class="text-sm text-gray-600">Средний доход в день</p>
          <p class="text-2xl font-bold text-purple-600">{{ formatPrice(stats.totalRevenue / 30) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  availableCars: carsStore.cars.filter(c => c.status === 'available').length,
  reservedCars: carsStore.cars.filter(c => c.status === 'reserved').length,
  soldCars: carsStore.cars.filter(c => c.status === 'sold').length,
  totalClients: mockUsers.filter(u => u.role === 'client').length,
  totalRevenue: workOrdersStore.completedOrders.reduce((sum, o) => sum + o.totalCost, 0),
  completedOrders: workOrdersStore.completedOrders.length,
  pendingRequests: requestsStore.pendingRequests.length,
  inProgressRequests: requestsStore.requests.filter(r => r.status === 'in_progress').length,
  completedRequests: requestsStore.requests.filter(r => r.status === 'completed').length
}))

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mt-8 { margin-top: 32px; }
.mt-1 { margin-top: 4px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-4xl { font-size: 36px; }
.text-lg { font-size: 18px; }
.text-2xl { font-size: 24px; }
.text-sm { font-size: 12px; }
.text-xs { font-size: 10px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-blue-600 { color: #2563eb; }
.text-green-600 { color: #16a34a; }
.text-yellow-600 { color: #ca8a04; }
.text-purple-600 { color: #9333ea; }
.text-orange-600 { color: #ea580c; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gap-4 { gap: 16px; }
.space-y-4 > * + * { margin-top: 16px; }
.p-4 { padding: 16px; }
.p-3 { padding: 12px; }
.rounded { border-radius: var(--radius); }
.bg-green-50 { background-color: #f0fdf4; }
.bg-yellow-50 { background-color: #fefce8; }
.bg-gray-50 { background-color: #f9fafb; }
.bg-blue-50 { background-color: #eff6ff; }
.bg-orange-50 { background-color: #fff7ed; }
.bg-purple-50 { background-color: #faf5ff; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-center { text-align: center; }

@media (max-width: 1024px) {
  .grid-2 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
}
</style>
