<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Мои магазины</div>
        <div class="lt-main-menu__buttons">
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3">
            <i class="far fa-file-excel"></i>
          </div>
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isShowFormCreatShop"
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <!-- <wg-table-myshops v-if="showTableMyshops"/> -->
      <!-- </div> -->

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddShops">Показать еще ...</div>
      </div>-->
      <wg-form-creat-shop :show="showFormCreatShop" @onHide="showFormCreatShop=false"/>
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myshops",
  data() {
    return {
      showFormExcel: false,
      showFormCreatShop: false,
      showTableMyshops: false
    };
  },
  watch: {
    profileID(newQ) {
      if (newQ != undefined) {
        this.showTableMyshops = true;
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
      this.showTableMyshops = true;
    }
  },
  methods: {
    isShowFormCreatShop() {
      this.showFormCreatShop = true;
    }
  }
};
</script>