<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Навигация -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="container flex items-center justify-between py-4">
        <RouterLink to="/" class="text-2xl font-bold text-blue-600">
          🚗 AutoDealer
        </RouterLink>
        <div class="nav">
          <RouterLink to="/" class="nav-link active">Главная</RouterLink>
          <RouterLink to="/login?role=client" class="nav-link">Каталог</RouterLink>
          <RouterLink to="/login?role=client" class="nav-link">Сервис</RouterLink>
          <RouterLink to="/login" class="btn btn-primary">Вход</RouterLink>
        </div>
      </div>
    </nav>

    <!-- Герой секция -->
    <section class="py-20">
      <div class="container text-center">
        <h1 class="text-5xl font-bold mb-6 text-gray-900">
          Добро пожаловать в AutoDealer
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ваш надёжный партнёр в выборе автомобиля и обслуживании. 
          Премиальные автомобили и профессиональный сервис в одном месте.
        </p>
        <div class="flex gap-4 justify-center">
          <RouterLink to="/login?role=client" class="btn btn-primary btn-lg">
            Открыть каталог
          </RouterLink>
          <RouterLink to="/login?role=client" class="btn btn-secondary btn-lg">
            Записаться на сервис
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Преимущества -->
    <section class="py-16 bg-gray-50">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
        <div class="grid grid-3">
          <div class="card">
            <div class="text-4xl mb-4">🚙</div>
            <h3 class="text-xl font-semibold mb-4">Большой выбор</h3>
            <p class="text-gray-600">
              Более 100 автомобилей ведущих мировых брендов в наличии и под заказ
            </p>
          </div>
          <div class="card">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="text-xl font-semibold mb-4">Профессиональный сервис</h3>
            <p class="text-gray-600">
              Опытные мастера, современное оборудование и оригинальные запчасти
            </p>
          </div>
          <div class="card">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-xl font-semibold mb-4">Гарантия качества</h3>
            <p class="text-gray-600">
              Гарантия на все автомобили и работы сервисного центра до 5 лет
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Популярные автомобили -->
    <section class="py-16">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">Популярные автомобили</h2>
        <div class="grid grid-3">
          <div v-for="car in topCars" :key="car.id" class="card card-hover">
            <div class="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span class="text-gray-400">Изображение</span>
            </div>
            <h4 class="text-lg font-semibold mb-2">{{ car.brand }} {{ car.model }}</h4>
            <p class="text-gray-600 text-sm mb-4">{{ car.year }} год выпуска</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-blue-600">
                {{ formatPrice(car.price) }}
              </span>
              <RouterLink 
                :to="`/login?role=client&car=${car.id}`"
                class="btn btn-sm btn-primary"
              >
                Подробнее
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Акции -->
    <section class="py-16 bg-blue-50">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">Текущие акции</h2>
        <div class="grid grid-2">
          <div class="card border-2 border-blue-300">
            <h3 class="text-2xl font-bold text-blue-600 mb-4">-15% на техническое обслуживание</h3>
            <p class="text-gray-600 mb-6">
              Специальное предложение на все услуги по ТО и диагностике
            </p>
            <p class="text-sm text-gray-500">Акция действует до 31 марта 2024</p>
          </div>
          <div class="card border-2 border-green-300">
            <h3 class="text-2xl font-bold text-green-600 mb-4">Бесплатная диагностика</h3>
            <p class="text-gray-600 mb-6">
              Проверьте техническое состояние вашего автомобиля абсолютно бесплатно
            </p>
            <p class="text-sm text-gray-500">Акция действует до 15 апреля 2024</p>
          </div>
        </div>
      </div>
    </section>

    <!-- О нас -->
    <section class="py-16">
      <div class="container">
        <div class="grid grid-2 items-center gap-12">
          <div>
            <h2 class="text-3xl font-bold mb-6">О компании AutoDealer</h2>
            <p class="text-gray-600 mb-4">
              С 2015 года мы являемся надёжным партнёром для тысяч клиентов в области продажи и сервиса автомобилей.
            </p>
            <p class="text-gray-600 mb-4">
              Наша компания предоставляет полный спектр услуг: от подбора идеального автомобиля до его обслуживания и ремонта.
            </p>
            <p class="text-gray-600">
              Мы гордимся нашей репутацией честности, профессионализма и высокого качества обслуживания.
            </p>
          </div>
          <div class="grid grid-2 gap-6">
            <div class="card text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p class="text-gray-600">Довольных клиентов</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">8</div>
              <p class="text-gray-600">Лет на рынке</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <p class="text-gray-600">Автомобилей</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p class="text-gray-600">Поддержка</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Контакты -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container">
        <h2 class="text-3xl font-bold text-center mb-12">Свяжитесь с нами</h2>
        <div class="grid grid-3">
          <div class="text-center">
            <div class="text-3xl mb-4">📍</div>
            <h4 class="font-semibold mb-2">Адрес</h4>
            <p class="text-gray-300">
              ул. Автомобильная, дом 1<br>
              Москва, 115000
            </p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-4">📞</div>
            <h4 class="font-semibold mb-2">Телефон</h4>
            <p class="text-gray-300">
              +7 (999) 123-45-67<br>
              +7 (999) 234-56-78
            </p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-4">✉️</div>
            <h4 class="font-semibold mb-2">Email</h4>
            <p class="text-gray-300">
              info@autodealer.ru<br>
              support@autodealer.ru
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Футер -->
    <footer class="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
      <div class="container text-center">
        <p>&copy; 2024 AutoDealer. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCarsStore } from '@/stores/carsStore'
import { computed } from 'vue'

const carsStore = useCarsStore()

const topCars = computed(() => carsStore.cars.slice(0, 3))

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price)
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}

.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-to: rgb(239 246 255 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-white {
  --tw-gradient-to: #ffffff;
}

.sticky {
  position: sticky;
}

.top-0 {
  top: 0;
}

.z-50 {
  z-index: 50;
}

.py-20 {
  padding-top: 80px;
  padding-bottom: 80px;
}

.py-16 {
  padding-top: 64px;
  padding-bottom: 64px;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-gray-900 {
  background-color: #111827;
}

.bg-gray-950 {
  background-color: #030712;
}

.text-white {
  color: #ffffff;
}

.text-5xl {
  font-size: 48px;
}

.text-3xl {
  font-size: 30px;
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

.border-2 {
  border-width: 2px;
}

.border-blue-300 {
  border-color: #93c5fd;
}

.border-green-300 {
  border-color: #86efac;
}

.border-t {
  border-top: 1px solid;
}

.border-gray-800 {
  border-color: #1f2937;
}

.text-blue-600 {
  color: #2563eb;
}

.text-green-600 {
  color: #16a34a;
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

.text-gray-300 {
  color: #d1d5db;
}

.text-gray-500 {
  color: #6b7280;
}

.max-w-2xl {
  max-width: 42rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.h-48 {
  height: 12rem;
}

.min-h-screen {
  min-height: 100vh;
}

.gap-12 {
  gap: 48px;
}

.gap-6 {
  gap: 24px;
}
</style>
