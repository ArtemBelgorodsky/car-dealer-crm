<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Управление заявками</h1>

    <div class="card overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Тип</th>
            <th>Дата</th>
            <th>Статус</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td>{{ getClientName(req.clientId) }}</td>
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
  </div>
</template>

<script setup lang="ts">
import { useRequestsStore } from '@/stores/requestsStore'
import { computed } from 'vue'
import { mockUsers } from '@/mocks'

const requestsStore = useRequestsStore()
const requests = computed(() => requestsStore.requests)

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
.overflow-x-auto { overflow-x: auto; }
.text-sm { font-size: 12px; }
.text-gray-600 { color: #4b5563; }
</style>
