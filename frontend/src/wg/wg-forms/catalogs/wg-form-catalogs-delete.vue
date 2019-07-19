<template>
  <div v-if="show=true">
    <wg-form-confirm-delete
      :show="dCheckedConfirm==false"
      @onChecked="dCheckedConfirm=true"
      @onHide="isHide"
      @onDelete="isDeleteCatalog"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      exc: [],
      dCatalog: this.catalog,
      dShop: this.shop,
      dCheckedConfirm: this.checkedConfirm
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    catalog: {
      default: undefined,
      type: Object
    },
    shop: {
      default: undefined,
      type: Object
    },
    checkedConfirm: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    catalog(newQ) {
      this.dCatalog = newQ;
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    },
    isDeleteCatalog() {
      this.exc = [];
      let body = new FormData();
      body.set("access_token", this.token);
      body.set("catalog_id", this.dCatalog.catalog_id);
      this.$api("catalogs")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            if (this.dCheckedConfirm == true) {
              this.$emit("onCheckedConfirm");
            }
            this.$emit("onDeleteCatalog", this.catalog);
          }
        })
        .catch(error => {
          this.exc = error.body.data;
        });
    }
  }
};
</script>
