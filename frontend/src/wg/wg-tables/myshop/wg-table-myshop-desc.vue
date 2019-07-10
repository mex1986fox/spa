<template>
  <ui-table-body>
    <ui-table-span/>
    <ui-table-td class="wg-table__td_name wg-table__td_left">Описание</ui-table-td>
    <ui-table-td class="wg-table__td_desc" colspan="100%">{{dShop.description}}</ui-table-td>
  </ui-table-body>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-myshop-desc",
  data() {
    return {
      dShop: this.shop
    };
  },
  props: {
    shop: {
      default: undefined
    }
  },
  watch: {
    shop(newQ) {
      this.dShop = newQ;
    }
  }
};
</script>
