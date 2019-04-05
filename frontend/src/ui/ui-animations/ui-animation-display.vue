<template>
  <transition
    name="ui-animation-display"
    class="ui-animation-display"
    :enter-class="enter+'_'+animate"
    :leave-class="leave+'_'+animate"
    :enter-active-class="enterAct+'_'+animate"
    :leave-active-class="leaveAct+'_'+animate"
    :enter-to-class="enterTo+'_'+animate"
    :leave-to-class="leaveTo+'_'+animate"
  >
    <slot>

    </slot>
  </transition>
</template>
<script>
export default {
  name: "ui-animation-display",
  data() {
    return {
      enter: "ui-animation-display_enter",
      leave: "ui-animation-display_leave",
      enterAct: "ui-animation-display_enter-act",
      leaveAct: "ui-animation-display_leave-act",
      enterTo: "ui-animation-display_enter-to",
      leaveTo: "ui-animation-display_leave-to"
    };
  },
  props: {
    centering: {
      type: Boolean,
      default: false
    },
    selector: {
      type: String,
      default: ".ui-animation-display__content"
    },
    animate: {
      type: String,
      default: "left"
    }
  }
};
</script>
