import Vue from "vue/dist/vue.js";
const products = {
  namespaced: true,
  state: {
    products: undefined,
    page: 0
  },
  getters: {
    getProducts: (state, getters, rootState, rootGetters) => {
      return state.products;
    },
    getProduct: (state, getters, rootState, rootGetters) => id => {
      for (let product of state.products) {
        if (id == product.product_id) {
          return product;
        }
      }
      return undefined;
    },
    getPage: (state, getters, rootState, rootGetters) => {
      return state.page;
    }
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products;
    },
    updatePage(state, page) {
      state.page = page;
    },
    updateProduct(state, product) {
      if (state.products != undefined) {
        state.products = state.products.map(product_map => {
          if (product_map.product_id != product.product_id) {
            return product_map;
          } else {
            return product;
          }
        });
      }
    },
    deleteProduct(state, product) {
      if (state.products != undefined) {
        state.products = state.products.filter(product_map => {
          if (product_map.product_id != product.product_id) {
            return true;
          }
        });
      }
    },
    unshiftProduct(state, product) {
      if(state.products==undefined){
        state.products=[];
      }
      state.products.unshift(product);
    }
  },
  
  actions: {
    updateProduct(context, product) {
      let products = context.state.products;
      for (let key in products) {
        if (product.product_id == products[key].product_id) {
          products[key] = product;
        }
      }
      context.commit("updateProducts", undefined);
      setTimeout(() => {
        context.commit("updateProducts", products);
      }, 200);
    }
  }
};
export default products;
