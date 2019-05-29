import Vue from "vue/dist/vue.js";

const userphoto = {
  upload(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/userphoto/api/userphoto/upload", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/userphoto/api/userphoto/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/userphoto/api/userphoto/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },


};
export default userphoto;
