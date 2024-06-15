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


import ShopDetailView from '@/views/ShopDetailView.vue'

import AccountTemplateView from '@/views/AccountTemplateView.vue'
import PersonalDetailsView from '@/views/PersonalDetailsView.vue'
import ShopView from '@/views/ShopView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import UpgradeView from '@/views/UpgradeView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import DangerZoneView from '@/views/DangerZoneView.vue'


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

      {
        path: '/shop/:name',
        name: `Shop`,
        component: ShopDetailView,
      },


      {path: 'likes', name: 'Your likes', component: LikesView},
      {path: 'new-product', name: 'New Product', component: NewProductView},
    ]
  },


  {
    path: '/account',
    component: AccountTemplateView,
    children: [
      {path: '', name: `Account`, component: PersonalDetailsView},
      {path: 'shop', name: `My Shop`, component: ShopView},
      {path: 'analytics', name: `My Insights`, component: AnalyticsView},
      {path: 'upgrade', name: `My Subscription`, component: UpgradeView},
      {path: 'notifications', name: `My Notifications`, component: NotificationsView},
      {path: 'delete', name: `Danger zone`, component: DangerZoneView},
    ]
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
