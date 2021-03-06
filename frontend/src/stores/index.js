import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

import Locations from "./dependencies/locations.js";
import Transports from "./dependencies/transports.js";
import Tokens from "./tokens/tokens.js";
import Profile from "./profile/profile.js";
import Users from "./users/users.js";
import Posts from "./posts/posts.js";
import MyPosts from "./myposts/myposts.js";
import Ads from "./ads/ads.js";
import MyAds from "./myads/myads.js";
import MyShops from "./myshops/myshops.js";
import Shops from "./shops/shops.js";
import MyProducts from "./myproducts/myproducts.js";
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
    posts: Posts,
    myposts: MyPosts,
    ads: Ads,
    myads: MyAds,
    myshops: MyShops,
    shops: Shops,
    myproducts: MyProducts
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
export default store;
