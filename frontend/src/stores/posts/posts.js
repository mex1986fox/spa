import Vue from "vue/dist/vue.js";
const posts = {
    namespaced: true,
    state: {
        posts: undefined,
    },
    getters: {
        getPosts: (state, getters, rootState, rootGetters) => {
            return state.posts;
        },
        getPost: (state, getters, rootState, rootGetters) => id => {
            for (let post of state.posts) {
                if (id == post.post_id) {
                    return post;
                }
            }
            return undefined;
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        updatePost(context, post) {
            let posts = context.state.posts;
            for (let key in posts) {
                if (post.post_id == posts[key].post_id) {
                    posts[key] = post;
                }
            }
            context.commit("updatePosts", undefined);
            setTimeout(() => {
                context.commit("updatePosts", posts);
            }, 200);
        }
    }

};
export default posts;