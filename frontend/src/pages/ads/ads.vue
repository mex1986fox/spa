<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Объявления</div>
        <div class="lt-main-menu__buttons">
          <ui-badge>
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
              @click="isShowFormCreatAd"
            >
              <i class="fas fa-plus"></i>
            </div>
          </ui-badge>
          <ui-badge>
            <div v-if="countFilterAds>0" class="ui-badge__icon">{{countFilterAds}}</div>
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
              @click="isShowFilter"
            >
              <i class="fas fa-sliders-h"></i>
            </div>
          </ui-badge>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <wg-card-ad v-for="(ad, key) in ads" :key="key" :ad="ad" @onUpdateAd="isShowAds"/>
      <!-- </div> -->

      <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddAds">Показать еще ...</div>
      </div>
      <!-- <wg-form-creat-ad :show="showFormCreatAd" @onHide="showFormCreatAd=false"/> -->
      <!-- <wg-filter-ad :show="showFilter" @onHide="showFilter=false"/> -->
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-ads",
  data() {
    return {
      showFilter: false,
      showFormCreatAd: false,
      countFilterAds: 0
    };
  },
  computed: {
    ...mapGetters({
      ads: "ads/getAds"
    })
  },
  watch: {
    showFilter(newQ) {
      if (newQ == false) {
        this.checkFilterAds();
      }
    }
  },
  methods: {
    isShowFilter() {
      this.showFilter = true;
    },
    isShowFormCreatAd() {
      this.showFormCreatAd = true;
    },
    isShowAds() {
      let filterAds = JSON.parse(this.$cookie.get("filter_ads"));
      let body = new FormData();
      for (const key in filterAds) {
        body.set(key, filterAds[key]);
      }
      this.$http.post(this.$hosts.services + "ads/api/ads/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.$store.commit("ads/updateAds", response.body.data.ads);
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    },
    isAddAds() {
      let filterAds = JSON.parse(this.$cookie.get("filter_ads"));
      let body = new FormData();
      let step_id = this.ads[this.ads.length - 1]["ad_id"];
      body.set("step_from", step_id);
      for (const key in filterAds) {
        body.set(key, filterAds[key]);
      }
      this.$http.post(this.$hosts.services + "ads/api/ads/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.$store.commit("ads/updateAds", [
              ...this.ads,
              ...response.body.data.ads
            ]);
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    },
    checkFilterAds() {
      this.countFilterAds = 0;

      if (this.$cookie.get("filter_ads")) {
        let filterAds = JSON.parse(this.$cookie.get("filter_ads"));
        for (const key in filterAds) {
          if (filterAds[key] != undefined && filterAds[key] != "") {
            this.countFilterAds++;
          }
        }
      }
    }
  },
  mounted() {
    this.isShowAds();
    this.checkFilterAds();
  }
};
</script>