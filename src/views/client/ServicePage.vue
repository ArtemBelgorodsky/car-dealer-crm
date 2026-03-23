<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Сервис и техническое обслуживание</h1>
    <p class="text-gray-600 mb-8">Запишитесь на техническое обслуживание или ремонт</p>

    <div class="grid grid-2 gap-8">
      <!-- Информация о сервисе -->
      <div>
        <div class="card mb-6">
          <h3 class="text-xl font-semibold mb-4">Наши услуги</h3>
          <div class="space-y-4">
            <div class="border-b pb-4">
              <h4 class="font-medium text-gray-900">Техническое обслуживание</h4>
              <p class="text-sm text-gray-600 mt-2">Плановое ТО, замена масла, фильтров, проверка системы</p>
              <p class="font-bold text-blue-600 mt-2">от 2500 ₽</p>
            </div>
            <div class="border-b pb-4">
              <h4 class="font-medium text-gray-900">Диагностика</h4>
              <p class="text-sm text-gray-600 mt-2">Полная компьютерная диагностика двигателя и систем</p>
              <p class="font-bold text-blue-600 mt-2">1000 ₽</p>
            </div>
            <div class="border-b pb-4">
              <h4 class="font-medium text-gray-900">Ремонт двигателя</h4>
              <p class="text-sm text-gray-600 mt-2">Профессиональный ремонт двигателя и его компонентов</p>
              <p class="font-bold text-blue-600 mt-2">по смете</p>
            </div>
            <div class="border-b pb-4">
              <h4 class="font-medium text-gray-900">Ремонт подвески</h4>
              <p class="text-sm text-gray-600 mt-2">Ремонт и замена элементов подвески</p>
              <p class="font-bold text-blue-600 mt-2">от 5000 ₽</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900">Шиномонтаж</h4>
              <p class="text-sm text-gray-600 mt-2">Монтаж и балансировка шин</p>
              <p class="font-bold text-blue-600 mt-2">от 500 ₽</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Режим работы</h3>
          <div class="space-y-2 text-gray-600">
            <div><span class="font-medium">Пн-Пт:</span> 08:00 - 19:00</div>
            <div><span class="font-medium">Сб:</span> 09:00 - 17:00</div>
            <div><span class="font-medium">Вс:</span> Выходной</div>
          </div>
          <p class="text-sm text-gray-500 mt-4">
            ☎️ +7 (999) 123-45-67<br>
            ✉️ service@autodealer.ru
          </p>
        </div>
      </div>

      <!-- Форма записи -->
      <div>
        <div class="card">
          <h3 class="text-xl font-semibold mb-6">Запись на сервис</h3>
          
          <div class="form-group">
            <label class="form-label">Выберите автомобиль</label>
            <select v-model="selectedCarId" class="form-select">
              <option value="">-- Выберите авто --</option>
              <option v-for="car in clientCars" :key="car.id" :value="car.id">
                {{ car.brand }} {{ car.model }} ({{ car.licensePlate }})
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Тип услуги</label>
            <select v-model="serviceType" class="form-select">
              <option value="test_drive">Тест-драйв</option>
              <option value="reserve">Бронирование</option>
              <option value="maintenance">Техническое обслуживание</option>
              <option value="repair">Ремонт</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Дата</label>
            <input v-model="serviceDate" type="date" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label">Время</label>
            <select v-model="serviceTime" class="form-select">
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Описание проблемы</label>
            <textarea v-model="description" class="form-textarea" placeholder="Опишите вашу проблему или желаемую услугу"></textarea>
          </div>

          <button @click="submitBooking" class="btn btn-primary w-full">
            Записаться на сервис
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useGarageStore } from '@/stores/garageStore'
import { useRequestsStore } from '@/stores/requestsStore'
import { ref, computed } from 'vue'

const authStore = useAuthStore()
const garageStore = useGarageStore()
const requestsStore = useRequestsStore()

const selectedCarId = ref('')
const serviceType = ref('maintenance')
const serviceDate = ref('')
const serviceTime = ref('09:00')
const description = ref('')

const clientCars = computed(() => {
  if (!authStore.user) return []
  return garageStore.getClientCars(authStore.user.id)
})

const availableTimes = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

const submitBooking = () => {
  if (!selectedCarId.value || !serviceDate.value) {
    alert('Заполните обязательные поля')
    return
  }

  if (!authStore.user) return

  const request = {
    id: `req-${Date.now()}`,
    clientId: authStore.user.id,
    type: serviceType.value as 'test_drive' | 'reserve' | 'maintenance' | 'repair',
    status: 'pending' as const,
    date: new Date(serviceDate.value),
    time: serviceTime.value,
    notes: description.value || 'Запись на сервис',
    createdAt: new Date()
  }

  requestsStore.addRequest(request)
  alert('Запись на сервис успешно создана! Мы свяжемся с вами для подтверждения.')
  
  // Очистка формы
  selectedCarId.value = ''
  serviceDate.value = ''
  serviceTime.value = '09:00'
  description.value = ''
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 16px; }
.mb-2 { margin-bottom: 8px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.space-y-2 > * + * { margin-top: 8px; }
.space-y-4 > * + * { margin-top: 16px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-blue-600 { color: #2563eb; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.pb-4 { padding-bottom: 16px; }
.border-b { border-bottom: 1px solid var(--border); }
.w-full { width: 100%; }

@media (max-width: 768px) {
  .grid-2 { grid-template-columns: 1fr; }
  .p-8 { padding: 16px; }
}
</style>
