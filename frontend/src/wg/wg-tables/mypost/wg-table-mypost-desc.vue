<template>
  <ui-table-tr>
    <ui-table-td class="wg-table__td_opacity" colspan="100%">
      <wg-table-exces name="Описание">{{dPost.description}}</wg-table-exces>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-mypost-desc",
  data() {
    return {
      dPost: this.post
    };
  },
  props: {
    post: {
      default: undefined
    }
  },
  watch: {
    post(newQ) {
      this.dPost = newQ;
    }
  }
};
</script>
