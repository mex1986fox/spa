<template>
  <div class="wg-table-mypost">
    <ui-table v-if="ads!=undefined">
      <ui-table-header>
        <ui-table-tr>
          <ui-table-th class="wg-table__td_left col-phone_clean">Дата</ui-table-th>
          <ui-table-th class="col-phone_clean">Область, город</ui-table-th>
          <ui-table-th class="col-phone_clean">Марка, модель</ui-table-th>
          <ui-table-th class="col-phone_clean">Год выпуска</ui-table-th>
          <ui-table-th class="col-phone_clean">Цена, руб.</ui-table-th>
          <ui-table-th></ui-table-th>
        </ui-table-tr>
      </ui-table-header>
      <ui-table-body>
        <template v-for="(ad, key) in ads">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+key"/>
          <wg-table-myads-body :ad="ad" :key="key"/>
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMyadsBody from "./wg-table-myads-body.vue";
export default {
  name: "wg-table-myads",
  components: { WgTableMyadsBody },
  data() {
    return {
      showExcess: false
    };
  },
  computed: {
    ...mapGetters({
      ads: "myads/getAds",
      userID: "profile/getID"
    })
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
    },
    isShowAds() {
      let body = new FormData();
      body.set("user_id", this.userID);
      body.set("page", 1);
      this.$api("ads")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("myads/updateAds", response.body.data.ads);
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
    this.isShowAds();
  }
};
</script>
