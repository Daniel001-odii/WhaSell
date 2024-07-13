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

  /*
  {
    path: '/register',
    name: 'WhaSell - Register',
    component: RegisterView,
  }, 
  */

  /* AUTHENTICATION PAGES STARTS HERE ----- */
  {
    path: '/register',
    name: 'Whasell - Register type',
    component: RegistrationDecideView,
  },


  // http://localhost:8081/register/category?user-type=buyer
  {
    path: '/register/seller',
    name: 'Whasell - Register Seller',
    component: SellerRegistrationView,
  },
  // {
  //   path: '/register/category?user-type=seller',
  //   name: 'Whasell - Register Seller',
  //   component: SellerRegistrationView,
  // },
  // {
  //   path: '/register/category?user-type=buyer',
  //   name: 'Whasell - Register Seller',
  //   component: SellerRegistrationView,
  // },

  {
    path: '/register/buyer',
    name: 'Whasell - Register Buyer',
    component: UserRegistrationView,
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
        path: '/products/:product_id/:product_name',
        name: `Product`,
        component: ProductDetailView,
      },

      {
        path: '/shops/:name',
        name: `Shop`,
        component: ShopDetailView,
      },


      {path: 'likes', name: 'Your likes', component: LikesView},
      {path: '/products/new', name: 'New Product', component: NewProductView},
    ]
  },


  {
    path: '/account',
    component: AccountTemplateView,
    meta: { requiresAuth: true },
    children: [
      {path: '', name: `Account`, component: PersonalDetailsView},
      {path: 'shop/:is_open?', name: `My Shop`, component: ShopView},
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
});

let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route
const user_id = localStorage.getItem('user');

// Create a navigation guard that prevents loggedn in users from visiting irrelevant routes when logged in...
// this is ensured via the user roles present in the token...
router.beforeEach((to, from, next) => {

  // If the user is logged in and is trying to visit the root URL or login page
  if (user_id && to.path === '/' || user_id && to.path === '/login' || user_id && to.path === '/register') {
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
  // Check if the route has a "requiresAuth" meta field and matches the user's role
  if (to.meta.requiresAuth && !user_id) {
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route
    next('/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});

export default router
