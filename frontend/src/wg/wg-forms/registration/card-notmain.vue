<template>
  <form ref="formUpdateUser">
    <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
    <div class="wg-form-registration__card-ef">
      <ui-ef-text caption="Имя"></ui-ef-text>
      <ui-ef-text caption="Фамилия"></ui-ef-text>
      <ui-ef-datepicker name="neweare" caption="День рождения" value></ui-ef-datepicker>
      <ui-ef-phone caption="Номер телефона"></ui-ef-phone>
      <wg-multiple-location/>
    </div>
    <div class="wg-form-registration__card-buttons">
      <div class="ui-button ui-button_float_black" @click="isUpdateUser">Отправить</div>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isUpdateUser() {
      let form = this.$refs.formUpdateUser;
      let body = new FormData(form);
      body.set("access_token", this.token);
      this.$http.post(this.$hosts.services + "/api/user/update", body).then(
        response => {
          if (response.body.status == "ok") {
            console.log(response.body);
          }
        },
        error => {
          if (error.body.status == "except") {
          
          }
          //   console.dir(error);
        }
      );
    }
  }
};
</script>
