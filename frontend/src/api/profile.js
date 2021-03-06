import Vue from "vue/dist/vue.js";

const profile = {
  authentificate(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/profile/authentificate", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/profile/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/profile/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/profile/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
export default profile;
