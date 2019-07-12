<template>
  <nav class="ui-tabs">
    <div class="ui-tabs__container">
      <div ref="line" class="ui-tabs__line">
        <slot></slot>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "ui-tabs",
  data() {
    return {
      nOffset: 0,
      dShowBut: false
    };
  },
  methods: {
    clickLeft() {
      let marg = 0;
      let child;
      let length = this.$children.length - 1;
      for (let k in this.$children) {
        child = this.$children[k];
        if (child.$options._componentTag == "ui-tabs-tab") {
          marg = child.$el.clientWidth;
          if (k == this.nOffset && length != k) {
            this.$children[k].$el.style.marginLeft = "-" + marg + "px";
            this.nOffset = this.nOffset + 1;
            break;
          }
        }
      }
    },
    clickRight() {
      let marg = 0;
      let child;
      for (let k in this.$children) {
        child = this.$children[k];
        if (child.$options._componentTag == "ui-tabs-tab") {
          marg = child.$el.clientWidth;
          if (k == this.nOffset - 1) {
            this.$children[k].$el.style.marginLeft = "";
            this.nOffset = this.nOffset - 1;
            break;
          }
        }
      }
    }
  },
  watch: {
    dShowBut(newQ) {
      if (newQ == false) {
        for (let child of this.$children) {
          if (child.$options._componentTag == "ui-tabs-tab") {
            child.$el.style.marginLeft = "";
          }
        }
      }
    }
  }
};
</script>
        