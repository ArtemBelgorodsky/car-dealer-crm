import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Car } from '@/types'
import { mockCars } from '@/mocks'

const CARS_STORAGE_KEY = 'car-dealer-crm:cars'

const loadCars = (): Car[] => {
  const storedCars = localStorage.getItem(CARS_STORAGE_KEY)

  if (!storedCars) {
    return [...mockCars]
  }

  try {
    const parsedCars = JSON.parse(storedCars) as Array<Omit<Car, 'createdAt'> & { createdAt: string }>
    return parsedCars.map(car => ({
      ...car,
      createdAt: new Date(car.createdAt)
    }))
  } catch {
    return [...mockCars]
  }
}

export const useCarsStore = defineStore('cars', () => {
  const cars = ref<Car[]>(loadCars())
  const filter = ref<{
    brand?: string
    priceMin?: number
    priceMax?: number
    fuelType?: string
  }>({})

  watch(
    cars,
    newCars => {
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(newCars))
    },
    { deep: true }
  )

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
