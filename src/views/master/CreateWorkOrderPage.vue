<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Создать заказ-наряд</h1>

    <div class="card max-w-2xl">
      <div class="form-group">
        <label class="form-label">Клиент</label>
        <select v-model="newOrder.clientId" class="form-select">
          <option value="">-- Выберите клиента --</option>
          <option v-for="user in clients" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Автомобиль клиента</label>
        <select v-model="newOrder.clientCarId" class="form-select">
          <option value="">-- Выберите авто --</option>
          <option v-for="car in clientCars" :key="car.id" :value="car.id">
            {{ car.brand }} {{ car.model }} ({{ car.licensePlate }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Описание работ</label>
        <textarea v-model="newOrder.description" class="form-textarea" placeholder="Описание выполняемых работ"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Стоимость</label>
        <input v-model.number="newOrder.totalCost" type="number" class="form-input" placeholder="0" />
      </div>

      <div class="form-group">
        <label class="form-label">Примечания</label>
        <textarea v-model="newOrder.notes" class="form-textarea" placeholder="Примечания по заказу"></textarea>
      </div>

      <div class="flex gap-3">
        <RouterLink to="/master/work-orders" class="btn btn-secondary">
          Отмена
        </RouterLink>
        <button @click="createOrder" class="btn btn-primary">
          Создать наряд
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useWorkOrdersStore } from '@/stores/workOrdersStore'
import { useGarageStore } from '@/stores/garageStore'
import { ref, computed } from 'vue'
import { mockUsers, mockClientCars } from '@/mocks'
import type { WorkOrder } from '@/types'

const router = useRouter()
const workOrdersStore = useWorkOrdersStore()
const garageStore = useGarageStore()

const newOrder = ref({
  clientId: '',
  clientCarId: '',
  description: '',
  totalCost: 0,
  notes: ''
})

const clients = computed(() => mockUsers.filter(u => u.role === 'client'))
const clientCars = computed(() => {
  if (!newOrder.value.clientId) return []
  return garageStore.getClientCars(newOrder.value.clientId)
})

const createOrder = () => {
  if (!newOrder.value.clientId || !newOrder.value.clientCarId || !newOrder.value.description) {
    alert('Заполните обязательные поля')
    return
  }

  const order: WorkOrder = {
    id: `wo-${Date.now()}`,
    clientId: newOrder.value.clientId,
    clientCarId: newOrder.value.clientCarId,
    status: 'created',
    createdDate: new Date(),
    description: newOrder.value.description,
    works: [],
    parts: [],
    totalCost: newOrder.value.totalCost,
    notes: newOrder.value.notes
  }

  workOrdersStore.addOrder(order)
  router.push('/master/work-orders')
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.text-3xl { font-size: 30px; }
.text-gray-900 { color: #111827; }
.max-w-2xl { max-width: 42rem; }
.gap-3 { gap: 12px; }
.flex { display: flex; }
</style>
