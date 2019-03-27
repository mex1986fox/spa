<template>
  <form ref="formCreateUser">
    <div class="wg-form-registration__card-header">Укажите регистрационные данные</div>
    <div class="wg-form-registration__card-ef">
      <ui-ef-text @onInput="isInputLogin" name="login" caption="Логин *" :help="excLogin"></ui-ef-text>
      <ui-ef-password
        @onInput="isInputPassword"
        name="password"
        caption="Пароль *"
        :help="excPassword"
      ></ui-ef-password>
      <wg-captcha :help="excCaptcha"></wg-captcha>
    </div>
    <div class="wg-form-registration__card-buttons">
      <div class="ui-button ui-button_float_black" @click="isCreateUser">Отправить</div>
      <div class="ui-button ui-button_float_black">Отменить</div>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      dLogin: undefined,
      dLogin: undefined,
      excLogin: "",
      excPassword: "",
      excCaptcha: ""
    };
  },
  computed: {
    token() {
      return this.$store.getters["access_token/getToken"];
    }
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
      let form = this.$refs.formCreateUser;
      let body = new FormData(form);
      this.$http.post(this.$hosts.services + "/api/user/create", body).then(
        response => {
          if (response.body.status == "ok") {
            this.isCreateToken();
          }
        },
        error => {
          if (error.body.status == "except") {
            let exc = error.body.data;
            this.excLogin = exc["login"] ? exc["login"] : "";
            this.excPassword = exc["password"] ? exc["password"] : "";
            this.excCaptcha = exc["captcha_token"] ? exc["captcha_token"] : "";
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
      this.$store.dispatch("access_token/creteTokens", mbody);
    }
  }
};
</script>

