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
    getType: (state, getters, rootState, rootGetters) => id => {
      for (let type of state.types) {
        if (id == type.type_id) {
          return type;
        }
      }
      return undefined;
    },
    getBrand: (state, getters, rootState, rootGetters) => id => {
      for (let brand of state.brands) {
        if (id == brand.brand_id) {
          return brand;
        }
      }
      return undefined;
    },
    getModel: (state, getters, rootState, rootGetters) => id => {
      for (let model of state.models) {
        if (id == model.model_id) {
          return model;
        }
      }
      return undefined;
    },
    // city-model
    // subject -brand
    getTypes: (state, getters, rootState, rootGetters) => {
      return state.types;
    },
    getBrands: (state, getters, rootState, rootGetters) => idType => {

      return state.brands.filter(brand => {
        return brand.type_id == idType;
      });
    },
    getModels: (state, getters, rootState, rootGetters) => idBrand => {
      return state.models.filter(model => {
        return model.brand_id == idBrand;
      });
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
        return [];
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
        return [];
      }
    },
    getMenuDrive: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.drives != undefined) {
        return state.drives.map(drive => {
          return {
            value: drive.drive_id,
            option: drive.name,
            selected: ids.indexOf(drive.drive_id) != -1 ? true : false
          }
        });
      } else {
        return [];
      }
    },
    getMenuTransmission: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.transmissions != undefined) {
        return state.transmissions.map(transmission => {
          return {
            value: transmission.transmission_id,
            option: transmission.name,
            selected: ids.indexOf(transmission.transmission_id) != -1 ? true : false
          }
        });
      } else {
        return [];
      }
    },
    getMenuBody: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.bodies != undefined) {
        return state.bodies.map(body => {
          return {
            value: body.body_id,
            option: body.name,
            selected: ids.indexOf(body.body_id) != -1 ? true : false
          }
        });
      } else {
        return [];
      }
    },
    getMenuFuel: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.fuels != undefined) {
        return state.fuels.map(fuel => {
          return {
            value: fuel.fuel_id,
            option: fuel.name,
            selected: ids.indexOf(fuel.fuel_id) != -1 ? true : false
          }
        });
      } else {
        return []
      }
    },
    getMenuVolume: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.volums != undefined) {
        return state.volums.map(volume => {
          return {
            value: volume.value,
            option: volume.value,
            selected: ids.indexOf(volume.value) != -1 ? true : false
          }
        });
      } else {
        return []
      }
    },
    getMenuVolume2: (state, getters, rootState, rootGetters) => (ids = []) => {
      if (state.volums != undefined) {
        return state.volums.map(volume => {
          return {
            value: volume.value,
            option: volume.value,
            selected: ids.indexOf(volume.value) != -1 ? true : false
          }
        });
      } else {
        return []
      }
    },
    getMenuWheel: (state, getters, rootState, rootGetters) => (ids = []) => {
      return [
        { value: 1, option: "левый", selected: ids.indexOf(1) != -1 ? true : false },
        { value: 2, option: "правый", selected: ids.indexOf(2) != -1 ? true : false }
      ]
    },
    getMenuYear: (state, getters, rootState, rootGetters) => (date = []) => {
      let minDate = 1935;
      let maxDate = new Date().getFullYear();
      let menu = [];
      while (minDate != maxDate) {
        menu.push({
          value: maxDate,
          option: maxDate,
          selected: date.indexOf(maxDate) != -1 ? true : false
        });
        maxDate--;
      }
      return menu;
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
        Vue.prototype.$api("transports").show()
          .then(
            response => {
              context.commit("updateTransports", response.body.data);
            }).catch(
              error => { }
            );
      }
    }
  }
};
export default transports;