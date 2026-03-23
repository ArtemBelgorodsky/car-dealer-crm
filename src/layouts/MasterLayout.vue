<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Хедер -->
    <AppHeader />
    
    <div class="flex flex-1 overflow-hidden">
      <!-- Боковая панель -->
      <aside class="w-64 bg-white border-r border-gray-200">
        <nav class="flex flex-col">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'px-6 py-3 border-l-4 transition',
              isActive(item.path)
                ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </aside>

      <!-- Основной контент -->
      <main class="flex-1 overflow-auto pb-24">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

const navItems = [
  { label: '📊 Панель управления', path: '/master/dashboard' },
  { label: '📅 Календарь записей', path: '/master/calendar' },
  { label: '📝 Заявки клиентов', path: '/master/requests' },
  { label: '📋 Заказ-наряды', path: '/master/work-orders' },
  { label: '✏️ Создать наряд', path: '/master/create-work-order' },
  { label: '👤 Мой профиль', path: '/master/profile' }
]

const isActive = (path: string) => {
  return route.path.startsWith(path)
}
</script>

<style scoped>
.h-screen { height: 100vh; }
.flex { display: flex; }
.w-64 { width: 16rem; }
.border-r { border-right: 1px solid; }
.border-gray-200 { border-color: #e5e7eb; }
.p-6 { padding: 24px; }
.flex-col { flex-direction: column; }
.px-6 { padding-left: 24px; padding-right: 24px; }
.py-3 { padding-top: 12px; padding-bottom: 12px; }
.border-l-4 { border-left-width: 4px; }
.border-blue-600 { border-color: #2563eb; }
.bg-blue-50 { background-color: #eff6ff; }
.text-blue-600 { color: #2563eb; }
.text-gray-600 { color: #4b5563; }
.hover\:bg-gray-50:hover { background-color: #f9fafb; }
.font-medium { font-weight: 500; }
.bg-white { background-color: #ffffff; }
.absolute { position: absolute; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.border-t { border-top: 1px solid; }
.text-sm { font-size: 12px; }
.text-gray-900 { color: #111827; }
.mb-2 { margin-bottom: 8px; }
.text-xs { font-size: 10px; }
.mb-4 { margin-bottom: 16px; }
.mt-2 { margin-top: 8px; }
.flex-1 { flex: 1; }
.overflow-auto { overflow: auto; }
.pb-24 { padding-bottom: 96px; }
</style>
