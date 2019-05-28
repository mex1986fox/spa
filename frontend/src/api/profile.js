import Vue from "vue/dist/vue.js";

const profile = {
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/api/profile/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/api/profile/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
export default profile;
