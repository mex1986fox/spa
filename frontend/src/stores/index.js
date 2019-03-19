import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
Vue.use(Vuex);

//импорт хранилищь vuex
//import User from "./user/user.js";
const store = new Vuex.Store({
  // строгий режим для отслеживания ошибок
  // в продакшине отключить!!!
  strict: true,
  modules: {
    //user: User,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
export default store;
