import Vue from "vue/dist/vue.js";

const shopsphoto = {
  upload(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/shopsphoto/api/photo/upload",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/shopsphoto/api/photo/delete",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  show(body) {
    return Vue.http
      .post(Vue.prototype.$hosts.services + "/shopsphoto/api/photo/show", body)
      .then(response => {
        console.dir(response);
        response.body.data.albums = response.body.data.albums.map(album => {
          let orig = {};
          for (const key in album.origin) {
            orig[key] = Vue.prototype.$hosts.shopsPhoto + album.origin[key];
          }
          let min = {};
          for (const key in album.mini) {
            min[key] = Vue.prototype.$hosts.shopsPhoto + album.mini[key];
          }
          album.mini = min;
          album.origin = orig;
          return album;
        });
        console.dir(response);
        return Promise.resolve(response);
      })
      .catch(error => Promise.reject(error));
  },

  // альбом
  deleteAlbum(body) {
    return Vue.http
      .post(
        Vue.prototype.$hosts.services + "/shopsphoto/api/album/delete",
        body
      )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
export default shopsphoto;
