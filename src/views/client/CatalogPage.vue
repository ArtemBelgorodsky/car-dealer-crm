<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Каталог автомобилей</h1>
      <p class="text-gray-600 mt-2">{{ filteredCars.length }} автомобилей найдено</p>
    </div>

    <!-- Фильтры -->
    <Card class="mb-8">
      <template #header>
        <h3 class="text-lg font-semibold">Фильтры</h3>
      </template>
      
      <div class="grid grid-3 gap-4">
        <FormField 
          v-model="selectedBrand"
          label="Марка"
          type="select"
          placeholder="Выберите марку"
          :options="brandOptions"
        />
        <FormField 
          v-model="priceMin"
          label="Цена от (₽)"
          type="number"
          placeholder="0"
        />
        <FormField 
          v-model.number="priceMax"
          label="Цена до (₽)"
          type="number"
          placeholder="1000000"
        />
        <FormField 
          v-model="selectedFuel"
          label="Тип топлива"
          type="select"
          placeholder="Выберите тип"
          :options="fuelOptions"
        />
      </div>
      
      <template #footer>
        <Button variant="primary" @click="applyFilters">Применить</Button>
        <Button variant="secondary" @click="clearFilters">Очистить</Button>
      </template>
    </Card>

    <!-- Список автомобилей -->
    <div v-if="filteredCars.length > 0" class="grid grid-3">
      <Card 
        v-for="car in filteredCars"
        :key="car.id"
        hoverable
        class="cursor-pointer transform transition hover:scale-105"
        @click="router.push(`/client/car/${car.id}`)"
      >
        <div class="car-image-frame mb-4">
          <img
            :src="car.image || fallbackImage"
            alt="Изображение автомобиля"
            class="car-image"
            @error="setFallbackImage"
          />
        </div>
        
        <h3 class="text-lg font-semibold mb-2">{{ car.brand }} {{ car.model }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ car.year }} год • {{ car.color }}</p>
        
        <div class="space-y-2 mb-4 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Мощность:</span>
            <span class="font-medium">{{ car.power }} л.с.</span>
          </div>
          <div class="flex justify-between">
            <span>Объём:</span>
            <span class="font-medium">{{ car.engineVolume }} л</span>
          </div>
          <div class="flex justify-between">
            <span>Топливо:</span>
            <span class="font-medium">{{ getFuelType(car.fuelType) }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t">
          <div>
            <div class="text-2xl font-bold text-blue-600">
              {{ formatPrice(car.price) }}
            </div>
            <Badge :variant="car.status === 'available' ? 'success' : 'warning'">
              {{ getStatus(car.status) }}
            </Badge>
          </div>
          <Button size="sm" variant="primary">Подробнее</Button>
        </div>
      </Card>
    </div>
    
    <Card v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">Автомобили по вашему фильтру не найдены</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCarsStore } from '@/stores/carsStore'
import { ref, computed } from 'vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import Badge from '@/components/Badge.vue'
import FormField from '@/components/FormField.vue'

const carsStore = useCarsStore()
const router = useRouter()

const selectedBrand = ref('')
const priceMin = ref<number | undefined>(undefined)
const priceMax = ref<number | undefined>(undefined)
const selectedFuel = ref('')

const filteredCars = computed(() => carsStore.filteredCars)
const brandOptions = computed(() =>
  carsStore.brands.map(brand => ({ label: brand, value: brand }))
)
const fallbackImage = '/toyota.jpg'
const fuelOptions = [
  { label: 'Бензин', value: 'petrol' },
  { label: 'Дизель', value: 'diesel' },
  { label: 'Электро', value: 'electric' },
  { label: 'Гибрид', value: 'hybrid' }
]

const applyFilters = () => {
  carsStore.setFilter({
    brand: selectedBrand.value || undefined,
    priceMin: priceMin.value,
    priceMax: priceMax.value,
    fuelType: selectedFuel.value || undefined
  })
}

const clearFilters = () => {
  selectedBrand.value = ''
  priceMin.value = undefined
  priceMax.value = undefined
  selectedFuel.value = ''
  carsStore.clearFilter()
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
</script>

<style scoped>
.p-8 {
  padding: 32px;
}

.mb-8 {
  margin-bottom: 32px;
}

.mt-2 {
  margin-top: 8px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.gap-4 {
  gap: 16px;
}

.gap-3 {
  gap: 12px;
}

.rounded-lg {
  border-radius: var(--radius-lg);
}

.car-image-frame {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #e5e7eb;
  border-radius: var(--radius-lg);
}

.car-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

.text-3xl {
  font-size: 30px;
}

.text-lg {
  font-size: 18px;
}

.text-sm {
  font-size: 12px;
}

.text-2xl {
  font-size: 24px;
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

.text-blue-600 {
  color: #2563eb;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.flex-bg-gray-50 {
  background-color: #f9fafb;
}

.py-12 {
  padding-top: 48px;
  padding-bottom: 48px;
}

.mt-4 {
  margin-top: 16px;
}

@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }

  .p-8 {
    padding: 16px;
  }
}
</style>
