<template>
  <transition name="ui-tabs__tab_active">
    <div
      class="ui-tabs__tab"
      :class="{'ui-tabs__tab_active':dChecked, 'ui-tabs__tab_disabled':disabled}"
      @click="isClick"
    >
      <slot></slot>
      <ui-click-feedback></ui-click-feedback>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ui-tabs-tab",
  data() {
    return {
      dChecked: this.checked
    };
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      stype: Boolean,
      default: false
    }
  },
  watch: {
    checked(newQ) {
      this.dChecked = newQ;
    }
  },
  methods: {
    isClick() {
      // this.$parent.setWidthLine();
      // this.$parent.setWidthContainer();
      if (this.disabled != true) {
        let brath = this.$parent.$children;
        for (let key in brath) {
          brath[key].dChecked = false;
          this.$emit("onBlur");
        }
        this.dChecked = true;
        this.$emit("onFocus");
      }
    }
  },
  mounted() {}
};
</script>
        