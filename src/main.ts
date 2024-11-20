import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/assets/scss/app.scss";
import "vfonts/FiraCode.css";

import naive from "naive-ui";
import { useAuthStore } from "@/stores/auth";
const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(naive);

app.use(pinia);

app.mount("#app");

const authStore = useAuthStore();
authStore.refresh();
setInterval(() => authStore.refresh(), 29 * 1000);
