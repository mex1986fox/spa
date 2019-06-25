<template>
  <ui-blind :show="dShow">
    <div class="wg-form-registration">
      <ui-animation-display v-if="dShowAnimation==true" :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">{{dHeader}}</div>
            <div class="wg-form-registration__menu-buttons">
              <div @click="isHide()" class="ui-button ui-button_float_white ui-button_circle_s2">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>

          <ui-animation-display v-if="showCard==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-login-card-main @onLogin="isHide"/>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>

<script>
import WgFormLoginCardMain from "./card-main.vue";
export default {
  name: "wg-form-login",
  components: { WgFormLoginCardMain },
  data() {
    return {
      dHeader: "Вход ",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
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
        }, 100);
      }
    }
  },
  methods: {
    isHide() {
      this.dShowAnimation = false;
      this.$emit("onHide");
    }
  },
  mounted() {
    if (this.dShow == true) {
      setTimeout(() => {
        let scrollTop = this.$el.parentNode.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
        this.dShowAnimation = true;
      }, 4);
    }
  }
};
</script>