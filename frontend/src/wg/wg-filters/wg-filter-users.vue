<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр пользователей</template>
    <template slot="content">
      <form ref="formFilterUsers">
        <ui-ef-text name="login" caption="Логин" class="ui-ef-text_white"></ui-ef-text>
        <ui-ef-text name="name" caption="Имя" class="ui-ef-text_white"></ui-ef-text>
        <ui-ef-text name="surname" caption="Фамилия" class="ui-ef-text_white"></ui-ef-text>
        <wg-multi-location caption="Места проживания" class="wg-multi-location_white"/>
      </form>
    </template>
    <template slot="buttons">
      <input
        class="ui-button ui-button_float_white"
        type="button"
        value="Применить"
        @click="isShowUsers"
      >
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
    },
    isShowUsers() {
      let form = this.$refs.formFilterUsers;
      let body = new FormData(form);
      this.$http.post(this.$hosts.services + "/api/user/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.users = response.body.data;
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    }
  }
};
</script>
