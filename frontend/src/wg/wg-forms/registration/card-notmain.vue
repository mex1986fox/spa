<template>
  <form ref="formUpdateUser">
    <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
    <div class="wg-form-registration__card-ef">
      <ui-ef-text caption="Имя" name="name" :help="excName" :maxlength="63"/>
      <ui-ef-text caption="Фамилия" name="surname" :help="excSurname" :maxlength="63"/>
      <ui-ef-datepicker name="birthdate" caption="День рождения" value/>
      <wg-select-location name="city_id"/>
      <ui-ef-phone caption="Номер телефона" name="phone" :help="excPhone"/>
      <ui-ef-text caption="Email" name="email" :help="excEmail"/>
    </div>
    <div class="wg-form-registration__card-buttons">
      <div class="ui-button ui-button_float_black" @click="isUpdateProfile">Отправить</div>
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excName: undefined,
      excSurname: undefined,
      excPhone: undefined,
      excEmail: undefined,
      dSpinn: false
    };
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isUpdateProfile() {
      this.dSpinn = true;
      this.excName = undefined;
      this.excSurname = undefined;
      this.excPhone = undefined;
      this.excEmail = undefined;

      let form = this.$refs.formUpdateUser;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let flExc = false;
      // проверяем поля

      if (body.get("email") != "") {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var address = body.get("email");
        if (reg.test(address) == false) {
          this.excEmail = "Email не корректный.";
          flExc = true;
        }
      }
      if (body.get("phone") != undefined) {
        let phone = body.get("phone").replace(/[^0-9]/gim, "");
        if (phone.length > 1 && phone.length < 11) {
          this.excPhone = "Ввели не все цифры.";
          flExc = true;
        }
        body.set("phone", phone);
        if (phone.length == 1) {
          body.set("phone", "");
        }
      }
      // если есть ошибки запрос не отправляем
      if (flExc == true) {
        this.dSpinn = false;
        return;
      }

      this.$http.post(this.$hosts.services + "/api/profile/update", body).then(
        response => {
          if (response.body.status == "ok") {
            // console.log(response.body.data.user);
            // обновляем профайл пользователя
            this.$store.commit(
              "profile/updateProfile",
              response.body.data.profile
            );
            this.$emit("onUserUpdated");
            this.dSpinn = false;
          }
        },
        error => {
          if (error.body.status == "except") {
            this.dSpinn = false;
            let exc = error.body.data;
            this.excName = exc["name"] ? exc["name"] : "";
            this.excSurname = exc["surname"] ? exc["surname"] : "";
            this.excPhone = exc["phone"] ? exc["phone"] : "";
            this.excEmail = exc["email"] ? exc["email"] : "";
          }
        }
      );
    }
  }
};
</script>
