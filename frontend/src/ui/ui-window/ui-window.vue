<template>
  <ui-blind :show="showAnimate" class="ui-window__blind" :position="position">
    <div class="ui-window__container">
      <div class="ui-window__menu">
        <div class="ui-window__header" v-if="dHeader!=undefined">{{dHeader}}</div>
        <div class="ui-window__buttons">
          <div @click="isHide" class="ui-button ui-button_float_white ui-button_circle_s2">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </ui-blind>
</template>
<script>
export default {
  data() {
    return {
      showAnimate: false,
      dHeader: this.header
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: undefined
    },
    position: {
      type: String,
      default: "absolute"
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
    },
    header(newQ) {
      this.dHeader = newQ;
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
    },
    isHide() {
      this.$emit("onHide");
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
