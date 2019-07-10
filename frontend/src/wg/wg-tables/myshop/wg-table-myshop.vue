<template>
  <div class="wg-table-myshop">
    <ui-table v-if="shops!=undefined">
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
        <template v-for="(shop, key) in shops">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+shop.shop_id"/>
          <wg-table-myshop-body :shop="shop" :key="'body'+shop.shop_id"/>
          <wg-table-myshop-desc :shop="shop" :key="'desc'+shop.shop_id"/>
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMyshopBody from "./wg-table-myshop-body.vue";
import WgTableMyshopDesc from "./wg-table-myshop-desc.vue";
export default {
  name: "wg-table-myshops",
  components: { WgTableMyshopBody, WgTableMyshopDesc },
  data() {
    return {
      showExcess: false
    };
  },
  computed: {
    ...mapGetters({
      shops: "myshops/getShops",
      userID: "profile/getID"
    })
  },
  watch: {
    userID(newQ) {
      if (newQ == undefined) {
        this.$store.commit("myshops/updateShops", undefined);
      } else {
        this.isShowShops();
      }
    }
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
    },
    isShowShops() {
      let body = new FormData();
      body.set("user_id", this.userID);
      body.set("page", 1);
      this.$api("shops")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("myshops/updateShops", response.body.data.shops);
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
