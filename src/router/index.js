import { createRouter, createWebHistory } from 'vue-router'


import LandingPageView from '@/views/LandingPageView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import MarketView from '@/views/MarketView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'


const routes = [
  {
    path: '/',
    name: 'WhaSell',
    component: LandingPageView,
  },
  {
    path: '/login',
    name: 'WhaSell - Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'WhaSell - Register',
    component: RegisterView,
  },

  {
    path: '/market',
    name: 'WhaSell - Market',
    component: MarketView,
  },

  {
    path: '/product/:name',
    name: `WhaSell - product`,
    component: ProductDetailView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
