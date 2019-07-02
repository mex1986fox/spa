<template>
  <ui-blind class="wg-form-list__blinde" :show="showBlind" :position="position">
    <div class="wg-form-list">
      <ui-animation-display v-if="showAnimate" animate="opacity">
        <div class="wg-form-list__container">
          <ui-animation-display v-if="true" animate="opacity">
            <div class="wg-form-list__card">
              <div class="wg-form-list__card-form">
                <div v-if="fon!=undefined" class="wg-form-list__card-form-fon">
                  <img :src="fon">
                </div>
                <div class="wg-form-list__menu">
                  <div class="wg-form-list__menu-header">{{dHeader}}</div>
                  <div class="wg-form-list__menu-buttons">
                    <div
                      class="ui-button ui-button_float_white ui-button_circle_s2 ui-button_noborder"
                      @click="isHide"
                    >
                      <i class="fas fa-times"></i>
                    </div>
                  </div>
                </div>

                <slot name="form"></slot>
              </div>
              <div class="wg-form-list__card-button">
                <slot name="button"></slot>
              </div>
              <div class="wg-form-list__card-content">
                <div class="wg-form-list__card-content_bord">
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>
<script>
export default {
  data() {
    return {
      dHeader: this.header,
      dFon: this.fon,
      showBlind: false,
      showAnimate: false
    };
  },
  watch: {
    header(newQ) {
      this.dHeader = newQ;
    },
    fon(newQ) {
      this.fon = newQ;
    },
    show(newQ) {
      this.isShowAnimate(newQ);
    }
  },
  props: {
    position: {
      default: "absolute",
      type: String
    },
    header: {
      default: "Заголовок формы",
      type: String
    },
    fon: {
      default: undefined,
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    isShowAnimate(show) {
      if (show == true) {
        this.showBlind = true;
        this.showAnimate = true;
      }
      if (show == false) {
        this.showAnimate = false;
        setTimeout(() => {
          this.showBlind = false;
        }, 300);
      }
    },
    isHide() {
      this.$emit("onHide");
    }
  },
  mounted() {
    this.isShowAnimate(this.show);
  }
};
</script>
