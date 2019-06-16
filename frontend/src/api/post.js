import Vue from "vue/dist/vue.js";

const post = {
  create(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  update(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/update", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/delete", body)
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
        Number(Vue.prototype.$store.getters["posts/getPage"]) + 1
      );
    }
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/post/show", _body)
      .then(response => {
        Vue.prototype.$store.commit(
          "posts/updatePage",
          response.body.data.page
        );
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  },
  // лайки
  createLike(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/post/api/like/create", body)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
export default post;
