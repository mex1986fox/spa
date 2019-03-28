import Vue from "vue/dist/vue.js";
const tokens = {
  namespaced: true,
  state: {
    access_token: undefined,
    refresh_token: undefined,
    token_update_timer: undefined
  },
  getters: {
    getAccessToken: (state, getters, rootState, rootGetters) => {
      return state.access_token;
    },
    getRefreshToken: (state, getters, rootState, rootGetters) => {
      return state.refresh_token;
    },
  },
  mutations: {
    updateAccessToken(state, access_token) {
      state.access_token = access_token;
    },
    updateRefreshToken(state, refresh_token) {
      state.refresh_token = refresh_token;
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
            if (response.body.data.access_token != undefined) {
              context.commit("updateAccessToken", response.body.data.access_token);
              context.commit("updateRefreshToken", response.body.data.refresh_token);
            }

          },
          error => {
            console.log(error)
          }
        );
    },
    deleteTokens(context) {
      let body = { "access_token": context.getters.getAccessToken }
      Vue.http.post(Vue.prototype.$hosts.services + "/api/token/delete", body)
        .then(
          response => {
            if (response.body.status == "ok") {
              context.commit("updateAccessToken", undefined);
              context.commit("updateRefreshToken", undefined);
            }
          },
          error => {
            console.log(error)
          }
        );
    },
    updateTokens(context) {
      let body = { "refresh_token": context.getters.getRefreshToken }
      Vue.http.post(Vue.prototype.$hosts.services + "/api/token/update", body)
        .then(
          response => {
            if (response.body.data.access_token != undefined) {
              context.commit("updateAccessToken", response.body.data.access_token);
              context.commit("updateRefreshToken", response.body.data.refresh_token);
              console.dir(response.body.data);
            }
          },
          error => {
            console.log(error)
          }
        );
    }
  }
};
export default tokens;
