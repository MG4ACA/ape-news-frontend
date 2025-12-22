import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});

app.mount('#app');
