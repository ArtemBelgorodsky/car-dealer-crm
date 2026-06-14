<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Управление автомобилями</h1>
      <button @click="showAddModal = true" class="btn btn-primary">+ Добавить авто</button>
    </div>

    <div class="card overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Марка</th>
            <th>Модель</th>
            <th>Год</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id">
            <td class="font-medium">{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.year }}</td>
            <td>{{ formatPrice(car.price) }}</td>
            <td>
              <span :class="['badge', `badge-${car.status === 'available' ? 'success' : 'warning'}`]">
                {{ getStatus(car.status) }}
              </span>
            </td>
            <td>
              <button @click="editCar(car)" class="btn btn-sm btn-secondary">
                Редакт.
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модал добавления -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">{{ editingCar ? 'Редактировать' : 'Добавить' }} автомобиль</h3>
          <button @click="showAddModal = false" class="text-gray-500">✕</button>
        </div>
        <div class="modal-body">
          <div class="grid grid-2 gap-4">
            <div class="form-group">
              <label class="form-label">Марка</label>
              <input v-model="formData.brand" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Модель</label>
              <input v-model="formData.model" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Год</label>
              <input v-model.number="formData.year" type="number" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Цена</label>
              <input v-model.number="formData.price" type="number" class="form-input" />
            </div>
            <div class="form-group col-span-2">
              <label class="form-label">Изображение</label>
              <input
                v-model="formData.image"
                type="text"
                class="form-input"
                placeholder="/toyota.jpg или https://..."
              />
            </div>
            <div v-if="formData.image" class="form-group col-span-2">
              <img :src="formData.image" alt="Предпросмотр авто" class="image-preview" />
            </div>
            <div class="form-group col-span-2">
              <label class="form-label">Описание</label>
              <textarea v-model="formData.description" class="form-textarea"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">Отмена</button>
          <button @click="saveCar" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarsStore } from '@/stores/carsStore'
import { ref, computed } from 'vue'
import type { Car } from '@/types'

const carsStore = useCarsStore()
const cars = computed(() => carsStore.cars)
const showAddModal = ref(false)
const editingCar = ref<Car | null>(null)
const formData = ref({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  image: '/toyota.jpg',
  description: ''
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}

const getStatus = (status: string) => {
  const statuses: Record<string, string> = {
    available: 'В наличии',
    reserved: 'Зарезервировано',
    sold: 'Продано'
  }
  return statuses[status] || status
}

const editCar = (car: Car) => {
  editingCar.value = car
  formData.value = {
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    image: car.image,
    description: car.description
  }
  showAddModal.value = true
}

const saveCar = () => {
  if (!formData.value.brand || !formData.value.model) return

  if (editingCar.value) {
    carsStore.updateCar(editingCar.value.id, formData.value)
  } else {
    carsStore.addCar({
      id: `car-${Date.now()}`,
      brand: formData.value.brand,
      model: formData.value.model,
      year: formData.value.year,
      price: formData.value.price,
      color: 'Не указан',
      mileage: 0,
      transmission: 'automatic',
      fuelType: 'petrol',
      engineVolume: 0,
      power: 0,
      seats: 5,
      image: formData.value.image || '/toyota.jpg',
      status: 'available',
      description: formData.value.description,
      createdAt: new Date()
    })
  }

  alert('Изменения сохранены!')
  formData.value = {
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    image: '/toyota.jpg',
    description: ''
  }
  showAddModal.value = false
  editingCar.value = null
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.text-3xl { font-size: 30px; }
.text-gray-900 { color: #111827; }
.overflow-x-auto { overflow-x: auto; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.font-medium { font-weight: 500; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.col-span-2 { grid-column: span 2; }
.image-preview {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid #e5e7eb;
}
</style>
