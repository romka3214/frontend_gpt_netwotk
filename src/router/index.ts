import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/stores/auth";
import { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";
declare global {
  interface Window {
    $message: MessageApiInjection;
  }
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuth;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "auth" });
  } else {
    next();
  }
});
export default router;
