import type { User, Car, ServiceRequest, ClientCar, WorkOrder, WorkItem, PartItem, Promotion, News } from '@/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'client@example.com',
    phone: '+7 (999) 123-45-67',
    role: 'client',
    createdAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Александр Сидоров',
    email: 'master@example.com',
    phone: '+7 (999) 234-56-78',
    role: 'master',
    createdAt: new Date('2025-02-20')
  },
  {
    id: '3',
    name: 'Ольга Иванова',
    email: 'admin@example.com',
    phone: '+7 (999) 345-67-89',
    role: 'admin',
    createdAt: new Date('2025-01-01')
  }
]

export const mockCars: Car[] = [
  {
    id: 'car1',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    price: 7500000,
    color: 'Чёрный',
    mileage: 100,
    transmission: 'automatic',
    fuelType: 'petrol',
    engineVolume: 3.0,
    power: 340,
    seats: 5,
    image: '/bmw.jpg',
    status: 'available',
    description: 'Премиальный внедорожник с полным приводом и современными технологиями',
    createdAt: new Date('2026-01-15')
  },
  {
    id: 'car2',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 5000000,
    color: 'Серебристый',
    mileage: 200,
    transmission: 'automatic',
    fuelType: 'petrol',
    engineVolume: 2.0,
    power: 258,
    seats: 5,
    image: '/meren.jpg',
    status: 'available',
    description: 'Спортивный седан с инновационной системой безопасности',
    createdAt: new Date('2026-01-10')
  },
  {
    id: 'car3',
    brand: 'Audi',
    model: 'A6',
    year: 2022,
    price: 4500000,
    color: 'Белый',
    mileage: 15000,
    transmission: 'automatic',
    fuelType: 'diesel',
    engineVolume: 3.0,
    power: 286,
    seats: 5,
    image: '/audi.webp',
    status: 'available',
    description: 'Люксовый седан с отличной динамикой и комфортом',
    createdAt: new Date('2026-12-01')
  },
  {
    id: 'car4',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 2800000,
    color: 'Синий',
    mileage: 500,
    transmission: 'automatic',
    fuelType: 'hybrid',
    engineVolume: 2.5,
    power: 203,
    seats: 5,
    image: '/toyota.jpg',
    status: 'available',
    description: 'Надёжный седан с гибридной технологией и экономичностью',
    createdAt: new Date('2026-02-01')
  },
  {
    id: 'car5',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2023,
    price: 2200000,
    color: 'Красный',
    mileage: 1000,
    transmission: 'manual',
    fuelType: 'petrol',
    engineVolume: 1.5,
    power: 130,
    seats: 5,
    image: '/wol.jpg',
    status: 'reserved',
    description: 'Компактный хэтчбек для городских условий',
    createdAt: new Date('2026-01-20')
  },
  {
    id: 'car6',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 4800000,
    color: 'Чёрный',
    mileage: 50,
    transmission: 'automatic',
    fuelType: 'electric',
    engineVolume: 0,
    power: 329,
    seats: 5,
    image: '/tesla.jpg',
    status: 'available',
    description: 'Электромобиль с передовыми технологиями и автопилотом',
    createdAt: new Date('2026-02-10')
  }
]

export const mockRequests: ServiceRequest[] = [
  {
    id: 'req1',
    clientId: '1',
    carId: 'car1',
    type: 'test_drive',
    status: 'approved',
    date: new Date('2024-03-25'),
    time: '14:00',
    notes: 'Тест-драйв BMW X5',
    createdAt: new Date('2026-03-20')
  },
  {
    id: 'req2',
    clientId: '1',
    carId: 'car2',
    type: 'reserve',
    status: 'pending',
    date: new Date('2024-03-26'),
    time: '10:00',
    notes: 'Резервирование Mercedes-Benz C-Class',
    createdAt: new Date('2026-03-21')
  },
  {
    id: 'req3',
    clientId: '1',
    type: 'maintenance',
    status: 'approved',
    date: new Date('2024-03-27'),
    time: '11:00',
    notes: 'Техническое обслуживание автомобиля',
    createdAt: new Date('2026-03-22')
  }
]

