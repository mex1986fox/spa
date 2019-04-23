<template>
  <form ref="formCreateUser">
    <div class="wg-form-registration__card-header">Укажите логин и пароль</div>
    <div class="wg-form-registration__card-ef">
      <ui-ef-text name="login" caption="Логин *" :help="excLogin"></ui-ef-text>
      <ui-ef-password name="password" caption="Пароль *" :help="excPassword"></ui-ef-password>
      <!-- <wg-captcha :help="excCaptcha"></wg-captcha> -->
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isCreateToken"
        :disabled="dSpinn"
        value="Войти"
      >
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
    <ui-snackbar :show="showSnackbar" type="err" :time="5000" @onHide="showSnackbar=false">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="showSnackbar=false"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excLogin: "",
      excPassword: "",
      // excCaptcha: "",
      excLogin: "",
      excPassword: "",
      showSnackbar: false,
      masSnackbar: "",
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
        this.$emit("onLogin");
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
    isCreateToken() {
      this.excLogin = "";
      this.excPassword = "";
      let form = this.$refs.formCreateUser;
      let body = new FormData(form);
      let login = body.get("login");
      let password = body.get("password");
      let fExc = false;
      if (login == undefined || login == "") {
        this.excLogin = "Заполните логин.";
        fExc = true;
      }
      if (password == undefined || password == "") {
        this.excPassword = "Заполните пароль.";
        fExc = true;
      }
      if (fExc == true) {
        return;
      }
      this.$http.post(this.$hosts.services + "/api/token/create", body).then(
        response => {
          if (response.body.data.access_token != undefined) {
            this.$store.dispatch("tokens/updateTokens", response.body.data);
          }
        },
        error => {
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.excLogin = exc["login"] ? exc["login"] : "";
          this.excPassword = exc["password"] ? exc["password"] : "";
        }
      );
    }
  }
};
</script>

