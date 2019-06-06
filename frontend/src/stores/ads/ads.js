import Vue from "vue/dist/vue.js";
const ads = {
    namespaced: true,
    state: {
        ads: undefined,
    },
    getters: {
        getAds: (state, getters, rootState, rootGetters) => {
            return state.ads;
        },
        getAd: (state, getters, rootState, rootGetters) => id => {
            for (let ad of state.ads) {
                if (id == ad.ad_id) {
                    return ad;
                }
            }
            return undefined;
        }
    },
    mutations: {
        updateAds(state, ads) {
            state.ads = ads;
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