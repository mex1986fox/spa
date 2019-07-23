const Filters = {
  install(Vue, options) {
    // 1. добавление глобальных фильтров
    Vue.filter("filter_date", function (value) {
      if (!value) return "";
      return value.replace(/\.[0-9]*/, "");
    });
    Vue.filter("filter_price", function (value) {
      if (!value) return "";
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    });
    Vue.filter("filter_document_id", function (value) {
      if (!value) return "";
      return value == 1 ? "с документавми" : "без документов";
    });
    Vue.filter("filter_state_id", function (value) {
      if (!value) return "";
      return value == 1
        ? "не требует вложений (ОТС)"
        : value == 2
          ? "требует незначительных вложений (ХТС)"
          : "требует значительных вложений";
    });
    Vue.filter("filter_exchange_id", function (value) {
      if (!value) return "";
      return value == 1 ? "готов к обмену" : "не готов к обмену";
    });
    Vue.filter("filter_wheel_id", function (value) {
      if (!value) return "";
      return value == 1 ? "левый" : "правый";
    });
    Vue.filter("filter_for_transport", function (type, brand, model) {
      if (type != null && brand == null) {
        return type + ", всех марок и моделей"
      }
      if (type != null && brand != null && model == null) {
        return type + ", " + brand + ", всех моделей"
      }
      if (type != null && brand != null && model != null) {
        return type + ", " + brand + ", " + model
      }
      return "";
    });
    Vue.filter('reverse', function (value) {
      // slice to make a copy of array, then reverse the copy
      return value.slice().reverse();
    });
  }
};
export default Filters;
