const Hosts = {
  install(Vue, options) {
    // 1. добавление глобального метода или свойства
    Vue.prototype.$hosts = {
      services: "http://services.ru"
    };
  }
};
export default Hosts;
