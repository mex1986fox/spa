<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр пользователей</template>
    <template slot="content">
      <ui-ef-text caption="Логин" class="ui-ef-text_white"></ui-ef-text>
      <ui-ef-text caption="Имя" class="ui-ef-text_white"></ui-ef-text>
      <ui-ef-text caption="Фамилия" class="ui-ef-text_white"></ui-ef-text>
      <wg-multi-location caption="Места проживания" class="wg-multi-location_white"/>
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
