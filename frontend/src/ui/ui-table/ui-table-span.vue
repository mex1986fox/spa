<template>
  <tr>
    <td :height="height" class="ui-table__span" colspan="100%">
      <slot></slot>
    </td>
  </tr>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    height: {
      type: Number,
      default: 1
    }
  }
};
</script>