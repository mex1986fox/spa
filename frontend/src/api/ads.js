import Vue from "vue/dist/vue.js";

const ads = {
  create(body) {
    // редактируем поля
    if (body.get("mileage") != undefined) {
      body.set("mileage", body.get("mileage").replace(/\s/g, ""));
    }
    if (body.get("price") != undefined) {
      body.set("price", body.get("price").replace(/\s/g, ""));
    }
    if (body.get("power") != undefined) {
      body.set("power", body.get("power").replace(/\s/g, ""));
    }
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    // редактируем поля
    if (body.get("mileage") != undefined) {
      body.set("mileage", body.get("mileage").replace(/\s/g, ""));
    }
    if (body.get("price") != undefined) {
      body.set("price", body.get("price").replace(/\s/g, ""));
    }
    if (body.get("power") != undefined) {
      body.set("power", body.get("power").replace(/\s/g, ""));
    }
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
    let _body = new FormData();
    // удалить пустые значения
    body.forEach((val, key) => {
      if (typeof val == "string" && val.length != 0) {
        _body.append(key, val);
      }
    });
    if (body.get("page") == undefined) {
      _body.append("page", Number(Vue.prototype.$store.getters["ads/getPage"]) + 1);
    }
    _body.get("mileage") != undefined && _body.set("mileage", _body.get("mileage").replace(/\s/g, ""));
    _body.get("mileage2") != undefined && _body.set("mileage2", _body.get("mileage2").replace(/\s/g, ""));
    _body.get("power") != undefined && _body.set("power", _body.get("power").replace(/\s/g, ""));
    _body.get("power2") != undefined && _body.set("power2", _body.get("power2").replace(/\s/g, ""));
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/ads/api/ads/show", _body)
      .then(response => {
        Vue.prototype.$store.commit("ads/updatePage", response.body.data.page);
        return Promise.resolve(response)
      })
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
