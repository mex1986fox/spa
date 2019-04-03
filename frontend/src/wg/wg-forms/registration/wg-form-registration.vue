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

          <ui-animation-display v-if="showCardPhoto==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-registration-card-photo></wg-form-registration-card-photo>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardNotMain==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-registration-card-notmain @onUserUpdated="isShowCardPhoto"></wg-form-registration-card-notmain>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardMain==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-registration-card-main @onUserCreated="isShowCardNotMain"></wg-form-registration-card-main>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>

<script>
import WgFormRegistrationCardMain from "./card-main.vue";
import WgFormRegistrationCardNotmain from "./card-notmain.vue";
import WgFormRegistrationCardPhoto from "./card-photo.vue";
export default {
  option: "wg-form-registration",
  components: {
    WgFormRegistrationCardMain,
    WgFormRegistrationCardNotmain,
    WgFormRegistrationCardPhoto
  },
  data() {
    return {
      dHeader: "Пройдите регистрацию заполняя формы",
      dShow: this.show,
      dShowAnimation: false,
      showCardMain: true,
      showCardNotMain: false,
      showCardPhoto: false,
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
    isHide() {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$emit("onHide");
      }, 300);
    },
    isShowCardNotMain() {
      this.showCardMain = false;
      setTimeout(() => {
        this.showCardNotMain = true;
      }, 600);
    },
    isShowCardPhoto() {
      this.showCardNotMain = false;
      setTimeout(() => {
        this.showCardPhoto = true;
      }, 600);
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