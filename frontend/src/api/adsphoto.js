import Vue from "vue/dist/vue.js";

const adsphoto = {
  upload(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/adsphoto/api/adsphoto/upload", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/adsphoto/api/adsphoto/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/adsphoto/api/adsphoto/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  // альбом
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/adsphoto/api/album/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

};
export default adsphoto;
