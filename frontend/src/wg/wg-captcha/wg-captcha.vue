<template>
  <div class="wg-captcha">
    <ui-ef-checkbox :checked="checkedCheckbox" @onClick="isShowMenu">{{dCaption}}</ui-ef-checkbox>

    <!-- <input type="hidden" :name="name" :value="dValue"> -->
    <ui-blind :show="dShowMenu" class="wg-captcha__blinde" @onClick="isHideMenu" position="fixed">
      <div class="wg-captcha__menu">
        <div class="wg-captcha__menu-header">Пройдите каптчу</div>
        <div class="wg-captcha__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="wg-captcha__menu-captcha">
          <img v-if="src!=undefined" :src="src">
        </div>

        <div class="wg-captcha__menu-ef">
          <ui-ef-text caption="Вветиде символы с картинки" @onInput="isInputText" :help="help"></ui-ef-text>
        </div>
        <div class="wg-captcha__menu-buttons">
          <div class="ui-button ui-button_float_black" @click="isConfirmCaptcha">Отправить</div>
          <div class="ui-button ui-button_float_black" @click="isShowCaptcha">Обновить</div>
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
      src: undefined,
      answer: "",
      check: false,
      checkedCheckbox: false,
      help: ""
    };
  },
  methods: {
    isShowMenu() {
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
    isHideMenu() {
      this.dShowMenu = false;
      if (this.check == true) {
        this.checkedCheckbox = true;
      } else {
        this.checkedCheckbox = false;
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
      this.$http.post(this.$hosts.services + "/api/captcha/create").then(
        response => {
          if (response.body.status == "ok") {
            this.token = response.body.data.token;
            this.isShowCaptcha();
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
      this.$http.post(this.$hosts.services + "/api/captcha/show", body).then(
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
      this.help = "";
      if (this.answer == "") {
        this.help = "Пустой ответ";
        return;
      }
      var Reg61 = new RegExp("^.*[^a-z0-9].*$");
      if (Reg61.test(this.answer)) {
        this.help = "Только латиница прописью и цифры";
        return;
      }
      let body = new FormData();
      body.set("token", this.token);
      body.set("answer", this.answer);
      this.$http.post(this.$hosts.services + "/api/captcha/confirm", body).then(
        response => {
          if (response.body.status == "ok") {
            this.check = true;
            this.dCaption = "Действительно! Вы не робот.";
            this.isHideMenu();
          }
        },
        error => {
          if (error.body.data.answer == "Не верный.") {
            this.help = "Не верный ответ";
            this.isShowCaptcha();
          }
        }
      );
    }
  }
};
</script>

