import Vue from "vue/dist/vue.js";

const transports = {
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/dependencies/api/transports/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
export default transports;
