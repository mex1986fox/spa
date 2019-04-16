import Vue from "vue/dist/vue.js";
const locations = {
  namespaced: true,
  state: {
    countries: undefined,
    cities: undefined,
    subjects: undefined
  },
  getters: {
    getCountry: (state, getters, rootState, rootGetters) => id => {
      for (let country of state.countries) {
        if (id == country.country_id) {
          return country;
        }
      }
      return undefined;
    },
    getCity: (state, getters, rootState, rootGetters) => id => {
      for (let city of state.cities) {
        if (id == city.city_id) {
          return city;
        }
      }
      return undefined;
    },
    getSubject: (state, getters, rootState, rootGetters) => id => {
      if (state.subjects != undefined) {
        for (let subject of state.subjects) {
          if (id == subject.subject_id) {
            return subject;
          }
        }
      }
      return undefined;
    },
    getCities: (state, getters, rootState, rootGetters) => idSubj => {
      return state.cities.filter(city => {
        return city.subject_id == idSubj;
      });
    },
    getSubjects: (state, getters, rootState, rootGetters) => idCont => {
      return state.subjects.filter(subj => {
        return subj.country_id == idCont;
      });
    }
  },
  mutations: {
    updateLocations(state, locations) {
      let countries = locations.countries;
      state.countries = countries.map(countr => {
        countr["extended_name"] =
          countr["name"].charAt(0).toUpperCase() + countr["name"].slice(1);
        return countr;
      });

      let subjects = locations.subjects;
      state.subjects = subjects.map(subj => {
        let country_name = countries.filter(countr => {
          return countr.country_id == subj.country_id;
        })[0].name;
        subj["extended_name"] = subj["name"] + " (" + country_name + ")";
        return subj;
      });

      let cities = locations.cities;
      state.cities = cities.map(settl => {
        let subject_name = subjects.filter(subj => {
          return subj.subject_id == settl.subject_id;
        })[0].name;
        settl["extended_name"] = settl["name"] + " (" + subject_name + ")";
        return settl;
      });
    }
  },
  actions: {
    loadLocations(context) {
      let state = context.state;
      if (
        state.countries == undefined ||
        state.cities == undefined ||
        state.subjects == undefined
      ) {
        Vue.http
          .post(Vue.prototype.$hosts.services + "/api/locations/show")
          .then(
            response => {
              context.commit("updateLocations", response.body.data);
            },
            error => { }
          );
      }
    }
  }
};
export default locations;
