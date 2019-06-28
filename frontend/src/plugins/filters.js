const Filters = {
  install(Vue, options) {
    // 1. добавление глобальных фильтров
    Vue.filter("filter_date", function(value) {
      if (!value) return "";
      return value.replace(/\.[0-9]*/, "");
    });
    Vue.filter("filter_price", function(value) {
      if (!value) return "";
      return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
    });
    Vue.filter("filter_document_id", function(value) {
      if (!value) return "";
      return value == 1 ? "с документавми" : "без документов";
    });
    Vue.filter("filter_state_id", function(value) {
      if (!value) return "";
      return value == 1
        ? "не требует вложений (ОТС)"
        : value == 2
        ? "требует незначительных вложений (ХТС)"
        : "требует значительных вложений";
    });
    Vue.filter("filter_exchange_id", function(value) {
      if (!value) return "";
      return value == 1 ? "готов к обмену" : "не готов к обмену";
    });
    Vue.filter("filter_wheel_id", function(value) {
      if (!value) return "";
      return value == 1 ? "левый" : "правый";
    });
  }
};
export default Filters;
