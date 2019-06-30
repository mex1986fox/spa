<template>
  <ui-table-tr>
    <ui-table-td class="wg-table__td_desc" colspan="100%">
      <span class="wg-table__exces_param">{{name+" "}}</span>
      <span class="wg-table__exces_info">
        <slot></slot>
      </span>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
export default {
  date() {
    return {};
  },
  props: {
    name: {
      default: "",
      type: String
    }
  }
};
</script>

