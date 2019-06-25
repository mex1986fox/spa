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
    getSurname: (state, getters, rootState, rootGetters) => {
      return state.surname;
    },
    getPhone: (state, getters, rootState, rootGetters) => {
      return state.phone;
    },
    getName: (state, getters, rootState, rootGetters) => {
      return state.name;
    },
    getEmail: (state, getters, rootState, rootGetters) => {
      return state.email;
    },
    getCityID: (state, getters, rootState, rootGetters) => {
      return state.city_id;
    },
    getBirthdate: (state, getters, rootState, rootGetters) => {
      return state.birthdate;
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
    deleteProfile(state) {
      state.avatar = undefined;
      state.birthdate = undefined;
      state.city_id = undefined;
      state.email = undefined;
      state.login = undefined;
      state.name = undefined;
      state.phone = undefined;
      state.surname = undefined;
      state.user_id = undefined;
    },
  },
  actions: {
    updateProfile(context, access_token) {
      let body = { "access_token": access_token }
      Vue.prototype.$api("profile").show(body)
        .then(
          response => {
            if (response.body.data.profile != undefined) {
              context.commit("updateProfile", response.body.data.profile);
            }
          }).catch(
            error => {
              console.log(error)
            }
          );
    }
  }
};
export default profile;
