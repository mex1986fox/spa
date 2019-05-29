import Vue from "vue/dist/vue.js";

const locations = {
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/dependencies/api/locations/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
};
export default locations;
