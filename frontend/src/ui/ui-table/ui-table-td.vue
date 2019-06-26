<template>
  <td>
    <div class="ui-table__td" :class="dclass">
      <slot></slot>
    </div>
  </td>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    dclass: {
      type: String,
      default: ""
    }
  }
};
</script>