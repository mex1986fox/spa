<template>
  <transition name="ui-snackbar">
    <div v-if="dShow" class="ui-snackbar">
      <slot name="icon">
        <div v-if="type=='err'" class="ui-description ui-snackbar__icon">
          <span class="ui-snackbar__icon_err">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </slot>

      <div class="ui-description ui-snackbar__descripton">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      timer: undefined
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: undefined
    },
    type: {
      type: String,
      default: "err"
    }
  },
  data() {
    return {
      dShow: this.show
    };
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
      if (newQ == true) {
        this.setTimer();
      }
      if (newQ == false) {
        clearTimeout(this.timer);
      }
    }
  },
  mounted() {
    this.setTimer();
  },
  methods: {
    hide() {
      this.$emit("onHide");
      clearTimeout(this.timer);
    },
    setTimer() {
      if (this.dShow == true && this.time != undefined) {
        this.timer = setTimeout(() => {
          this.hide();
        }, this.time);
      }
    }
  }
};
</script>
