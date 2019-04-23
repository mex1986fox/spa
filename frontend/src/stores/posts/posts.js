import Vue from "vue/dist/vue.js";
const posts = {
    namespaced: true,
    state: {
        posts: undefined,
    },
    getters: {
        getPosts: (state, getters, rootState, rootGetters) => {
            return state.posts;
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts;
        }
    }

};
export default posts;