import Vue from "vue/dist/vue.js";
const ads = {
    namespaced: true,
    state: {
        ads: undefined,
        page: 0
    },
    getters: {
        getPage: (state, getters, rootState, rootGetters) => {
            return state.page;
        },
        getAds: (state, getters, rootState, rootGetters) => {
            return state.ads;
        },
        getAd: (state, getters, rootState, rootGetters) => id => {
            if (state.ads != undefined) {
                for (let ad of state.ads) {
                    if (id == ad.ad_id) {
                        return ad;
                    }
                }
            } else {
                return undefined;
            }
        }
    },
    mutations: {
        updateAds(state, ads) {
            state.ads = ads;
        },
        updatePage(state, page) {
            state.page = page;
        },
        // вставляет объявление в начало
        unshiftAd(state, ad) {
            state.ads.unshift(ad);
        }
    },
    actions: {
        updateAd(context, ad) {
            let ads = context.state.ads;
            for (let key in ads) {
                if (ad.ad_id == ads[key].ad_id) {
                    ads[key] = ad;
                }
            }
            context.commit("updateAds", undefined);
            setTimeout(() => {
                context.commit("updateAds", ads);
            }, 200);
        }
    }

};
export default ads;