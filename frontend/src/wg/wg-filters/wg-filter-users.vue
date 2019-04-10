<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр пользователей</template>
    <template slot="content">
      <ui-ef-text value="Текст" caption="Текст" class="ui-ef-text_white"></ui-ef-text>
      <ui-ef-content caption="sdfsdf" class="ui-ef-content_white" :autoresize="150"></ui-ef-content>
      <wg-multi-location class="wg-multi-location_white"/>
      <wg-select-location class="wg-select-location_white"/>
    </template>
    <template slot="buttons">
      <input class="ui-button ui-button_float_white" type="button" value="Применить">
      <input class="ui-button ui-button_float_white" type="button" value="Отмена" @click="isHide">
    </template>
  </wg-filter>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  }
};
</script>
