<template>
  <ui-animation-display v-if="showAnimate==true" :animate="animate">
    <div class="ui-window-card__margin">
      <div class="ui-window-card">
        <slot></slot>
      </div>
    </div>
  </ui-animation-display>
</template>
<script>
export default {
  data() {
    return { showAnimate: false };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    animate: {
      type: String,
      default: "opacity"
    },
    delayShow: {
      type: Number,
      default: 0
    },
    delayHide: {
      type: Number,
      default: 0
    }
  },
  watch: {
    show(newQ) {
      if (newQ == true) {
        this.isShowAnimate();
      } else {
        this.isHideAnimate();
      }
    }
  },
  methods: {
    isShowAnimate() {
      setTimeout(() => {
        this.showAnimate = true;
      }, this.delayShow);
    },
    isHideAnimate() {
      setTimeout(() => {
        this.showAnimate = false;
      }, this.delayHide);
    }
  },
  mounted() {
    if (this.show == true) {
      this.isShowAnimate();
    } else {
      this.isHideAnimate();
    }
  }
};
</script>
