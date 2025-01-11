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


/* 
    import chadcn-css
*/
import '../src/assets/index.css';


const app = createSSRApp(App);
const meta = createHead();
app.use(meta);

// const app = createApp(App);

// declare global variable..
app.config.globalProperties.$app_url = process.env.VUE_APP_ROOT_URL;
app.config.globalProperties.$api_url = process.env.VUE_APP_API_URL;

// MASONRY
import mitt from 'mitt'

import { VueMasonryPlugin } from "vue-masonry";

import MasonryWall from '@yeger/vue-masonry-wall'
app.use(MasonryWall);


import GlobalComponent from './components/GlobalComponent.vue';

app.use(GlobalComponent);

const emitter = mitt()
app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)




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

