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


import RegistrationDecideView from '@/views/Authentication/RegistrationDecideView.vue'
import UserRegistrationView from '@/views/Authentication/UserRegistrationView.vue'
import SellerRegistrationView from '@/views/Authentication/SellerRegistrationView.vue'

import PageNotFoundView from '@/views/PageNotFoundView.vue'


import CategoriesView from '@/views/CategoriesView.vue'

const routes = [
  {
    path: '/',
    name: 'WhaSell',
    component: LandingPageView,
    meta: { title: 'WhaSell' }
  },
  {
    path: '/login',
    name: 'WhaSell - Login',
    component: LoginView,
    meta: { title: 'WhaSell - Login' }
  },

  {
    path: '/register',
    name: 'Whasell - Register type',
    component: RegistrationDecideView,
    meta: { title: 'Whasell - Register type' }
  },

  {
    path: '/register/seller',
    name: 'Whasell - Register Seller',
    component: SellerRegistrationView,
    meta: { title: 'Whasell - Register Seller' }
  },

  {
    path: '/register/buyer',
    name: 'Whasell - Register Buyer',
    component: UserRegistrationView,
    meta: { title: 'Whasell - Register Buyer' }
  },

  {
    path: "/404", 
    name: "404",
    component: PageNotFoundView,
    meta: { title: '404 - Page Not Found' }
  },

  {
    path: "/:catchAll(.*)", 
    redirect: "/404"
  },

  {
    path: '/',
    component: TemplatePageView,
    children: [
      {
        path: 'shops',
        name: 'Shops',
        component: ShopListView,
        meta: { title: 'Shops' }
      },

      {
        path: '/categories',
        name: 'Categories',
        component: CategoriesView,
        meta: { title: 'Categories' }
      },

      {
        path: '/categories/:name/all',
        name: 'Sub categories',
        component: CategoriesView,
        meta: { title: 'Sub categories' }
      },

      {
        path: 'market',
        name: 'Market',
        component: MarketView,
        meta: { title: 'Market' }
      },
     
      {
        path: '/products/:product_id/:product_slug',
        name: 'Product',
        component: ProductDetailView,
        meta: { title: 'Product' }
      },

      {
        path: '/shops/:name',
        name: 'Shop',
        component: ShopDetailView,
        meta: { title: 'Shop' }
      },

      {
        path: 'likes',
        name: 'Your likes',
        component: LikesView,
        meta: { title: 'Your likes' }
      },
      {
        path: '/products/new',
        name: 'New Product',
        component: NewProductView,
        meta: { title: 'New Product' }
      },
    ]
  },

  {
    path: '/account',
    component: AccountTemplateView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Account',
        component: PersonalDetailsView,
        meta: { title: 'Account' }
      },
      {
        path: 'shop/:is_open?',
        name: 'My Shop',
        component: ShopView,
        meta: { title: 'My Shop' }
      },
      {
        path: 'analytics',
        name: 'My Insights',
        component: AnalyticsView,
        meta: { title: 'My Insights' }
      },
      {
        path: 'upgrade',
        name: 'My Subscription',
        component: UpgradeView,
        meta: { title: 'My Subscription' }
      },
      {
        path: 'notifications',
        name: 'My Notifications',
        component: NotificationsView,
        meta: { title: 'My Notifications' }
      },
      {
        path: 'delete',
        name: 'Danger zone',
        component: DangerZoneView,
        meta: { title: 'Danger zone' }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



// auto change page title...
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'WhaSell'; // Default title
  }
  next();
});



let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route




// Create a navigation guard that prevents loggedn in users from visiting irrelevant routes when logged in...
// this is ensured via the user roles present in the token...
router.beforeEach((to, from, next) => {
  const user_id = localStorage.getItem('user');
  // If the user is logged in and is trying to visit the root URL or login page
  if (user_id && to.path === '/' || user_id && to.path === '/login' || user_id && to.path === '/register' || user_id && to.path === '/register') {
    // Redirect users to /jobs
    next('/market')
  }
  else{
    // Otherwise, proceed with the navigation
    next()
  };

});



// navigation gaurd to allow only loggedin users to view certain pages..
router.beforeEach((to, from, next) => {
  const user_id = localStorage.getItem('user');
  // Check if the route has a "requiresAuth" meta field and matches the user's role
  if (to.meta.requiresAuth && !user_id) {
    // redirectToLogin = true; // Set the flag to true
    // requestedRoute = to.fullPath; // Store the requested route
    next('/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});


export default router
