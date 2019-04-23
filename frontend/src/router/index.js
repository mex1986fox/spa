import Vue from "vue/dist/vue.js";
import Router from "vue-router";

import Users from "../pages/users/users.vue";
import Posts from "../pages/posts/posts.vue";

Vue.use(Router);
export default new Router({
  mode: "history", // приводит к нормальным URL без #
  routes: [
    { path: "/", component: Posts },
    { path: "/users", component: Users },
    { path: "/posts", component: Posts }
    
  ],
  beforeDestroy: function () {
    this.choicesSelect.destroy()
  }
});

