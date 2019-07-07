import token from "./token";
import locations from "./locations";
import transports from "./transports";
import profile from "./profile";
import user from "./user";
import userphoto from "./userphoto";
import post from "./post";
import postphoto from "./postphoto";
import ads from "./ads";
import adsphoto from "./adsphoto";
import shops from "./shops";
import shopsphoto from "./shopsphoto";
const api = Array();

api["token"] = token;
api["profile"] = profile;
api["locations"] = locations;
api["transports"] = transports;
api["user"] = user;
api["userphoto"] = userphoto;
api["post"] = post;
api["postphoto"] = postphoto;
api["ads"] = ads;
api["adsphoto"] = adsphoto;
api["shops"] = shops;
api["shopsphoto"] = shopsphoto;
const Api = {
  install(Vue, options) {
    Vue.prototype.$api = function(nameApi) {
      return api[nameApi];
    };
  }
};
export default Api;
