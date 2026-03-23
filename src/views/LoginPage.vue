<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">🚗 AutoDealer</h1>
          <p class="text-gray-600 mt-2">Вход в систему</p>
        </div>

        <!-- Форма входа -->
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-input"
              placeholder="example@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Пароль</label>
            <input
              v-model="password"
              type="password"
              class="form-input"
              placeholder="Введите пароль"
              required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-danger mb-4">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full mb-4"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Войти</span>
            <span v-else>Загрузка...</span>
          </button>
        </form>

        <!-- Демо данные -->
        <div class="border-t pt-6">
          <p class="text-sm text-gray-600 text-center mb-4">Демо-данные для тестирования:</p>
          <div class="space-y-2 text-sm">
            <div class="bg-blue-50 p-3 rounded">
              <p class="font-medium text-gray-900">Клиент:</p>
              <p class="text-gray-600">Email: client@example.com</p>
              <p class="text-gray-600">Пароль: любой</p>
            </div>
            <div class="bg-green-50 p-3 rounded">
              <p class="font-medium text-gray-900">Мастер-приёмник:</p>
              <p class="text-gray-600">Email: master@example.com</p>
              <p class="text-gray-600">Пароль: любой</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded">
              <p class="font-medium text-gray-900">Администратор:</p>
              <p class="text-gray-600">Email: admin@example.com</p>
              <p class="text-gray-600">Пароль: любой</p>
            </div>
          </div>
        </div>

        <!-- Ссылка на главную -->
        <div class="text-center mt-6">
          <RouterLink to="/" class="text-blue-600 hover:text-blue-700">
            Вернуться на главную
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('client@example.com')
const password = ref('password')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const success = authStore.login(email.value, password.value)
    
    if (success) {
      // Редирект в зависимости от роли пользователя
      const user = authStore.user
      if (user) {
        switch (user.role) {
          case 'client':
            router.push('/client/dashboard')
            break
          case 'master':
            router.push('/master/dashboard')
            break
          case 'admin':
            router.push('/admin/dashboard')
            break
        }
      }
    } else {
      errorMessage.value = 'Неверное имя пользователя или пароль'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-to: rgb(239 246 255 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-indigo-100 {
  --tw-gradient-to: #e0e7ff;
}

.max-w-md {
  max-width: 28rem;
}

.w-full {
  width: 100%;
}

.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.bg-yellow-50 {
  background-color: #fefce8;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-600 {
  color: #4b5563;
}

.text-blue-600 {
  color: #2563eb;
}

.hover\:text-blue-700:hover {
  color: #1d4ed8;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

.p-3 {
  padding: 12px;
}

.rounded {
  border-radius: var(--radius);
}

.border-t {
  border-top: 1px solid;
}

.pt-6 {
  padding-top: 24px;
}

.mt-6 {
  margin-top: 24px;
}

.w-full {
  width: 100%;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
