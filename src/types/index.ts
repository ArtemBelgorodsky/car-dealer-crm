// Типы пользователей
export type UserRole = 'client' | 'master' | 'admin' | 'manager'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  createdAt: Date
}

// Типы автомобилей
export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  color: string
  mileage: number
  transmission: 'automatic' | 'manual'
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  engineVolume: number
  power: number
  seats: number
  image: string
  status: 'available' | 'reserved' | 'sold'
  description: string
  createdAt: Date
}

// Типы заявок
export type ServiceRequestStatus = 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled'

export interface ServiceRequest {
  id: string
  clientId: string
  carId?: string
  type: 'test_drive' | 'reserve' | 'maintenance' | 'repair'
  status: ServiceRequestStatus
  date: Date
  time: string
  notes: string
  createdAt: Date
}

// Типы гаража клиента
export interface ClientCar {
  id: string
  clientId: string
  carId?: string
  brand: string
  model: string
  year: number
  licensePlate: string
  mileage: number
  lastServiceDate?: Date
  nextServiceDate?: Date
}

// Типы заказ-нарядов
export type WorkOrderStatus = 'created' | 'approved' | 'in_progress' | 'ready' | 'completed' | 'cancelled'

export interface WorkOrder {
  id: string
  clientId: string
  clientCarId: string
  masterId?: string
  status: WorkOrderStatus
  createdDate: Date
  startDate?: Date
  completionDate?: Date
  description: string
  works: WorkItem[]
  parts: PartItem[]
  totalCost: number
  notes: string
}

export interface WorkItem {
  id: string
  name: string
  hours: number
  hourlyRate: number
  cost: number
  status: 'pending' | 'in_progress' | 'completed'
}

export interface PartItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  stock: number
}

// Типы прайс-листов
export interface PriceList {
  id: string
  name: string
  category: 'maintenance' | 'repair' | 'parts'
  items: PriceListItem[]
  createdAt: Date
}

export interface PriceListItem {
  id: string
  name: string
  price: number
  description?: string
}

// Типы акций и новостей
export interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  startDate: Date
  endDate: Date
  image: string
}

export interface News {
  id: string
  title: string
  content: string
  image: string
  publishedAt: Date
  author: string
}

// Аутентификация
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token?: string
}

// Статистика
export interface Statistics {
  totalCars: number
  totalClients: number
  totalRevenue: number
  completedOrders: number
  pendingOrders: number
}
