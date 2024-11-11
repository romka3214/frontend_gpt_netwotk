import auth from "./routes/auth";
import IndexPage from "@/views/IndexPage.vue";

export default [
  {
    path: "/",
    name: "index",
    component: IndexPage,
    meta: { requiresAuth: true },
  },
  ...auth,
];
