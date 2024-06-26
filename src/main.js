import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import '../src/assets/css/style.css'

// BOOTSTRAP ICONS
import 'bootstrap-icons/font/bootstrap-icons.css';

// PRIMEVUEW ICONS
import 'primeicons/primeicons.css'


// PRIMEVUE
import PrimeVue from 'primevue/config';


// CONFIGURE AXIOS
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api'


createApp(App).use(store).use(router).mount('#app')

createApp(App).use(PrimeVue, {
    // unstyed: true
});
