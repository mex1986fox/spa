import Vue from "vue/dist/vue.js";

const shops = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/delete", body)
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
      _body.append(
        "page",
        Number(Vue.prototype.$store.getters["shops/getPage"]) + 1
      );
    }
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/shops/show", _body)
      .then(response => {
        Vue.prototype.$store.commit(
          "shops/updatePage",
          response.body.data.page
        );
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  },
  // лайки
  createLike(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shops/api/like/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
export default shops;
