import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Car } from '@/types'
import { mockCars } from '@/mocks'

export const useCarsStore = defineStore('cars', () => {
  const cars = ref<Car[]>(mockCars)
  const filter = ref<{
    brand?: string
    priceMin?: number
    priceMax?: number
    fuelType?: string
  }>({})

  const filteredCars = computed(() => {
    return cars.value.filter(car => {
      if (filter.value.brand && car.brand !== filter.value.brand) return false
      if (filter.value.priceMin && car.price < filter.value.priceMin) return false
      if (filter.value.priceMax && car.price > filter.value.priceMax) return false
      if (filter.value.fuelType && car.fuelType !== filter.value.fuelType) return false
      return true
    })
  })

  const availableCars = computed(() => 
    cars.value.filter(car => car.status === 'available')
  )

  const brands = computed(() => 
    Array.from(new Set(cars.value.map(car => car.brand)))
  )

  const getCar = (id: string) => 
    cars.value.find(car => car.id === id)

  const setFilter = (newFilter: typeof filter.value) => {
    filter.value = newFilter
  }

  const clearFilter = () => {
    filter.value = {}
  }

  const addCar = (car: Car) => {
    cars.value.push(car)
  }

  const updateCar = (id: string, updates: Partial<Car>) => {
    const car = cars.value.find(c => c.id === id)
    if (car) {
      Object.assign(car, updates)
    }
  }

  const removeCar = (id: string) => {
    const index = cars.value.findIndex(c => c.id === id)
    if (index > -1) {
      cars.value.splice(index, 1)
    }
  }

  return {
    cars,
    filter,
    filteredCars,
    availableCars,
    brands,
    getCar,
    setFilter,
    clearFilter,
    addCar,
    updateCar,
    removeCar
  }
})
