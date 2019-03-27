import Vue from "vue/dist/vue.js";
const access_token = {
  namespaced: true,
  state: {
    token: undefined
  },
  getters: {
    getToken: (state, getters, rootState, rootGetters) => {
      return state.token;
    },
  },
  mutations: {
    updateToken(state, access_token) {
      state.token = access_token;
    }
  },
  actions: {
    creteTokens(context, body) {

      let mbody = {
        "login": body.login,
        "password": body.password
      }
      Vue.http.post(Vue.prototype.$hosts.services + "/api/token/create", mbody)
        .then(
          response => {
            context.commit("updateToken", response.body.data.access_token);
          },
          error => { 
            console.log(error) 
          }
        );
    }
  }
};
export default access_token;
