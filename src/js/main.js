import resetCSS from "../css/reset.css";
import style from "../css/main.scss";
import Axios from "./axios.min.js";
import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "./router";

/* vue components */
import App from "../app.vue";

/* custom libs */
import Navigator from "./my-vue-navigator";
import Login from "./login";

Vue.use(VueRouter);
const router = new VueRouter(routerConfig);

// Global tool
Vue.mixin({
  data() {
    return {
      navigator: Navigator,
      loginManager: Login,
      http: Axios,
    };
  },
  created() {
    Navigator.context = this;
  }
});

Vue.filter('toUpperCase', v => typeof v === 'string' ? v.toUpperCase() : v);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
