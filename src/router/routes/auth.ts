const Login = () => import("@/views/Auth/LoginForm.vue");
const Register = () => import("@/views/Auth/AuthRegister.vue");

export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { requiresAuth: false },
  },
];
