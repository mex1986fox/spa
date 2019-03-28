<template>
  <div class="lt-main">
    <div class="lt-main__menu">
      <lt-main-profile @onShowRegistration="showRegistration = true"></lt-main-profile>
      <ul class="lt-main__menu-list">
        <li class="lt-main__menu-item">Люди</li>
        <li class="lt-main__menu-item">Люди</li>
        <li class="lt-main__menu-item">Люди</li>
        <li class="lt-main__menu-item">Люди</li>
      </ul>
    </div>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Люди</div>
        <div class="lt-main-menu__buttons">
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3">
            <i class="fas fa-sliders-h"></i>
          </div>
        </div>
      </lt-main-menu>

      <div v-for="val in 20" :key="val" class="wg-card-user">
        <!-- <div class="wg-card-user__button-close">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>-->
        <div class="wg-card-user__photo">
          <img
            class="wg-card-user__img"
            src="http://www.fotoprizer.ru/img/111116-112740-ft.jpg"
            alt
          >
        </div>
        <div class="wg-card-user__button-menu">
          <div class="ui-button ui-button_float_black ui-button_noborder ui-button_circle_s1">
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <span class="wg-card-user__nickname">Anjeles</span>
        <span class="wg-card-user__name">Анжелика Варумина</span>
      </div>
      <wg-form-registration :show="showRegistration" @onHide="showRegistration = false"></wg-form-registration>
    </div>
  </div>
</template>
<script>
export default {
  name: "lt-main",
  data() {
    return {
      showRegistration: true
    };
  },
  methods: {}
};
</script>
