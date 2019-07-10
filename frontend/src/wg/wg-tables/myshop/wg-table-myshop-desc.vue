<template>
  <ui-table-tr>
    <wg-table-exces name="Описание"
                    :value="dShop.description" />
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
