import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import PolarisVue from '@ownego/polaris-vue';
import '@ownego/polaris-vue/dist/style.css';
import axios from '@/bootstrap/api-interceptor';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

const app = createApp(App);
const pinia = createPinia();

//config variable scss
app.use(pinia);
app.use(router);
app.use(PolarisVue);

app.provide('axios', axios);

router.isReady().then(() => {
  app.mount('#app');
});
