import { createRouter, createWebHistory } from "vue-router";
import MyTransactionsView from '@/views/MyTransactionsView.vue';
import DashboardView from "@/views/DashboardView.vue";
import AddTransactionView from "@/views/AddTransactionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "myTransactions",
      component: MyTransactionsView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/myTransactions/add",
      name: "addTransaction",
      component: AddTransactionView,
    }
  ],
});

export default router;
