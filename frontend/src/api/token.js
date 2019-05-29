import Vue from "vue/dist/vue.js";

const token = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/token/api/token/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/token/api/token/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/token/api/token/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/token/api/token/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },


};
export default token;
