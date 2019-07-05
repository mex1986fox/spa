const Hosts = {
  install(Vue, options) {
    // 1. добавление глобального метода или свойства
    Vue.prototype.$hosts = {
      services: "http://services.ru",
      userPhoto: "http://userphoto.ru:8085",
      postPhoto: "http://postphoto.ru:8088",
      adsPhoto: "http://adsphoto.ru:8090",
      shopsPhoto: "http://shopsphoto.ru:8092"
    };
  }
};
export default Hosts;
