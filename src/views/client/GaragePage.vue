<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Мой гараж</h1>
        <p class="text-gray-600 mt-2">{{ cars.length }} автомобилей</p>
      </div>
      <button @click="showAddModal = true" class="btn btn-primary">
        + Добавить авто
      </button>
    </div>

    <div v-if="cars.length > 0" class="grid grid-2 gap-6">
      <div v-for="car in cars" :key="car.id" class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold">{{ car.brand }} {{ car.model }}</h3>
          <button @click="deleteCar(car.id)" class="text-red-500 hover:text-red-700">✕</button>
        </div>
        <div class="space-y-2 mb-4 text-sm text-gray-600">
          <div><span class="text-gray-500">Год:</span> {{ car.year }}</div>
          <div><span class="text-gray-500">Гос. номер:</span> {{ car.licensePlate }}</div>
          <div><span class="text-gray-500">Пробег:</span> {{ car.mileage }} км</div>
          <div v-if="car.lastServiceDate">
            <span class="text-gray-500">Последнее ТО:</span> {{ formatDate(car.lastServiceDate) }}
          </div>
          <div v-if="car.nextServiceDate">
            <span class="text-gray-500">Следующее ТО:</span> {{ formatDate(car.nextServiceDate) }}
          </div>
        </div>
        <div class="flex gap-2">
          <button @click="openService(car.id)" class="btn btn-sm btn-primary flex-1">
            На сервис
          </button>
          <button @click="editCar(car)" class="btn btn-sm btn-secondary flex-1">
            Редакт.
          </button>
        </div>
      </div>
    </div>
    <div v-else class="card text-center py-12">
      <p class="text-gray-600 mb-4">У вас нет автомобилей в гараже</p>
      <button @click="showAddModal = true" class="btn btn-primary">
        Добавить первый автомобиль
      </button>
    </div>

    <!-- Модал добавления -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Добавить автомобиль</h3>
          <button @click="showAddModal = false" class="text-gray-500">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Марка</label>
            <input v-model="newCar.brand" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Модель</label>
            <input v-model="newCar.model" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Год</label>
            <input v-model.number="newCar.year" type="number" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Гос. номер</label>
            <input v-model="newCar.licensePlate" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Пробег (км)</label>
            <input v-model.number="newCar.mileage" type="number" class="form-input" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">
            Отмена
          </button>
          <button @click="addCar" class="btn btn-primary">
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGarageStore } from '@/stores/garageStore'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import type { ClientCar } from '@/types'

const authStore = useAuthStore()
const garageStore = useGarageStore()
const router = useRouter()

const showAddModal = ref(false)
const newCar = ref({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: '',
  mileage: 0
})

const cars = computed(() => {
  if (!authStore.user) return []
  return garageStore.getClientCars(authStore.user.id)
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const addCar = () => {
  if (!authStore.user || !newCar.value.brand || !newCar.value.model) return

  const car: ClientCar = {
    id: `cc-${Date.now()}`,
    clientId: authStore.user.id,
    brand: newCar.value.brand,
    model: newCar.value.model,
    year: newCar.value.year,
    licensePlate: newCar.value.licensePlate,
    mileage: newCar.value.mileage
  }

  garageStore.addCar(car)
  showAddModal.value = false
  newCar.value = { brand: '', model: '', year: new Date().getFullYear(), licensePlate: '', mileage: 0 }
}

const deleteCar = (id: string) => {
  if (confirm('Вы уверены?')) {
    garageStore.removeCar(id)
  }
}

const editCar = (car: ClientCar) => {
  newCar.value = { ...car }
  showAddModal.value = true
}

const openService = (carId: string) => {
  router.push('/client/service')
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-4 { margin-bottom: 16px; }
.mt-2 { margin-top: 8px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
.gap-6 { gap: 24px; }
.gap-2 { gap: 8px; }
.space-y-2 > * + * { margin-top: 8px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-red-500 { color: #ef4444; }
.hover\:text-red-700:hover { color: #b91c1c; }
.py-12 { padding-top: 48px; padding-bottom: 48px; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.flex-1 { flex: 1; }
</style>
