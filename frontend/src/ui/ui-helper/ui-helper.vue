<template>
  <div class="ui-helper" v-if="dShow==true">
    <div class="ui-helper__container">
      <div class="ui-helper__triangle"></div>
      <div class="ui-helper__info">{{message}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { dShow: this.show };
  },
  props: {
    message: {
      default: "Сообщение хелпера",
      type: String
    },
    show: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
    }
  }
};
</script>
