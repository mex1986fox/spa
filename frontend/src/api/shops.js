import Vue from "vue/dist/vue.js";

const shops = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  // лайки
  createLike(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/like/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

};
export default shops;
