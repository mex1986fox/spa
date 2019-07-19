<template>
  <div v-if="show=true">
    <wg-form-confirm-delete
      :show="dCheckedConfirm==false"
      @onChecked="isChecked"
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
    isChecked() {
      this.$emit("onCheckedConfirm");
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
            this.$emit("onDeleteCatalog", this.catalog);
          }
        })
        .catch(error => {
          this.exc = error.body.data;
        });
    }
  },
  mounted() {
    if (this.checkedConfirm == true) {
      this.isDeleteCatalog();
    }
  },
  updated() {
    if (this.checkedConfirm == true) {
      this.isDeleteCatalog();
    }
  }
};
</script>
