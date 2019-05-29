import Vue from "vue/dist/vue.js";

const user = {
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/users/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },


};
export default user;
