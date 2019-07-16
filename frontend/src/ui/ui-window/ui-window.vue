<template>
  <ui-blind :show="dShow"
            class="ui-window__blind"
            :position="position">
    <div class="ui-window__container">
      <div class="ui-window__menu">
        <div class="ui-window__header"
             v-if="dHeader!=undefined">{{dHeader}}</div>
        <div class="ui-window__buttons">
          <div @click="isHide"
               class="ui-button ui-button_float_white ui-button_circle_s2">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <slot>

      </slot>
    </div>
  </ui-blind>
</template>
<script>
export default {
  data() {
    return {
      dShow: this.show,
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
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  }
};
</script>
