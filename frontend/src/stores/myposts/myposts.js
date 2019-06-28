import Vue from "vue/dist/vue.js";
const posts = {
  namespaced: true,
  state: {
    posts: undefined,
    page: 0
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
    },
    getPage: (state, getters, rootState, rootGetters) => {
      return state.page;
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },
    updatePage(state, page) {
      state.page = page;
    },
    updatePost(state, post) {
      if (state.posts != undefined) {
        state.posts = state.posts.map(post_map => {
          if (post_map.post_id != post.post_id) {
            return post_map;
          } else {
            return post;
          }
        });
      }
    },
    deletePost(state, post) {
      if (state.posts != undefined) {
        state.posts = state.posts.filter(post_map => {
          if (post_map.post_id != post.post_id) {
            return true;
          }
        });
      }
    },
    unshiftPost(state, post) {
      if(state.posts==undefined){
        state.posts=[];
      }
      state.posts.unshift(post);
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
