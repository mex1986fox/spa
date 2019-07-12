<template>
  <ui-table-tr>
    <ui-table-td class="wg-table__td_opacity" colspan="100%">
      <wg-table-exces name="Описание">{{dShop.description}}</wg-table-exces>
    </ui-table-td>
  </ui-table-tr>
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
