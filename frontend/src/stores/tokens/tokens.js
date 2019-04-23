import Vue from "vue/dist/vue.js";
const tokens = {
  namespaced: true,
  state: {
    access_token: undefined,
    refresh_token: undefined,
    timer_update: undefined
  },
  getters: {
    getAccessToken: (state, getters, rootState, rootGetters) => {
      return state.access_token;
    },
    getRefreshToken: (state, getters, rootState, rootGetters) => {
      return state.refresh_token;
    },
    getAccessTokenPayload(state, getters, rootState, rootGetters) {
      if (state.access_token != undefined) {
        let token = state.access_token;
        let tokenPayloadHex = token.split(".");
        let tokenPayload = atob(tokenPayloadHex[1]);
        return JSON.parse(tokenPayload);
      }
      return undefined;

    },
    getRefreshTokenPayload(state, getters, rootState, rootGetters) {
      if (state.refresh_token != undefined) {
        let token = state.refresh_token;
        let tokenPayloadHex = token.split(".");
        let tokenPayload = atob(tokenPayloadHex[1]);
        return JSON.parse(tokenPayload);
      }
      return undefined;
    }
  },
  mutations: {
    updateAccessToken(state, access_token) {
      state.access_token = access_token;
    },
    updateRefreshToken(state, refresh_token) {
      state.refresh_token = refresh_token;
    },
    updateTimerUpdate(state, timer) {
      state.timer_update = timer;

    },
    deleteTimerUpdate(state, timer) {
      clearInterval(state.timer_update);
      state.timer_update = undefined;
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
              // запускаем обновление токинов
              // за минуту до его смерти
              let pload = context.getters.getAccessTokenPayload;
              let uptime = (pload.exp - pload.iat - 60) * 1000;

              if (context.state.timer_update == undefined) {
                context.commit("updateTimerUpdate", setInterval(() => {
                  context.dispatch("updateTokens");
                }, uptime));
              }
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
              context.commit("deleteTimerUpdate");
            }
          },
          error => {
            console.log(error)
          }
        );
    },
    updateTokens(context, tokens = undefined) {
      if (tokens == undefined) {
        let body = { "refresh_token": context.getters.getRefreshToken }
        Vue.http.post(Vue.prototype.$hosts.services + "/api/token/update", body)
          .then(
            response => {
              if (response.body.data.access_token != undefined) {
                context.commit("updateAccessToken", response.body.data.access_token);
                context.commit("updateRefreshToken", response.body.data.refresh_token);
                // console.dir(response.body.data);
              }
            },
            error => {
              console.log(error)
            }
          );
      } else {
        context.commit("updateAccessToken", tokens.access_token);
        context.commit("updateRefreshToken", tokens.refresh_token);
        // запускаем обновление токинов
        // за минуту до его смерти
        let pload = context.getters.getAccessTokenPayload;
        let uptime = (pload.exp - pload.iat - 60) * 1000;

        if (context.state.timer_update == undefined) {
          context.commit("updateTimerUpdate", setInterval(() => {
            context.dispatch("updateTokens");
          }, uptime));
        }
      }
    },
  }
};
export default tokens;
