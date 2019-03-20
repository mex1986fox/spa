require("./ui/index.scss");
require("./layouts/index.scss");
require("./wg/index.scss");


import Vue from "vue/dist/vue.js";
import router from "./router/index.js";
import store from "./stores/index.js";

// подключаем библиотеки
import "./ui/index.js";
import "./layouts/index.js";
import "./wg/index.js";

const vue = new Vue({
    router,
    store,
}).$mount("#app");
