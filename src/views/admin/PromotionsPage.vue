<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Управление акциями</h1>
      <button @click="showAddModal = true" class="btn btn-primary">+ Создать акцию</button>
    </div>

    <div class="grid grid-2 gap-6">
      <div v-for="promo in promotions" :key="promo.id" class="card">
        <h3 class="text-lg font-semibold mb-3">{{ promo.title }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ promo.description }}</p>
        <div class="flex items-center justify-between mb-4">
          <span class="text-2xl font-bold text-blue-600">-{{ promo.discount }}%</span>
          <span class="text-sm text-gray-500">до {{ formatDate(promo.endDate) }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-secondary flex-1">Редакт.</button>
          <button class="btn btn-sm btn-danger flex-1">Удалить</button>
        </div>
      </div>
    </div>

    <!-- Модал добавления -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Создать акцию</h3>
          <button @click="showAddModal = false" class="text-gray-500">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Название</label>
            <input v-model="newPromo.title" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Описание</label>
            <textarea v-model="newPromo.description" class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Скидка (%)</label>
            <input v-model.number="newPromo.discount" type="number" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Дата окончания</label>
            <input v-model="newPromo.endDate" type="date" class="form-input" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">Отмена</button>
          <button @click="addPromo" class="btn btn-primary">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockPromotions } from '@/mocks'

const showAddModal = ref(false)
const promotions = computed(() => mockPromotions)

const newPromo = ref({
  title: '',
  description: '',
  discount: 0,
  endDate: ''
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const addPromo = () => {
  alert('Акция создана!')
  showAddModal.value = false
}
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-4 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 12px; }
.text-3xl { font-size: 30px; }
.text-gray-900 { color: #111827; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.text-lg { font-size: 18px; }
.text-sm { font-size: 12px; }
.text-gray-600 { color: #4b5563; }
.text-gray-500 { color: #6b7280; }
.text-2xl { font-size: 24px; }
.text-blue-600 { color: #2563eb; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.flex-1 { flex: 1; }
.text-gray-500 { color: #6b7280; }
</style>
