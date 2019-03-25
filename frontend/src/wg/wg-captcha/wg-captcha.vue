<template>
  <div class="wg-captcha">
    <ui-ef-checkbox @onClick="isShowMenu">{{"Я не робот"}}</ui-ef-checkbox>

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
          <img src="https://cdn-images-1.medium.com/max/2600/1*uq_w8ytWwx5GjmFzgTUwqw.gif">
        </div>

        <div class="wg-captcha__menu-ef">
          <ui-ef-text caption="Вветиде символы с картинки"></ui-ef-text>
        </div>
        <div class="wg-captcha__menu-buttons">
          <div class="ui-button ui-button_float_black">Отправить</div>
          <div class="ui-button ui-button_float_black">Обновить</div>
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
      dShowMenu: false
    };
  },
  methods: {
    isShowMenu() {
      this.dShowMenu = true;
    },
    isHideMenu() {
      this.dShowMenu = false;
    }
  }
};
</script>

