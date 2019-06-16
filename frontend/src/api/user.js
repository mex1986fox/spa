import Vue from "vue/dist/vue.js";

const user = {
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
        Number(Vue.prototype.$store.getters["users/getPage"]) + 1
      );
    }
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/user/api/users/show", _body)
      .then(response => {
        Vue.prototype.$store.commit(
          "users/updatePage",
          response.body.data.page
        );
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  }
};
export default user;
