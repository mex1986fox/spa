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
      <ui-animation-display v-if="show2==true" :animate="'right'">
        <div class="wg-form-registration__card">
          <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
          <div class="wg-form-registration__card-buttons">
            <div class="ui-button ui-button_float_black">Отправит</div>
            <div class="ui-button ui-button_float_black">Отменить</div>
          </div>
        </div>
      </ui-animation-display>
      <ui-animation-display v-if="show==true" :animate="'right'">
        <div class="wg-form-registration__card">
          <div class="wg-form-registration__card-header">Загрузите фотографии</div>
          <div class="wg-form-registration__card-buttons">
            <div class="ui-button ui-button_float_black" @click="autoheight2()">Отправит</div>
            <div class="ui-button ui-button_float_black">Отменить</div>
          </div>
        </div>
      </ui-animation-display>
      <div class="wg-form-registration__card">
        <div class="wg-form-registration__card-header">Укажите регистрационные данные</div>
        <div class="wg-form-registration__card-ef">
          <ui-ef-text caption="Текстовое поле:"></ui-ef-text>
          <ui-ef-text caption="Текстовое поле не активное:" :disabled="true"></ui-ef-text>
          <ui-ef-phone caption="Телефонное поле:"></ui-ef-phone>
          <ui-ef-phone caption="Телефонное поле:" :disabled="true"></ui-ef-phone>
          <ui-ef-password caption="Password поле:"></ui-ef-password>
          <ui-ef-password caption="Password поле:" :disabled="true"></ui-ef-password>
        </div>
        <div class="wg-form-registration__card-buttons">
          <div class="ui-button ui-button_float_black" @click="autoheight()">Отправит</div>
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
    return {
      show: false,
      show2: false,
      clientHeigthContainer: undefined
    };
  },
  methods: {
    autoheight() {
      this.show = true;
    },
    autoheight2() {
      this.show2 = true;
    }
  },
  mounted() {
    // this.$el.addEventListener("click", ev => {
    //   let container = this.$el.querySelector(
    //     ".wg-form-registration__container"
    //   );
    //   let clientHeigthContainer = container.clientHeight;
    //   let heigthContainer = container.height;
    //   container.style.height = clientHeigthContainer + "px";
    //   container.parentNode.scrollTop= clientHeigthContainer;
    // });
    this.$el.parentNode.addEventListener("scroll", ev => {
      let scrollTop = ev.target.scrollTop;
      this.$el.style.marginTop = scrollTop + "px";
    });
  }
};
</script>