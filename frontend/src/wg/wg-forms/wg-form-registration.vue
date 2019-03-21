<template>
  <ui-animation-display v-if="dShow==true"
                        :animate="'opacity'">
    <div v-if="dShow==true"
         class="wg-form-registration">
      <ui-animation-display v-if="dShowAnimation==true"
                            :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">Пройдите регистрацию заполняя формы</div>
            <div class="wg-form-registration__menu-buttons">
              <div @click="isHide()"
                   class="ui-button ui-button_float_white ui-button_circle_s2">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
          <ui-animation-display v-if="show2==true"
                                :animate="'right'">
            <div class="wg-form-registration__card">
              <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
              <div class="wg-form-registration__card-buttons">
                <div class="ui-button ui-button_float_black">Отправит</div>
                <div class="ui-button ui-button_float_black">Отменить</div>
              </div>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="show1==true"
                                :animate="'right'">
            <div class="wg-form-registration__card">
              <div class="wg-form-registration__card-header">Загрузите фотографии</div>
              <div class="wg-form-registration__card-buttons">
                <ui-button-file></ui-button-file>
              </div>
            </div>
          </ui-animation-display>
          <div class="wg-form-registration__card">
            <div class="wg-form-registration__card-header">Укажите регистрационные данные</div>
            <div class="wg-form-registration__card-ef">
              <ui-ef-text caption="Логин *"></ui-ef-text>
              <ui-ef-password caption="Пароль *"></ui-ef-password>
              <ui-ef-text caption="Каптчу *"></ui-ef-text>
            </div>
            <div class="wg-form-registration__card-buttons">
              <div class="ui-button ui-button_float_black"
                   @click="autoheight()">Отправит</div>
              <div class="ui-button ui-button_float_black">Отменить</div>
            </div>
          </div>
        </div>
      </ui-animation-display>
    </div>
  </ui-animation-display>
</template>

<script>
export default {
  name: "wg-form-registration",
  data() {
    return {
      dShow: this.show,
      dShowAnimation: false,
      show1: true,
      show2: false,
      clientHeigthContainer: undefined
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
      if (newQ == true) {
        setTimeout(() => {
          let scrollTop = this.$el.parentNode.scrollTop;
          this.$el.style.marginTop = scrollTop + "px";
          this.dShowAnimation = true;
        }, 4);
      }
    }
  },
  methods: {
    autoheight() {
      this.show1 = true;
    },
    autoheight2() {
      this.show2 = true;
    },
    isHide() {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$emit("onHide");
      }, 300);
    }
  },

  mounted() {
    if (this.show == true) {
      setTimeout(() => {
        let scrollTop = this.$el.parentNode.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
        this.dShowAnimation = true;
      }, 4);
    }
    this.$el.parentNode.addEventListener("scroll", ev => {
      if (this.$el.style != undefined) {
        let scrollTop = ev.target.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
      }
    });
  }
};
</script>