import Vue from "vue/dist/vue.js";
import Router from "vue-router";

import Users from "../pages/users/users.vue";
import Posts from "../pages/posts/posts.vue";
import Ads from "../pages/ads/ads.vue";

import MyPosts from "../pages/myposts/myposts.vue";
import MyAds from "../pages/myads/myads.vue";
import MyShops from "../pages/myshops/myshops.vue";
import MyShop from "../pages/myshop/myshop.vue";
import MyProducts from "../pages/myproducts/myproducts.vue";

Vue.use(Router);
export default new Router({
  mode: "history", // приводит к нормальным URL без #
  routes: [
    { path: "/", component: MyShops },
    { path: "/users", component: Users },
    { path: "/posts", component: Posts },
    { path: "/ads", component: Ads },
    { path: "/my_posts", component: MyPosts },
    { path: "/my_ads", component: MyAds },
    { path: "/my_shops", component: MyShops },
    { path: "/my_shop/:id", component: MyShop },
    { path: "/my_products", component: MyProducts },
  ],
  beforeDestroy: function () {
    this.choicesSelect.destroy()
  }
});

