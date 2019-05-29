import Vue from "vue/dist/vue.js";

const post = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  // лайки
  createLike(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/like/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

};
export default post;
