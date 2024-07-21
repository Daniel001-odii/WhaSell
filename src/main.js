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
axios.defaults.baseURL = 'http://localhost:8000/api'

// Import PrimeVue CSS
import 'primevue/resources/themes/nova/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// import './assets/css/custom-toast.css'
// Import the PrimeVue Toast component CSS
// import 'primevue/toast/toast.css';


const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store);

// toast..
app.use(ToastPlugin, {
    position: 'top'
});

// Register the Toast component globally
app.component('Toast', Toast);

app.mount('#app');

