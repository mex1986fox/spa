import Vue from "vue/dist/vue.js";
const users = {
    namespaced: true,
    state: {
        users: undefined,
    },
    getters: {
        getUsers: (state, getters, rootState, rootGetters) => {
            return state.users;
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users = users;
        }
    }
};
export default users;