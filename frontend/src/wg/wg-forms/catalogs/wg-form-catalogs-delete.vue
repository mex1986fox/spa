<template>
  <div v-if="show=true">
    <wg-form-confirm-delete
      :show="dCheckedConfirm==false"
      @onChecked="isChecked"
      @onCancel="isHide"
      @onDelete="isDeleteAlbumAndCatalog"
    />
    <ui-snackbar :show="masSnackbar!=undefined" model="err" :time="5000" @onHide="isHideSnacbar">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="isHideSnacbar"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
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
      dCheckedConfirm: this.checkedConfirm,
      masSnackbar: undefined
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
    isHideSnacbar() {
      this.exc = [];
      this.masSnackbar = undefined;
      setTimeout(() => {
        this.$emit("onHide");
      }, 150);
    },
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
            this.$emit("onHide");
          }
        })
        .catch(error => {
          this.exc = error.body.data;
          if (this.exc["massege"] != undefined) {
            this.masSnackbar = this.exc["massege"];
          }
        });
    },
    isDeleteAlbumAndCatalog() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dCatalog.catalog_id);
      //отправляем запрос
      this.$api("catalogsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeleteCatalog();
          }
        })
        .catch(error => {
          this.exc = error.body.data;
          if (this.exc["massege"] != undefined) {
            this.masSnackbar = this.exc["massege"];
          }
        });
    }
  },
  mounted() {
    if (this.checkedConfirm == true) {
      this.isDeleteAlbumAndCatalog();
    }
  },
  updated() {
    if (this.checkedConfirm == true) {
      this.isDeleteAlbumAndCatalog();
    }
  }
};
</script>
