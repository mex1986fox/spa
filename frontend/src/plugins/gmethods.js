
//глобальные методы для всех компонентов
const gmethods = {
  randKey: () => {
    return Math.floor(Math.random() * (1 - 999999)) + 1;
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, 'gmethods', {
      get() { return gmethods }
    })
  }
};

export default gmethods;