<template>
  <div class="wg-form-registration">
    <div class="wg-form-registration__container">
      <div class="wg-form-registration__menu">
        <div class="wg-form-registration__menu-header">Пройдите регистрацию заполняя формы</div>
        <div class="wg-form-registration__menu-buttons">
          <div class="ui-button ui-button_float_white ui-button_circle_s2">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="wg-form-registration__card">
        <div class="wg-form-registration__card-header">Укажите регистрационные данные</div>
        <div class="wg-form-registration__card-buttons">
          <div class="ui-button ui-button_float_black">Отправит</div>
          <div class="ui-button ui-button_float_black">Отменить</div>
        </div>
      </div>
      <div class="wg-form-registration__card">
        <div class="wg-form-registration__card-header">Загрузите фотографии</div>
        <div class="wg-form-registration__card-buttons">
          <div class="ui-button ui-button_float_black">Отправит</div>
          <div class="ui-button ui-button_float_black">Отменить</div>
        </div>
      </div>
      <div class="wg-form-registration__card">
        <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
        <div class="wg-form-registration__card-buttons">
          <div class="ui-button ui-button_float_black">Отправит</div>
          <div class="ui-button ui-button_float_black">Отменить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wg-form-registration",
  data() {
    return {};
  },
  mounted() {
    this.$el.parentNode.addEventListener("scroll", ev => {
      let scrollTop = ev.target.scrollTop;
      this.$el.style.marginTop = scrollTop + "px";
    });
  }
};
</script>