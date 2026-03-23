import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/client',
    name: 'client-layout',
    component: () => import('@/layouts/ClientLayout.vue'),
    meta: { requiresAuth: true, roles: ['client'] },
    children: [
      {
        path: 'dashboard',
        name: 'client-dashboard',
        component: () => import('@/views/client/DashboardPage.vue')
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: () => import('@/views/client/CatalogPage.vue')
      },
      {
        path: 'car/:id',
        name: 'car-detail',
        component: () => import('@/views/client/CarDetailPage.vue')
      },
      {
        path: 'garage',
        name: 'garage',
        component: () => import('@/views/client/GaragePage.vue')
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/client/ServicePage.vue')
      },
      {
        path: 'booking',
        name: 'booking',
        component: () => import('@/views/client/BookingPage.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/client/HistoryPage.vue')
      },
      {
        path: 'profile',
        name: 'client-profile',
        component: () => import('@/views/client/ProfilePage.vue')
      }
    ]
  },
  {
    path: '/master',
    name: 'master-layout',
    component: () => import('@/layouts/MasterLayout.vue'),
    meta: { requiresAuth: true, roles: ['master'] },
    children: [
      {
        path: 'dashboard',
        name: 'master-dashboard',
        component: () => import('@/views/master/DashboardPage.vue')
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('@/views/master/CalendarPage.vue')
      },
      {
        path: 'requests',
        name: 'requests',
        component: () => import('@/views/master/RequestsPage.vue')
      },
      {
        path: 'work-orders',
        name: 'work-orders',
        component: () => import('@/views/master/WorkOrdersPage.vue')
      },
      {
        path: 'work-order/:id',
        name: 'work-order-detail',
        component: () => import('@/views/master/WorkOrderDetailPage.vue')
      },
      {
        path: 'create-work-order',
        name: 'create-work-order',
        component: () => import('@/views/master/CreateWorkOrderPage.vue')
      },
      {
        path: 'profile',
        name: 'master-profile',
        component: () => import('@/views/master/ProfilePage.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin-layout',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/DashboardPage.vue')
      },
      {
        path: 'cars',
        name: 'manage-cars',
        component: () => import('@/views/admin/CarsPage.vue')
      },
      {
        path: 'users',
        name: 'manage-users',
        component: () => import('@/views/admin/UsersPage.vue')
      },
      {
        path: 'requests',
        name: 'manage-requests',
        component: () => import('@/views/admin/RequestsPage.vue')
      },
      {
        path: 'work-orders',
        name: 'manage-work-orders',
        component: () => import('@/views/admin/WorkOrdersPage.vue')
      },
      {
        path: 'promotions',
        name: 'promotions',
        component: () => import('@/views/admin/PromotionsPage.vue')
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/admin/NewsPage.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/admin/StatisticsPage.vue')
      },
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('@/views/admin/ProfilePage.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.roles && authStore.user) {
    const allowedRoles = to.meta.roles as string[]
    if (allowedRoles.includes(authStore.user.role)) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
