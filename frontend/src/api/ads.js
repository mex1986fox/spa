import Vue from "vue/dist/vue.js";

const ads = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/delete", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    // удалить пустые значения
    body.forEach((val, key) => {
      if (typeof val == "string" && val.length == 0) {
        delete body[key];
      }
    });
    // body["mileage2"]!=undefined && body["mileage2"].length == 0 ? body["mileage2"] : body["mileage2"].replace(/\s/g, '');
    // body["mileage"].length == 0 ? body["mileage"] : body["mileage"].replace(/\s/g, '');
    // body["power"].length == 0 ? body["power"] : body["power"].replace(/\s/g, '');
    // body["power2"].length == 0 ? body["power2"] : body["power2"].replace(/\s/g, '');
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/show", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  // лайки
  createLike(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/like/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

};
export default ads;
