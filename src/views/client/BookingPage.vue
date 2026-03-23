<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Мои заявки</h1>

    <!-- Фильтры -->
    <div class="card mb-6">
      <div class="flex gap-4">
        <button 
          v-for="status in ['all', 'pending', 'approved', 'completed']"
          :key="status"
          @click="filterStatus = status"
          :class="[
            'px-4 py-2 rounded',
            filterStatus === status
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ getStatusLabel(status) }}
        </button>
      </div>
    </div>

    <!-- Список заявок -->
    <div v-if="filteredRequests.length > 0" class="space-y-4">
      <div v-for="req in filteredRequests" :key="req.id" class="card">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">{{ getRequestType(req.type) }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(req.date) }} в {{ req.time }}</p>
          </div>
          <span :class="['badge', `badge-${getStatusColor(req.status)}`]">
            {{ getRequestStatus(req.status) }}
          </span>
        </div>
        <p class="text-gray-600 mb-4">{{ req.notes }}</p>
        <div class="flex gap-2">
          <button @click="editRequest(req)" class="btn btn-sm btn-secondary">
            Редактировать
          </button>
          <button @click="cancelRequest(req.id)" class="btn btn-sm btn-danger">
            Отменить
          </button>
        </div>
      </div>
    </div>
    <div v-else class="card text-center py-12">
      <p class="text-gray-600">Заявок не найдено</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { ref, computed } from 'vue'

const authStore = useAuthStore()
const requestsStore = useRequestsStore()
const filterStatus = ref('all')

const allRequests = computed(() => {
  if (!authStore.user) return []
  return requestsStore.getRequestsByClient(authStore.user.id)
})

const filteredRequests = computed(() => {
  if (filterStatus.value === 'all') return allRequests.value
  return allRequests.value.filter(r => r.status === filterStatus.value)
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

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    all: 'Все',
    pending: 'Ожидание',
    approved: 'Одобрено',
    completed: 'Завершено'
  }
  return labels[status] || status
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const editRequest = (req: any) => {
  alert('Редактирование: ' + req.notes)
}

const cancelRequest = (id: string) => {
  if (confirm('Вы уверены что хотите отменить заявку?')) {
    requestsStore.updateRequestStatus(id, 'cancelled')
  }
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 16px; }
.space-y-4 > * + * { margin-top: 16px; }
.gap-4 { gap: 16px; }
.gap-2 { gap: 8px; }
.px-4 { padding-left: 16px; padding-right: 16px; }
.py-2 { padding-top: 8px; padding-bottom: 8px; }
.text-3xl { font-size: 30px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.bg-blue-600 { background-color: #2563eb; color: white; }
.bg-gray-200 { background-color: #e5e7eb; }
.hover\:bg-gray-300:hover { background-color: #d1d5db; }
.rounded { border-radius: var(--radius); }
.text-white { color: #ffffff; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.py-12 { padding-top: 48px; padding-bottom: 48px; }
</style>
