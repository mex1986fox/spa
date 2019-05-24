import Vue from "vue/dist/vue.js";
import Router from "vue-router";

import Users from "../pages/users/users.vue";
import Posts from "../pages/posts/posts.vue";
import Ads from "../pages/ads/ads.vue";

Vue.use(Router);
export default new Router({
  mode: "history", // приводит к нормальным URL без #
  routes: [
    { path: "/", component: Ads },
    { path: "/users", component: Users },
    { path: "/posts", component: Posts },
    { path: "/ads", component: Ads }

  ],
  beforeDestroy: function () {
    this.choicesSelect.destroy()
  }
});

