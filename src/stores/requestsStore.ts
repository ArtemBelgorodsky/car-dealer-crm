import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ServiceRequest, ServiceRequestStatus } from '@/types'
import { mockRequests } from '@/mocks'

export const useRequestsStore = defineStore('requests', () => {
  const requests = ref<ServiceRequest[]>(mockRequests)

  const pendingRequests = computed(() => 
    requests.value.filter(r => r.status === 'pending')
  )

  const approvedRequests = computed(() => 
    requests.value.filter(r => r.status === 'approved')
  )

  const completedRequests = computed(() => 
    requests.value.filter(r => r.status === 'completed')
  )

  const getRequestsByClient = (clientId: string) =>
    requests.value.filter(r => r.clientId === clientId)

  const getRequest = (id: string) =>
    requests.value.find(r => r.id === id)

  const addRequest = (request: ServiceRequest) => {
    requests.value.push(request)
  }

  const updateRequest = (id: string, updates: Partial<ServiceRequest>) => {
    const request = requests.value.find(r => r.id === id)
    if (request) {
      Object.assign(request, updates)
    }
  }

  const updateRequestStatus = (id: string, status: ServiceRequestStatus) => {
    const request = requests.value.find(r => r.id === id)
    if (request) {
      request.status = status
    }
  }

  const deleteRequest = (id: string) => {
    const index = requests.value.findIndex(r => r.id === id)
    if (index > -1) {
      requests.value.splice(index, 1)
    }
  }

  return {
    requests,
    pendingRequests,
    approvedRequests,
    completedRequests,
    getRequestsByClient,
    getRequest,
    addRequest,
    updateRequest,
    updateRequestStatus,
    deleteRequest
  }
})
