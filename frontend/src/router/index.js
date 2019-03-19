import Vue from "vue/dist/vue.js";
import Router from "vue-router";

import Users from "../pages/users/users.vue";

Vue.use(Router);
export default new Router({
  mode: "history", // приводит к нормальным URL без #
  routes: [
    { path: "/", component: Users },

  ],
  beforeDestroy: function () {
    this.choicesSelect.destroy()
  }
});

