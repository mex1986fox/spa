<template>
  <form ref="formCreateUser">
    <div class="wg-form-registration__card-header">Укажите регистрационные данные</div>
    <div class="wg-form-registration__card-ef">
      <ui-ef-text name="login" caption="Логин *" :help="excLogin"></ui-ef-text>
      <ui-ef-password name="password" caption="Пароль *" :help="excPassword"></ui-ef-password>
      <wg-captcha :help="excCaptcha"></wg-captcha>
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isCreateUser"
        :disabled="dSpinn"
        value="Отправить"
      >
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excLogin: "",
      excPassword: "",
      excCaptcha: "",
      dSpinn: false
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    token(newQ) {
      if (newQ != undefined) {
        this.$emit("onUserCreated");
      }
    }
  },
  methods: {
    isInputLogin(login) {
      this.dLogin = login;
    },
    isInputPassword(password) {
      this.dPassword = password;
    },
    isCreateUser() {
      //проверить поля перед отправкой

      let form = this.$refs.formCreateUser;
      let body = new FormData(form);
      let login = body.get("login");
      let password = body.get("password");
      let captcha_token = body.get("captcha_token");
      let fExc = false;
      if (login == undefined || login == "") {
        this.excLogin = "Заполните логин.";
        fExc = true;
      }
      if (password == undefined || password == "") {
        this.excPassword = "Заполните пароль.";
        fExc = true;
      }
      if (captcha_token == undefined || captcha_token == "") {
        this.excCaptcha = "Подтвердите что вы не робот.";
        fExc = true;
      }
      if (fExc == true) {
        return;
      }
      this.dSpinn = true;
      this.$http.post(this.$hosts.services + "/api/profile/create", body).then(
        response => {
          if (response.body.status == "ok") {
            this.isCreateToken();
            if (this.token != undefined) {
              this.dSpinn = false;
            }
          }
        },
        error => {
          if (error.body.status == "except") {
            let exc = error.body.data;
            this.excLogin = exc["login"] ? exc["login"] : "";
            this.excPassword = exc["password"] ? exc["password"] : "";
            this.excCaptcha = exc["captcha_token"] ? exc["captcha_token"] : "";
            this.dSpinn = false;
          }
          //   console.dir(error);
        }
      );
    },
    isCreateToken() {
      let form = this.$refs.formCreateUser;
      let body = new FormData(form);
      let mbody = {
        password: body.get("password"),
        login: body.get("login")
      };
      this.$store.dispatch("tokens/creteTokens", mbody);
    }
  }
};
</script>

