<template>
  <div class="ui-spinner">
    <div class="ui-spinner__circle"></div>
    <div class="ui-spinner__title" v-if="title!=undefined">{{title+" ..."}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    }
  }
};
</script>



