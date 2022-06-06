import { createRouter, createWebHistory } from "vue-router";
import TheHome from "../views/TheHome.vue";

const routes = [
  {
    path: "/",
    name: "TheHome",
    component: TheHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;