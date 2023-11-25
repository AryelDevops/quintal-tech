import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import service from "./plugins/service";
import Input from "./components/base/Input";
import Button from "./components/base/Button";
import Drawer from "./components/base/Drawer";
import Table from "./components/base/Table";

Vue.component("Input", Input);
Vue.component("Button", Button);
Vue.component("Drawer", Drawer);
Vue.component("Table", Table);

Vue.config.productionTip = false;

Vue.use(service);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
