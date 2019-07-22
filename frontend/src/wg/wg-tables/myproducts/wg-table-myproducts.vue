<template>
  <div class="wg-table-myproducts">
    <ui-table v-if="products!=undefined">
      <ui-table-header>
        <ui-table-tr>
          <ui-table-th class="wg-table__td_left col-phone_clean">Дата</ui-table-th>
          <ui-table-th class="col-phone_clean"></ui-table-th>
          <ui-table-th class="col-phone_clean">Город</ui-table-th>
          <ui-table-th class="col-phone_clean">Заголовок</ui-table-th>
          <ui-table-th></ui-table-th>
        </ui-table-tr>
      </ui-table-header>
      <ui-table-body>
        <template v-for="(shop, key) in products">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+shop.shop_id"/>
          <wg-table-myproduct-body
            :shop="shop"
            :key="'body'+shop.shop_id"
            @onClickExcess="isShowExcess(shop.shop_id)"
          />
          <wg-table-myproduct-desc
            v-if="showExcess[shop.shop_id]!=undefined && showExcess[shop.shop_id]==true"
            :shop="shop"
            :key="'desc'+shop.shop_id"
          />
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMyproductBody from "./wg-table-myproducts-body.vue";
import WgTableMyproductDesc from "./wg-table-myproducts-desc.vue";
export default {
  name: "wg-table-myproductss",
  components: { WgTableMyproductBody, WgTableMyproductDesc },
  data() {
    return {
      showExcess: []
    };
  },
  computed: {
    ...mapGetters({
      products: "myproducts/getProducts",
      userID: "profile/getID"
    })
  },
  watch: {
    userID(newQ) {
      if (newQ == undefined) {
        this.$store.commit("products/updateShops", undefined);
      } else {
        this.isShowShops();
      }
    }
  },
  methods: {
    isShowExcess(key) {
      let sExc = this.showExcess;
      this.showExcess = undefined;
      sExc[key] = sExc[key] != undefined ? !sExc[key] : true;
      this.showExcess = sExc;
    },
    isShowShops() {
      let body = new FormData();
      body.set("user_id", this.userID);
      body.set("page", 1);
      this.$api("products")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit(
              "products/updateShops",
              response.body.data.products
            );
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  },
  mounted() {
    this.isShowShops();
  }
};
</script>
