import Vue from "vue/dist/vue.js";
import Router from "vue-router";

import Users from "../pages/users/users.vue";
import Posts from "../pages/posts/posts.vue";
import Ads from "../pages/ads/ads.vue";

import MyPosts from "../pages/myposts/myposts.vue";

Vue.use(Router);
export default new Router({
  mode: "history", // приводит к нормальным URL без #
  routes: [
    { path: "/", component: MyPosts },
    { path: "/users", component: Users },
    { path: "/posts", component: Posts },
    { path: "/ads", component: Ads },
    { path: "/my_posts", component: MyPosts },
  ],
  beforeDestroy: function () {
    this.choicesSelect.destroy()
  }
});

