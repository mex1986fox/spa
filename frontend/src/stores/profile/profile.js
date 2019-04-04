import Vue from "vue/dist/vue.js";
const profile = {
  namespaced: true,
  state: {
    avatar: undefined,
    birthdate: undefined,
    city_id: undefined,
    email: undefined,
    login: undefined,
    name: undefined,
    phone: undefined,
    surname: undefined,
    user_id: undefined
  },
  getters: {
    getID: (state, getters, rootState, rootGetters) => {
      return state.user_id;
    },
    getAvatar: (state, getters, rootState, rootGetters) => {
      return state.avatar;
    },
    getLogin: (state, getters, rootState, rootGetters) => {
      return state.login;
    },
  },
  mutations: {
    updateProfile(state, profile) {
      state.avatar = profile.avatar;
      state.birthdate = profile.birthdate;
      state.city_id = profile.city_id;
      state.email = profile.email;
      state.login = profile.login;
      state.name = profile.name;
      state.phone = profile.phone;
      state.surname = profile.surname;
      state.user_id = profile.user_id;
    },
  },
  actions: {
    updateProfile(context, user_id) {
      let body = { "user_id": user_id }
      Vue.http.post(Vue.prototype.$hosts.services + "/api/user/show", body)
        .then(
          response => {
            if (response.body.data != undefined) {
              context.commit("updateProfile", response.body.data[0]);
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
