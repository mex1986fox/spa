<template>
  <ui-table-tr>
    <ui-table-td class="wg-table__td_opacity"
                 colspan="100%">
      <wg-table-exces name="Описание">{{dProduct.description}}</wg-table-exces>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-myproduct-desc",
  data() {
    return {
      dProduct: this.product
    };
  },
  props: {
    product: {
      default: undefined
    }
  },
  watch: {
    product(newQ) {
      this.dProduct = newQ;
    }
  }
};
</script>
