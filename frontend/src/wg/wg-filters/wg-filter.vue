<template>
  <ui-blind
    @onClick="isHide"
    :show="dShow"
    class="ui-blind_flat ui-blind_content-right"
    :animate="'none'"
  >
    <div class="wg-filter">
      <ui-animation-display v-if="dShowAnimation==true" :animate="'right'">
        <div class="wg-filter__container">
          <div class="wg-filter__header">Фильтр</div>
          <div class="wg-filter__button-close">
            <div class="ui-button ui-button_float_white ui-button_circle_s2" @click="isHide">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          <div class="wg-filter__content">
            <ui-ef-text
              v-for="key in 25"
              :key="key"
              class="ui-ef-text_white"
              caption="Текстовое поле"
            ></ui-ef-text>
          </div>
          <div class="wg-filter__buttons">
            <div class="ui-button ui-button_float_white">отправить</div>
            <div class="ui-button ui-button_float_white">отмена</div>
          </div>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>
<script>
export default {
  name: "wg-filter",
  data() {
    return {
      dShow: false,
      dShowAnimation: false
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
      if (newQ == true) {
        this.dShow = newQ;
        this.dShowAnimation = newQ;
      }
      if (newQ == false) {
        this.dShowAnimation = newQ;
        setTimeout(() => {
          this.dShow = newQ;
        }, 1000);
      }
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  }
};
</script>
