import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import storageManager from "../utils/storage-manager";

if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,
});

router.afterEach((routeTo) => {
  const hasSession = loggedIn();

  if (hasSession && (routeTo.name === "Login" || routeTo.name === "Home")) {
    router.push({ name: "SalesForm" });
    return;
  }

  if (!hasSession && routeTo.meta && routeTo.meta.requiresAuth)
    router.push({ name: "Home" });

  function loggedIn() {
    return !!storageManager.loadStorage("_qtc.user");
  }
});

export default router;
