import SalesForm from "../views/SalesForm.vue";
import Login from "../views/Login.vue";
import UserForm from "../views/UserForm.vue";
import Home from "../views/Home.vue";
import BuyForm from "../views/BuyForm.vue";
import StorageList from "../views/StorageList.vue";
import ProfitReport from "../views/ProfitReport.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    name: "SalesForm",
    component: SalesForm,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/compra",
    name: "BuyForm",
    component: BuyForm,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/estoque",
    name: "StorageList",
    component: StorageList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/relatorios",
    name: "ProfitReport",
    component: ProfitReport,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/cadastroUsuario/:id?",
    name: "UserForm",
    component: UserForm,
  },
];

export default routes;
