<template>

  <ui-animation-display v-if="dShow==true"
                        :animate="animate">
    <div ref="blind"
         v-if="dShow==true"
         class="ui-blind"
         @click="isClick">
      <slot>

      </slot>
    </div>
  </ui-animation-display>
</template>
<script>
export default {
  name: "ui-blind",
  data() {
    return {
      dShow: this.show
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    animate: {
      type: String,
      default: "opacity"
    },
    position: {
      type: String,
      default: "absolute"
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
      if (this.dShow == true) {
        setTimeout(() => {
          let style = this.$refs.blind.style;
          style.position = this.position;
          if (this.position == "fixed") {
            style.top = "0";
            style.left = "0";
          }
        }, 4);
      }
    }
  },
  methods: {
    isClick(el) {
      el.target.classList.forEach(className => {
        if (className == "ui-blind") {
          this.$emit("onClick");
        }
      });
    }
  },
  mounted() {
    if (this.dShow == true) {
      setTimeout(() => {
        let style = this.$refs.blind.style;
        style.position = this.position;
        if (this.position == "fixed") {
          style.top = "0";
          style.left = "0";
        }
      }, 4);
    }
    this.$el.parentNode.addEventListener("scroll", ev => {
      if (this.dShow == true && this.position == "absolute") {
        let scrollTop = ev.target.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
      }
      if (this.dShow == true && this.position == "fixed") {
        let scrollTop = ev.target.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
      }
    });
  }
};
</script>
