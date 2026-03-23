<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">Страница не найдена</p>
      <p class="text-gray-500 mb-8">Извините, страница, которую вы ищете, не существует.</p>
      <RouterLink to="/" class="btn btn-primary btn-lg">
        Вернуться на главную
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.text-6xl {
  font-size: 60px;
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

.text-gray-500 {
  color: #6b7280;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-8 {
  margin-bottom: 32px;
}
</style>
