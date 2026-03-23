<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Управление пользователями</h1>
      <button @click="showAddModal = true" class="btn btn-primary">+ Добавить пользователя</button>
    </div>

    <div class="card overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Дата создания</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id">
            <td class="font-medium">{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <span class="badge badge-info">{{ getUserRole(user.role) }}</span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>
              <button class="btn btn-sm btn-secondary">Редакт.</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модал добавления -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3 class="text-xl font-bold">Добавить пользователя</h3>
          <button @click="showAddModal = false" class="text-gray-500">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">ФИО</label>
            <input v-model="newUser.name" type="text" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="newUser.email" type="email" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Телефон</label>
            <input v-model="newUser.phone" type="tel" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Роль</label>
            <select v-model="newUser.role" class="form-select">
              <option value="client">Клиент</option>
              <option value="master">Мастер-приёмник</option>
              <option value="manager">Менеджер</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showAddModal = false" class="btn btn-secondary">Отмена</button>
          <button @click="addUser" class="btn btn-primary">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockUsers } from '@/mocks'

const showAddModal = ref(false)
const newUser = ref({
  name: '',
  email: '',
  phone: '',
  role: 'client'
})

const allUsers = computed(() => mockUsers)

const getUserRole = (role: string) => {
  const roles: Record<string, string> = {
    client: 'Клиент',
    master: 'Мастер-приёмник',
    admin: 'Администратор',
    manager: 'Менеджер'
  }
  return roles[role] || role
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date))
}

const addUser = () => {
  alert('Пользователь добавлен!')
  showAddModal.value = false
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
.text-gray-500 { color: #6b7280; }
.text-xl { font-size: 20px; }
</style>
