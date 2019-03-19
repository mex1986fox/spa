require("./ui/index.scss");
require("./wg/index.scss");

import Vue from "vue/dist/vue.js";
import router from "./router/index.js";
import store from "./stores/index.js";

// подключаем библиотеку UI-простейшие компоненты
import "./ui/index.js";
// подключаем библиотеку WG-компоненты виджетов
import "./wg/index.js";
// подключаем лейаут
import Layout from "./pages/layout.vue";
Vue.component("layout", Layout);

const vue = new Vue({
    router,
    store,
}).$mount("#app");
