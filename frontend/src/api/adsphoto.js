import Vue from "vue/dist/vue.js";

const adsphoto = {
  upload(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/adsphoto/api/photo/upload",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/adsphoto/api/photo/delete",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/adsphoto/api/photo/show", body)
      .then(response => {
        response.body.data.albums = response.body.data.albums.map(album => {
          let orig = {};
          for (const key in album.origin) {
            orig[key] = Vue.prototype.$hosts.adsPhoto + album.origin[key];
          }
          let min = {};
          for (const key in album.mini) {
            min[key] = Vue.prototype.$hosts.adsPhoto + album.mini[key];
          }
          album.mini = min;
          album.origin = orig;
          return album;
        });
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  },
  //отметка главного фото
  checkMain(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/adsphoto/api/photo/checkMain",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  // альбом
  deleteAlbum(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/adsphoto/api/album/delete",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
export default adsphoto;
