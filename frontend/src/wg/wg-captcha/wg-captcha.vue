<template>
  <div class="wg-captcha">
    <ui-ef-checkbox :checked="checkedCheckbox" @onClick="isShowMenu">{{dCaption}}</ui-ef-checkbox>
    <div v-if="dTime!=undefined">{{dTime}}</div>
    <span class="wg-captcha__help" :class="{'wg-captcha__help_active':dHelp}">{{help}}</span>

    <input type="hidden" name="captcha_token" :value="sendToken">
    <ui-blind :show="dShowMenu" class="wg-captcha__blinde" @onClick="isHideMenu" position="fixed">
      <div class="wg-captcha__menu">
        <div class="wg-captcha__menu-header">Пройдите каптчу {{dTime!=undefined?dTime:""}}</div>
        <div class="wg-captcha__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="wg-captcha__menu-captcha">
          <img v-if="src!=undefined" :src="src">
          <ui-spinner v-if="src==undefined" class="ui-spinner_s1"/>
        </div>

        <div class="wg-captcha__menu-ef">
          <ui-ef-text caption="Вветиде символы с картинки" @onInput="isInputText" :help="helpmenu"></ui-ef-text>
        </div>
        <div class="wg-captcha__menu-buttons">
          <input
            type="button"
            class="ui-button ui-button_float_black"
            @click="isConfirmCaptcha"
            :disabled="flConfirmreCapcha==true || src==undefined"
            value="Отправить"
          >
          <input
            type="button"
            class="ui-button ui-button_float_black"
            @click="isShowCaptcha"
            :disabled="flConfirmreCapcha==true || src==undefined"
            value="Обновить"
          >
          <ui-spinner v-if="flConfirmreCapcha==true" class="ui-spinner_s1"/>
        </div>
      </div>
    </ui-blind>
  </div>
</template>
<script>
export default {
  name: "wg-captcha",
  data() {
    return {
      dCaption: "Я не робот",
      dShowMenu: false,
      token: undefined,
      sendToken: undefined, //токен для оотправки
      src: undefined,
      answer: "",
      check: false,
      checkedCheckbox: false,
      dTimer: undefined,
      dPayload: undefined,
      dTime: undefined,
      helpmenu: "",
      dHelp: this.help,
      flConfirmreCapcha: false
    };
  },
  props: {
    help: {
      type: String,
      default: ""
    }
  },
  watch: {
    help(newQ) {
      this.dHelp = newQ;
    },
    sendToken(newQ) {
      if (newQ != undefined) {
        this.$emit("onChecked");
      } else {
        this.$emit("onNotChecked");
      }
    }
  },
  methods: {
    isShowMenu() {
      this.helpmenu = "";
      this.flConfirmreCapcha = false;
      if (this.check == false) {
        setTimeout(() => {
          this.checkedCheckbox = true;
        }, 4);
        setTimeout(() => {
          this.checkedCheckbox = false;
        }, 4);
        this.dShowMenu = true;
        this.isCreateCaptcha();
      } else {
        setTimeout(() => {
          this.checkedCheckbox = false;
        }, 4);
        setTimeout(() => {
          this.checkedCheckbox = true;
        }, 4);
      }
    },
    isStartTimer() {
      let count = 5;
      this.dTimer = setInterval(() => {
        let minutes = parseInt(
          (this.dPayload.exp - this.dPayload.iat - count) / 60,
          10
        );
        let seconds = parseInt(
          (this.dPayload.exp - this.dPayload.iat - count) % 60,
          10
        );
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.dTime = minutes + ":" + seconds;
        count = count + 1;
        if (this.dPayload.exp - this.dPayload.iat - count == 0) {
          this.dCaption = "Я не робот";
          this.dShowMenu = false;
          this.check = false;
          this.checkedCheckbox = false;
          this.token = undefined;
          (this.sendToken = undefined), (this.src = undefined);
          this.answer = "";
          this.dPayload = undefined;
          this.dTime = undefined;
          clearInterval(this.dTimer);
          this.dTimer = undefined;
        }
      }, 1000);
    },
    isHideMenu() {
      this.dShowMenu = false;
      if (this.check == true) {
        this.checkedCheckbox = true;
        this.dHelp = "";
      } else {
        this.checkedCheckbox = false;
        this.token = undefined;
        this.src = undefined;
        this.answer = "";
        clearInterval(this.dTimer);
        this.dTimer = undefined;
        this.dPayload = undefined;
        this.dTime = undefined;
      }
    },
    isInputText(text) {
      if (text != undefined) {
        this.answer = text;
      } else {
        this.answer = "";
      }
    },
    isCreateCaptcha() {
      this.$http
        .post(this.$hosts.services + "/captcha/api/captcha/create")
        .then(
          response => {
            if (response.body.status == "ok") {
              this.token = response.body.data.token;
              let tokenPayloadHex = this.token.split(".")[1];
              let tokenPayload = atob(tokenPayloadHex);
              this.dPayload = JSON.parse(tokenPayload);
              this.isShowCaptcha();
              this.isStartTimer();
            }
          },
          error => {
            console.dir(error);
          }
        );
    },
    isShowCaptcha() {
      let body = new FormData();
      body.set("token", this.token);
      this.$http
        .post(this.$hosts.services + "/captcha/api/captcha/show", body)
        .then(
          response => {
            if (response.body.status == "ok") {
              this.src = response.body.data.src;
            }
          },
          error => {
            console.dir(error);
          }
        );
    },
    isConfirmCaptcha() {
      this.flConfirmreCapcha = true;
      this.helpmenu = "";
      if (this.answer == "") {
        this.helpmenu = "Пустой ответ";
        this.flConfirmreCapcha = false;
        return;
      }
      var Reg61 = new RegExp("^.*[^a-z0-9].*$");
      if (Reg61.test(this.answer)) {
        this.helpmenu = "Только латиница прописью и цифры";
        this.flConfirmreCapcha = false;
        return;
      }
      let body = new FormData();
      body.set("token", this.token);
      body.set("answer", this.answer);
      this.$http
        .post(this.$hosts.services + "/captcha/api/captcha/confirm", body)
        .then(
          response => {
            if (response.body.status == "ok") {
              this.flConfirmreCapcha = false;
              this.sendToken = response.body.data.token;
              this.check = true;
              this.dCaption = "Действительно! Вы не робот.";
              this.isHideMenu();
            }
          },
          error => {
            if (error.body.data.answer == "Не верный.") {
              this.flConfirmreCapcha = false;
              this.helpmenu = "Не верный ответ";
              this.isShowCaptcha();
            }
          }
        );
    }
  }
};
</script>

