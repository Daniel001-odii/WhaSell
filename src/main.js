import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import router from './router';
import store from './store'
import './registerServiceWorker'
import './assets/css/style.css'

// standalone Toast plugin
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-bootstrap.css';



// BOOTSTRAP ICONS
import 'bootstrap-icons/font/bootstrap-icons.css';

// CONFIGURE AXIOS
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL





// Import PrimeVue CSS
import 'primevue/resources/themes/nova/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// import './assets/css/custom-toast.css'
// Import the PrimeVue Toast component CSS
// import 'primevue/toast/toast.css';


/* 
    SETUP VUE FOR SSR
*/
import { createSSRApp } from 'vue';
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import { createHead } from '@unhead/vue';
import routes from './router/index';

/* export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter({
    //   history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
      history: createWebHistory(),
      routes,
    });
    const meta = createHead();
  
    app.use(router);
    app.use(meta);
  
    return { app, router, meta };
}
 */

const app = createSSRApp(App);
const meta = createHead();
app.use(meta);

// const app = createApp(App);

// declare global variable..
app.config.globalProperties.$app_url = process.env.VUE_APP_ROOT_URL;
app.config.globalProperties.$api_url = process.env.VUE_APP_API_URL;

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);

// toast..
app.use(ToastPlugin, {
    position: 'bottom'
});

// Register the Toast component globally
app.component('Toast', Toast);

app.mount('#app');

