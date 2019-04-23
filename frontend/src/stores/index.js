import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

import Locations from "./dependencies/locations.js";
import Transports from "./dependencies/transports.js";
import Tokens from "./tokens/tokens.js";
import Profile from "./profile/profile.js";
import Users from "./users/users.js";
import Posts from "./posts/posts.js";
Vue.use(Vuex);

//импорт хранилищь vuex
//import User from "./user/user.js";
const store = new Vuex.Store({
  // строгий режим для отслеживания ошибок
  // в продакшине отключить!!!
  strict: true,
  modules: {
    tokens: Tokens,
    profile: Profile,
    locations: Locations,
    transports: Transports,
    users: Users,
    posts: Posts
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
export default store;
