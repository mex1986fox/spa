import profile from "./profile";
const api = Array();
api["profile"] = profile;

const Api = {
  install(Vue, options) {
    Vue.prototype.$api = function(nameApi) {
      return api[nameApi];
    };
  }
};
export default Api;
