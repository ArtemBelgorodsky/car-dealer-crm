import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WorkOrder, WorkOrderStatus } from '@/types'
import { mockWorkOrders } from '@/mocks'

export const useWorkOrdersStore = defineStore('workOrders', () => {
  const workOrders = ref<WorkOrder[]>(mockWorkOrders)

  const inProgressOrders = computed(() => 
    workOrders.value.filter(o => o.status === 'in_progress')
  )

  const completedOrders = computed(() => 
    workOrders.value.filter(o => o.status === 'completed')
  )

  const pendingApproval = computed(() => 
    workOrders.value.filter(o => o.status === 'created' || o.status === 'approved')
  )

  const getOrdersByClient = (clientId: string) =>
    workOrders.value.filter(o => o.clientId === clientId)

  const getOrdersByMaster = (masterId: string) =>
    workOrders.value.filter(o => o.masterId === masterId)

  const getOrder = (id: string) =>
    workOrders.value.find(o => o.id === id)

  const addOrder = (order: WorkOrder) => {
    workOrders.value.push(order)
  }

  const updateOrder = (id: string, updates: Partial<WorkOrder>) => {
    const order = workOrders.value.find(o => o.id === id)
    if (order) {
      Object.assign(order, updates)
    }
  }

  const updateOrderStatus = (id: string, status: WorkOrderStatus) => {
    const order = workOrders.value.find(o => o.id === id)
    if (order) {
      order.status = status
    }
  }

  const assignMaster = (orderId: string, masterId: string) => {
    const order = workOrders.value.find(o => o.id === orderId)
    if (order) {
      order.masterId = masterId
    }
  }

  const deleteOrder = (id: string) => {
    const index = workOrders.value.findIndex(o => o.id === id)
    if (index > -1) {
      workOrders.value.splice(index, 1)
    }
  }

  return {
    workOrders,
    inProgressOrders,
    completedOrders,
    pendingApproval,
    getOrdersByClient,
    getOrdersByMaster,
    getOrder,
    addOrder,
    updateOrder,
    updateOrderStatus,
    assignMaster,
    deleteOrder
  }
})
