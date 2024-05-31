import { createRouter, createWebHistory } from 'vue-router'


import LandingPageView from '@/views/LandingPageView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

import MarketView from '@/views/MarketView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

import ShopListView from '@/views/ShopListView.vue'
import LikesView from '@/views/LikesView.vue'
import NewProductView from '@/views/NewProductView.vue'

import TemplatePageView from '@/views/TemplatePageView.vue'


import AccountTemplateView from '@/views/AccountTemplateView.vue'
import PersonalDetailsView from '@/views/PersonalDetailsView.vue'

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
    path: '/',
    component: TemplatePageView,
    children: [
      {
        path: 'shops',
        name: `Shops`,
        component: ShopListView,
      },
      {
        path: 'market',
        name: 'Market',
        component: MarketView,
      },
     
      {
        path: '/product/:name',
        name: `Product`,
        component: ProductDetailView,
      },
      {path: 'likes', name: 'Your likes', component: LikesView},
      {path: 'new-product', name: 'New Product', component: NewProductView},
    ]
  },


  {
    path: '/account',
    component: AccountTemplateView,
    children: [
      {path: 'profile', name: `Profile`, component: PersonalDetailsView},
    ]
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
