<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Календарь записей</h1>

    <div class="grid grid-2 gap-8">
      <!-- Календарь -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-4">Выберите дату</h3>
        <div class="bg-gray-100 p-4 rounded text-center">
          <input v-model="selectedDate" type="date" class="form-input" />
        </div>
        
        <div class="mt-6">
          <h4 class="font-semibold mb-4">Загрузка боксов на {{ selectedDate }}</h4>
          <div class="space-y-2">
            <div v-for="box in boxes" :key="box.id" class="flex items-center justify-between p-3 border rounded">
              <span>{{ box.name }}</span>
              <div class="flex items-center gap-2">
                <div class="text-sm text-gray-600">
                  {{ box.occupiedHours }}/{{ box.totalHours }}ч
                </div>
                <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-blue-600" 
                    :style="{ width: (box.occupiedHours / box.totalHours * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Расписание -->
      <div class="card">
        <h3 class="text-xl font-semibold mb-4">Расписание на {{ selectedDate }}</h3>
        <div class="space-y-2">
          <div v-for="time in timeSlots" :key="time" class="p-3 border rounded hover:bg-blue-50 cursor-pointer">
            <div class="font-medium">{{ time }}</div>
            <div class="text-sm text-gray-600">Бокс 1 - Техническое обслуживание</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])

const boxes = [
  { id: '1', name: 'Бокс 1', occupiedHours: 6, totalHours: 8 },
  { id: '2', name: 'Бокс 2', occupiedHours: 8, totalHours: 8 },
  { id: '3', name: 'Бокс 3', occupiedHours: 3, totalHours: 8 },
  { id: '4', name: 'Бокс 4', occupiedHours: 5, totalHours: 8 }
]

const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '17:00']
</script>

<style scoped>
.p-8 { padding: 32px; }
.mb-8 { margin-bottom: 32px; }
.mb-4 { margin-bottom: 16px; }
.mt-6 { margin-top: 24px; }
.mt-4 { margin-top: 16px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
.space-y-2 > * + * { margin-top: 8px; }
.text-3xl { font-size: 30px; }
.text-xl { font-size: 20px; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.text-gray-600 { color: #4b5563; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-blue-50 { background-color: #eff6ff; }
.p-4 { padding: 16px; }
.p-3 { padding: 12px; }
.rounded { border-radius: var(--radius); }
.border { border: 1px solid var(--border); }
.h-2 { height: 8px; }
.w-24 { width: 6rem; }
.bg-gray-200 { background-color: #e5e7eb; }
.bg-blue-600 { background-color: #2563eb; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.cursor-pointer { cursor: pointer; }
.hover\:bg-blue-50:hover { background-color: #eff6ff; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
</style>
