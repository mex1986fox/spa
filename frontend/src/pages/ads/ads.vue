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
      <wg-card-ad v-for="(ad, key) in ads" :key="key" :ad="ad" @onDeleteAd="isDeleteAd"/>
      <!-- </div> -->

      <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddAds">Показать еще ...</div>
      </div>
      <wg-form-creat-ad :key="keyRand()" :show="showFormCreatAd" @onHide="showFormCreatAd=false"/>
      <wg-filter-ad :show="showFilter" @onHide="showFilter=false"/>
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
    keyRand() {
      return Math.floor(Math.random() * (1 - 999999)) + 1;
    },
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
      body.set("page", 1);
      this.$api("ads")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("ads/updateAds", response.body.data.ads);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteAd(ad) {
      this.$store.commit("ads/deleteAd", ad);
    },
    isAddAds() {
      let filterAds = JSON.parse(this.$cookie.get("filter_ads"));
      let body = new FormData();
      for (const key in filterAds) {
        body.set(key, filterAds[key]);
      }
      this.$api("ads")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("ads/updateAds", [
              ...this.ads,
              ...response.body.data.ads
            ]);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
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