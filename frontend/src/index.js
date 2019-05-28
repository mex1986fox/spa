require("./ui/index.scss");
require("./layouts/index.scss");
require("./wg/index.scss");

import Vue from "vue/dist/vue.js";
import router from "./router/index.js";
import store from "./stores/index.js";

//имена хостов которые будем использовать в проекте
import Hosts from "./plugins/hosts.js";
Vue.use(Hosts);
//api запросы к серверам
import Api from "./api/api.js";
Vue.use(Api);

// подключаем библиотеки
import "./ui/index.js";
import "./layouts/index.js";
import "./wg/index.js";

//подключаем библиотеку AJAX запросов
import Resourсe from "vue-resource";
Vue.use(Resourсe);

//подключаем библиотеку для работы с куками
var VueCookie = require("vue-cookie");
Vue.use(VueCookie);

const vue = new Vue({
  router,
  store,
  mounted() {
    this.$store.dispatch("locations/loadLocations");
    this.$store.dispatch("transports/loadTransports");
    // this.$store.dispatch("user/authentication");
  }
}).$mount("#app");
