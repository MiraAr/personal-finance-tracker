import "./assets/main.css";

import "primevue/resources/themes/saga-blue/theme.css"; 
import "primevue/resources/primevue.min.css"; 
import "primeicons/primeicons.css"; 

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast);
app.use(PrimeVue);

app.mount("#app");
