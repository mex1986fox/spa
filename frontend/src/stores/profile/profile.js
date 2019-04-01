import Vue from "vue/dist/vue.js";
const profile = {
  namespaced: true,
  state: {

  },
  getters: {
    getID: (state, getters, rootState, rootGetters) => {
      return state.user_id;
    },
  },
  mutations: {
    updateProfile(state, profile) {
      state = profile;
    },
  },
  actions: {
    updateProfile(context, user_id) {
      let body = {"user_id": user_id }
      Vue.http.post(Vue.prototype.$hosts.services + "/api/user/show", body)
        .then(
          response => {
            if (response.body.data.access_token != undefined) {
              context.commit("updateProfile", response.body.data.user[0]);
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
export default profile;
