import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ClientCar } from '@/types'
import { mockClientCars } from '@/mocks'

export const useGarageStore = defineStore('garage', () => {
  const clientCars = ref<ClientCar[]>(mockClientCars)

  const getClientCars = (clientId: string) =>
    clientCars.value.filter(car => car.clientId === clientId)

  const getCar = (id: string) =>
    clientCars.value.find(car => car.id === id)

  const addCar = (car: ClientCar) => {
    clientCars.value.push(car)
  }

  const updateCar = (id: string, updates: Partial<ClientCar>) => {
    const car = clientCars.value.find(c => c.id === id)
    if (car) {
      Object.assign(car, updates)
    }
  }

  const removeCar = (id: string) => {
    const index = clientCars.value.findIndex(c => c.id === id)
    if (index > -1) {
      clientCars.value.splice(index, 1)
    }
  }

  const updateServiceDate = (id: string, nextDate: Date) => {
    const car = clientCars.value.find(c => c.id === id)
    if (car) {
      car.lastServiceDate = new Date()
      car.nextServiceDate = nextDate
    }
  }

  return {
    clientCars,
    getClientCars,
    getCar,
    addCar,
    updateCar,
    removeCar,
    updateServiceDate
  }
})