export const mockClientCars: ClientCar[] = [
  {
    id: 'cc1',
    clientId: '1',
    brand: 'BMW',
    model: 'X3',
    year: 2020,
    licensePlate: 'А123БВ77',
    mileage: 45000,
    lastServiceDate: new Date('2025-02-15'),
    nextServiceDate: new Date('2026-08-15')
  },
  {
    id: 'cc2',
    clientId: '1',
    brand: 'Audi',
    model: 'A4',
    year: 2021,
    licensePlate: 'А456БВ77',
    mileage: 32000,
    lastServiceDate: new Date('2025-01-20'),
    nextServiceDate: new Date('2026-07-20')
  }
]

export const mockWorkItems: WorkItem[] = [
  {
    id: 'wi1',
    name: 'Замена масла и фильтра',
    hours: 0.5,
    hourlyRate: 500,
    cost: 250,
    status: 'completed'
  },
  {
    id: 'wi2',
    name: 'Диагностика двигателя',
    hours: 1,
    hourlyRate: 1000,
    cost: 1000,
    status: 'in_progress'
  },
  {
    id: 'wi3',
    name: 'Замена воздушного фильтра',
    hours: 0.25,
    hourlyRate: 500,
    cost: 125,
    status: 'pending'
  }
]

export const mockPartItems: PartItem[] = [
  {
    id: 'p1',
    name: 'Масло моторное Shell 5W-40',
    quantity: 4,
    unitPrice: 600,
    totalPrice: 2400,
    stock: 15
  },
  {
    id: 'p2',
    name: 'Воздушный фильтр BMW',
    quantity: 1,
    unitPrice: 800,
    totalPrice: 800,
    stock: 8
  }
]

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'wo1',
    clientId: '1',
    clientCarId: 'cc1',
    masterId: '2',
    status: 'completed',
    createdDate: new Date('2025-02-15'),
    startDate: new Date('2025-02-16'),
    completionDate: new Date('2025-02-17'),
    description: 'Плановое техническое обслуживание',
    works: mockWorkItems,
    parts: mockPartItems,
    totalCost: 4575,
    notes: 'Работы выполнены в срок'
  },
  {
    id: 'wo2',
    clientId: '1',
    clientCarId: 'cc2',
    masterId: '2',
    status: 'in_progress',
    createdDate: new Date('2025-03-20'),
    startDate: new Date('2025-03-21'),
    description: 'Ремонт подвески',
    works: [
      {
        id: 'wi4',
        name: 'Замена стоек стабилизатора',
        hours: 2,
        hourlyRate: 1200,
        cost: 2400,
        status: 'in_progress'
      }
    ],
    parts: [
      {
        id: 'p3',
        name: 'Стойки стабилизатора Audi',
        quantity: 2,
        unitPrice: 3500,
        totalPrice: 7000,
        stock: 5
      }
    ],
    totalCost: 9400,
    notes: 'Ремонт в процессе выполнения'
  }
]

export const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: 'Техническое обслуживание со скидкой 15%',
    description: 'Специальное предложение на все услуги по ТО',
    discount: 15,
    startDate: new Date('2025-03-01'),
    endDate: new Date('2026-03-31'),
    image: 'https://via.placeholder.com/600x300?text=Promotion+1'
  },
  {
    id: 'promo2',
    title: 'Бесплатная диагностика',
    description: 'Проверьте ваш автомобиль абсолютно бесплатно',
    discount: 100,
    startDate: new Date('2025-03-15'),
    endDate: new Date('2026-04-15'),
    image: 'https://via.placeholder.com/600x300?text=Promotion+2'
  }
]

export const mockNews: News[] = [
  {
    id: 'news1',
    title: 'Поступила новая партия BMW X7',
    content: 'В наш автосалон поступила партия люксовых внедорожников BMW X7 2024 года выпуска',
    image: 'https://via.placeholder.com/600x400?text=News+1',
    publishedAt: new Date('2026-03-20'),
    author: 'Ольга Иванова'
  },
  {
    id: 'news2',
    title: 'Открытие новой сервисной станции',
    content: 'Мы рады сообщить об открытии новой сервисной станции с современным оборудованием',
    image: 'https://via.placeholder.com/600x400?text=News+2',
    publishedAt: new Date('2026-03-18'),
    author: 'Ольга Иванова'
  },
  {
    id: 'news3',
    title: 'Специалисты прошли обучение на новом оборудовании',
    content: 'Наша команда механиков прошла специализированное обучение на диагностическом оборудовании',
    image: 'https://via.placeholder.com/600x400?text=News+3',
    publishedAt: new Date('2026-03-15'),
    author: 'Ольга Иванова'
  }
]
