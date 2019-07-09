<template>
  <ui-blind :show="show" position="fixed" :animate="'none'">
    <!-- <ui-animation-display v-if="show" :animate="'right'"> -->
    <div class="wg-slider-zoom">
      <button
        @click="isHide"
        class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3 wg-slider-zoom__button-exit"
      >
        <i class="fas fa-times"></i>
      </button>
      <wg-slider class="wg-slider-zoom__slider" :slides="slides"/>
    </div>
    <!-- </ui-animation-display> -->
  </ui-blind>
</template>
<script>
export default {
  name: "wg-slider-zoom",

  watch: {},
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  },
  watch: {
    show(newQ) {
      // console.dir(newQ);
    }
  }
};
</script>
