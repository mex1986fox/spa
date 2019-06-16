import Vue from "vue/dist/vue.js";
const users = {
  namespaced: true,
  state: {
    users: undefined,
    page: 0
  },
  getters: {
    getPage: (state, getters, rootState, rootGetters) => {
      return state.page;
    },
    getUsers: (state, getters, rootState, rootGetters) => {
      return state.users;
    }
  },
  mutations: {
    updateUsers(state, users) {
      state.users = users;
    },
    updatePage(state, page) {
      state.page = page;
    }
  }
};
export default users;
