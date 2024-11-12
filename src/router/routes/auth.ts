const Auth = () => import("@/views/Auth/AuthPage.vue");

export default [
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: { requiresAuth: false },
  },
];
