<template>
  <div class="wg-table-myshop">
    <ui-table v-if="shops!=undefined">
      <ui-table-header>
        <ui-table-tr>
          <ui-table-th>Дата</ui-table-th>
          <ui-table-th class="col-phone_clean"></ui-table-th>
          <ui-table-th class="col-phone_clean">Марка, модель</ui-table-th>
          <ui-table-th class="col-phone_clean">Город</ui-table-th>
          <ui-table-th>Заголовок</ui-table-th>
          <ui-table-th></ui-table-th>
        </ui-table-tr>
      </ui-table-header>
      <ui-table-body>
        <template v-for="(shop, key) in shops">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+key"/>
          <wg-table-myshop-body :shop="shop" :key="key"/>
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMyshopBody from "./wg-table-myshop-body.vue";
export default {
  name: "wg-table-myshops",
  components: { WgTableMyshopBody },
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
