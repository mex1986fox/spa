import Vue from "vue/dist/vue.js";

const postphoto = {
  upload(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/postphoto/api/postphoto/upload", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/postphoto/api/postphoto/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/postphoto/api/postphoto/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  // альбом
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/postphoto/api/album/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

};
export default postphoto;
