import Vue from "vue/dist/vue.js";

const products = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/products/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/products/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/products/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/products/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
export default products;
