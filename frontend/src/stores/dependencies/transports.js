import Vue from "vue/dist/vue.js";
const transports = {
  namespaced: true,
  state: {
    types: undefined,
    brands: undefined,
    models: undefined,
    drives: undefined,
    fuels: undefined,
    volums: undefined,
    bodies: undefined,
    transmissions: undefined
  },
  getters: {
    getTransport: (state, getters, rootState, rootGetters) => id => {
      if (state.types != undefined) {
        for (let transport of state.types) {
          if (id == transport.id) {
            return transport;
          }
        }
      } else {
        return undefined;
      }
    },
    getBrand: (state, getters, rootState, rootGetters) => id => {
      if (state.brands != undefined) {
        for (let brand of state.brands) {
          if (id == brand.id) {
            return brand;
          }
        }
      } else {
        return undefined;
      }
    },
    getModel: (state, getters, rootState, rootGetters) => id => {
      if (state.models != undefined) {
        for (let model of state.models) {
          if (id == model.id) {
            return model;
          }
        }
      } else {
        return undefined;
      }
    },
    getFuel: (state, getters, rootState, rootGetters) => id => {
      if (state.fuels != undefined) {
        for (let fuel of state.fuels) {
          if (id == fuel.id) {
            return fuel;
          }
        }
      } else {
        return undefined;
      }
    },
    getDrive: (state, getters, rootState, rootGetters) => id => {
      if (state.drives != undefined) {
        for (let drive of state.drives) {
          if (id == drive.id) {
            return drive;
          }
        }
      } else {
        return undefined;
      }
    },
    getTransmission: (state, getters, rootState, rootGetters) => id => {
      if (state.transmissions != undefined) {
        for (let transmission of state.transmissions) {
          if (id == transmission.id) {
            return transmission;
          }
        }
      } else {
        return undefined;
      }
    }
  },
  mutations: {
    updateTransports(state, transport) {
      // state.types = transport.types;
      // state.brands = transport.brands;
      // state.models = transport.models;
      let types = transport.types;
      state.types = types.map(transp => {
        transp["extended_name"] =
          transp["name"].charAt(0).toUpperCase() + transp["name"].slice(1);
        return transp;
      });
      let brands = transport.brands;
      state.brands = brands.map(brand => {
        let transp_name = types.filter(transp => {
          return transp.type_id == brand.type_id;
        })[0].name;
        brand["extended_name"] = brand["name"] + " (" + transp_name + ")";
        return brand;
      });
      let models = transport.models;
      state.models = models.map(model => {
        let brand_name = brands.filter(brand => {
          return brand.brand_id == model.brand_id;
        })[0].name;
        model["extended_name"] = model["name"] + " (" + brand_name + ")";
        return model;
      });
      state.drives = transport.drives;
      state.fuels = transport.fuels;
      state.volums = transport.volums;
      state.bodies = transport.bodies;
      state.transmissions = transport.transmissions;
    }
  },
  actions: {
    loadTransports(context) {
      let state = context.state;
      if (
        state.types == undefined ||
        state.brands == undefined ||
        state.models == undefined ||
        state.drives == undefined ||
        state.fuels == undefined ||
        state.volums == undefined ||
        state.bodies == undefined ||
        state.transmissions == undefined
      ) {
        Vue.http
          .post(Vue.prototype.$hosts.services + "/api/transports/show")
          .then(
            response => {
              context.commit("updateTransports", response.body.data);
            },
            error => {}
          );
      }
    }
  }
};
export default transports;
