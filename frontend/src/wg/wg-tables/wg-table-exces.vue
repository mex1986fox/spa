<template>
  <div class="ui-table__td wg-table__td_margin-top">
    <div class="row">
      <div class="col_1 col-phone_6">
        <div class="wg-table__td_name wg-table__td_left">{{name}}</div>
      </div>
      <div class="col_11 col-phone_6">
        <div class="wg-table__td_desc">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
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

