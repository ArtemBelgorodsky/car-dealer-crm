<template>
  <div class="p-8">
    <RouterLink to="/client/catalog" class="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center">
      ← Вернуться в каталог
    </RouterLink>

    <div v-if="car" class="card">
      <div class="grid grid-2 gap-8 mb-8">
        <!-- Фото -->
        <div>
          <div class="detail-image-frame mb-4">
            <img
              :src="car.image || fallbackImage"
              alt="Изображение автомобиля"
              class="detail-image"
              @error="setFallbackImage"
            />
          </div>
        </div>

        <!-- Информация -->
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ car.brand }} {{ car.model }}
          </h1>
          <p class="text-2xl font-bold text-blue-600 mb-6">{{ formatPrice(car.price) }}</p>

          <!-- Характеристики -->
          <div class="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 class="text-lg font-semibold mb-4">Основные характеристики</h3>
            <div class="grid grid-2 gap-4">
              <div>
                <p class="text-gray-600 text-sm">Год выпуска</p>
                <p class="text-lg font-medium">{{ car.year }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Цвет</p>
                <p class="text-lg font-medium">{{ car.color }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Пробег</p>
                <p class="text-lg font-medium">{{ car.mileage }} км</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Коробка передач</p>
                <p class="text-lg font-medium">{{ getTransmission(car.transmission) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Объём двигателя</p>
                <p class="text-lg font-medium">{{ car.engineVolume }} л</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Мощность</p>
                <p class="text-lg font-medium">{{ car.power }} л.с.</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Тип топлива</p>
                <p class="text-lg font-medium">{{ getFuelType(car.fuelType) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Мест</p>
                <p class="text-lg font-medium">{{ car.seats }}</p>
              </div>
            </div>
          </div>

          <!-- Статус -->
          <div class="mb-6">
            <span :class="['badge', `badge-${car.status === 'available' ? 'success' : 'warning'}`]">
              {{ getStatus(car.status) }}
            </span>
          </div>

          <!-- Кнопки действия -->
          <div class="flex gap-4">
            <button 
              @click="showTestDriveModal = true"
              :disabled="car.status !== 'available'"
              class="btn btn-primary btn-lg flex-1"
            >
              Запросить тест-драйв
            </button>
            <button 
              @click="showReserveModal = true"
              :disabled="car.status === 'sold'"
              class="btn btn-secondary btn-lg flex-1"
            >
              Зарезервировать
            </button>
          </div>
        </div>
      </div>

      <!-- Описание -->
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">Описание</h3>
        <p class="text-gray-600 text-lg leading-relaxed">
          {{ car.description }}
        </p>
      </div>
    </div>

    <!-- Модал для тест-драйва -->
    <div v-if="showTestDriveModal" class="modal-overlay" @click.self="showTestDriveModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Запрос на тест-драйв</h3>
          <button @click="showTestDriveModal = false" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Дата</label>
            <input v-model="testDriveDate" type="date" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Время</label>
            <input v-model="testDriveTime" type="time" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Примечание</label>
            <textarea v-model="testDriveNote" class="form-textarea" placeholder="Дополнительная информация"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showTestDriveModal = false" class="btn btn-secondary">
            Отмена
          </button>
          <button @click="submitTestDrive" class="btn btn-primary">
            Отправить
          </button>
        </div>
      </div>
    </div>

    <!-- Модал для резервирования -->
    <div v-if="showReserveModal" class="modal-overlay" @click.self="showReserveModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Резервирование автомобиля</h3>
          <button @click="showReserveModal = false" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div class="modal-body">
          <p class="text-gray-600 mb-4">
            Вы собираетесь зарезервировать: <strong>{{ car?.brand }} {{ car?.model }}</strong>
          </p>
          <div class="form-group">
            <label class="form-label">Примечание</label>
            <textarea v-model="reserveNote" class="form-textarea" placeholder="Дополнительная информация"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showReserveModal = false" class="btn btn-secondary">
            Отмена
          </button>
          <button @click="submitReserve" class="btn btn-primary">
            Зарезервировать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useCarsStore } from '@/stores/carsStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed } from 'vue'

const route = useRoute()
const carsStore = useCarsStore()
const requestsStore = useRequestsStore()
const authStore = useAuthStore()

const carId = route.params.id as string
const car = computed(() => carsStore.getCar(carId))

const showTestDriveModal = ref(false)
const showReserveModal = ref(false)
const testDriveDate = ref('')
const testDriveTime = ref('14:00')
const testDriveNote = ref('')
const reserveNote = ref('')
const fallbackImage = '/toyota.jpg'

const getTransmission = (type: string) => {
  const transmissions: Record<string, string> = {
    automatic: 'Автоматическая',
    manual: 'Механическая'
  }
  return transmissions[type] || type
}

const getFuelType = (type: string) => {
  const types: Record<string, string> = {
    petrol: 'Бензин',
    diesel: 'Дизель',
    electric: 'Электро',
    hybrid: 'Гибрид'
  }
  return types[type] || type
}

const getStatus = (status: string) => {
  const statuses: Record<string, string> = {
    available: 'В наличии',
    reserved: 'Зарезервировано',
    sold: 'Продано'
  }
  return statuses[status] || status
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}

const setFallbackImage = (event: Event) => {
  const image = event.target as HTMLImageElement
  if (image.src.endsWith(fallbackImage)) return
  image.src = fallbackImage
}

const submitTestDrive = () => {
  if (!car.value || !authStore.user) return

  const request = {
    id: `req-${Date.now()}`,
    clientId: authStore.user.id,
    carId: car.value.id,
    type: 'test_drive' as const,
    status: 'pending' as const,
    date: new Date(testDriveDate.value),
    time: testDriveTime.value,
    notes: testDriveNote.value || 'Запрос на тест-драйв',
    createdAt: new Date()
  }

  requestsStore.addRequest(request)
  showTestDriveModal.value = false
  alert('Запрос на тест-драйв отправлен! Мы свяжемся с вами в ближайшее время.')
}

const submitReserve = () => {
  if (!car.value || !authStore.user) return

  const request = {
    id: `req-${Date.now()}`,
    clientId: authStore.user.id,
    carId: car.value.id,
    type: 'reserve' as const,
    status: 'pending' as const,
    date: new Date(),
    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    notes: reserveNote.value || 'Заявка на резервирование',
    createdAt: new Date()
  }

  requestsStore.addRequest(request)
  carsStore.updateCar(car.value.id, { status: 'reserved' })
  showReserveModal.value = false
  alert('Автомобиль успешно зарезервирован!')
}
</script>

<style scoped>
.p-8 {
  padding: 32px;
}

.mb-6 {
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-8 {
  margin-bottom: 32px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.rounded-lg {
  border-radius: var(--radius-lg);
}

.detail-image-frame {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #e5e7eb;
  border-radius: var(--radius-lg);
}

.detail-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.p-6 {
  padding: 24px;
}

.gap-4 {
  gap: 16px;
}

.gap-8 {
  gap: 32px;
}

.text-4xl {
  font-size: 36px;
}

.text-2xl {
  font-size: 24px;
}

.text-xl {
  font-size: 20px;
}

.text-lg {
  font-size: 18px;
}

.text-sm {
  font-size: 12px;
}

.text-blue-600 {
  color: #2563eb;
}

.hover\:text-blue-700:hover {
  color: #1d4ed8;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-400 {
  color: #9ca3af;
}

.text-gray-500 {
  color: #6b7280;
}

.inline-flex {
  display: inline-flex;
}

.items-center {
  align-items: center;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.leading-relaxed {
  line-height: 1.625;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .p-8 {
    padding: 16px;
  }
}
</style>
