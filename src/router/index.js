import { createRouter, createWebHistory } from "vue-router";
import TheHome from "../views/TheHome.vue";
import InvoiceDetails from "../components/InvoiceDetails.vue";

const routes = [
  {
    path: "/",
    name: "TheHome",
    component: TheHome,
  },
  {
    path: "/invoice/:invoiceId",
    name: 'InvoiceDetails',
    component: InvoiceDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
