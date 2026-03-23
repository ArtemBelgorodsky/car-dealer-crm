<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="text-2xl font-bold text-blue-600">
          🚗 AutoDealer
        </RouterLink>
        <span v-if="roleLabel" class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {{ roleLabel }}
        </span>
      </div>
      
      <div class="flex items-center gap-4">
        <div v-if="user" class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span class="text-blue-600 font-medium">{{ userInitials }}</span>
          </div>
        </div>
        
        <button
          @click="handleLogout"
          class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  const names = user.value.name.split(' ')
  return names.map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const roleLabel = computed(() => {
  if (!user.value?.role) return ''
  const labels: Record<string, string> = {
    admin: 'Администратор',
    client: 'Клиент',
    master: 'Мастер-приёмник',
    manager: 'Менеджер'
  }
  return labels[user.value.role] || user.value.role
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
