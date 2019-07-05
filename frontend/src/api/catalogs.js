import Vue from "vue/dist/vue.js";

const catalogs = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/catalogs/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/catalogs/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/catalogs/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/catalogs/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
export default catalogs;
