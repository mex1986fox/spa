<template>
  <ui-table-td class="wg-table__td_opacity"
               colspan="100%">
    <div class="ui-table__td wg-table__td_margin-top">
      <div class="row">
        <div class="col_1">
          <div class="wg-table__td_name wg-table__td_left">{{name}}</div>
        </div>
        <div class="col_11">
          <div class="wg-table__td_desc">{{value}}</div>
        </div>
      </div>
    </div>
  </ui-table-td>
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
    },
    value: {
      default: "",
      type: String
    }
  }
};
</script>

