import Vue from "vue/dist/vue.js";
const shops = {
  namespaced: true,
  state: {
    shops: undefined,
    page: 0
  },
  getters: {
    getShops: (state, getters, rootState, rootGetters) => {
      return state.shops;
    },
    getShop: (state, getters, rootState, rootGetters) => id => {
      for (let shop of state.shops) {
        if (id == shop.shop_id) {
          return shop;
        }
      }
      return undefined;
    },
    getPage: (state, getters, rootState, rootGetters) => {
      return state.page;
    }
  },
  mutations: {
    updateShops(state, shops) {
      state.shops = shops;
    },
    updatePage(state, page) {
      state.page = page;
    },
    updateShop(state, shop) {
      if (state.shops != undefined) {
        state.shops = state.shops.map(shop_map => {
          if (shop_map.shop_id != shop.shop_id) {
            return shop_map;
          } else {
            return shop;
          }
        });
      }
    },
    deleteShop(state, shop) {
      if (state.shops != undefined) {
        state.shops = state.shops.filter(shop_map => {
          if (shop_map.shop_id != shop.shop_id) {
            return true;
          }
        });
      }
    },
    unshiftShop(state, shop) {
      if(state.shops==undefined){
        state.shops=[];
      }
      state.shops.unshift(shop);
    }
  },
  
  actions: {
    updateShop(context, shop) {
      let shops = context.state.shops;
      for (let key in shops) {
        if (shop.shop_id == shops[key].shop_id) {
          shops[key] = shop;
        }
      }
      context.commit("updateShops", undefined);
      setTimeout(() => {
        context.commit("updateShops", shops);
      }, 200);
    }
  }
};
export default shops;
