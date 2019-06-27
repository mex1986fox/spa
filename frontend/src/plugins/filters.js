const Filters = {
  install(Vue, options) {
    // 1. добавление глобальных фильтров
    Vue.filter('filter_date', function (value) {
      if (!value) return '';
      return value.replace(/\.[0-9]*/, '');
    })
    Vue.filter('filter_price', function (value) {
      if (!value) return '';
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    })

  }
};
export default Filters;
