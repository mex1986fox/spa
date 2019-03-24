import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

import Locations from "./dependencies/locations.js";
import Transports from "./dependencies/transports.js";
Vue.use(Vuex);

//импорт хранилищь vuex
//import User from "./user/user.js";
const store = new Vuex.Store({
  // строгий режим для отслеживания ошибок
  // в продакшине отключить!!!
  strict: true,
  modules: {
    //user: User,
    locations: Locations,
    transports: Transports
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
export default store;
