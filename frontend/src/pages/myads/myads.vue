<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Мои объявления</div>
        <div class="lt-main-menu__buttons">
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3">
            <i class="far fa-file-excel"></i>
          </div>
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
               @click="isShowFormCreatAd">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <wg-table-myads v-if="showTableMyads" />
      <!-- </div> -->

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddAds">Показать еще ...</div>
      </div>-->
      <wg-form-creat-ad :show="showFormCreatAd"
                        @onHide="showFormCreatAd=false" />
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myads",
  data() {
    return {
      showFormExcel: false,
      showFormCreatAd: false,
      showTableMyads: false
    };
  },
  watch: {
    profileID(newQ) {
      if (newQ != undefined) {
        this.showTableMyads = true;
      }
    }
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  mounted() {
    if (this.profileID != undefined) {
      this.showTableMyads = true;
    }
  },
  methods: {
    isShowFormCreatAd() {
      this.showFormCreatAd = true;
    }
  }
};
</script>