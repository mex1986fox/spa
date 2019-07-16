<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__buttons_left">
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isRedirMyShops"
          >
            <i class="fas fa-angle-left"></i>
          </div>
        </div>
        <div class="lt-main-menu__header">
          {{dShop!=undefined?dShop.
          title:''}}
        </div>
      </lt-main-menu>

      <div class="pg-myshop__content">
        <h2 class="ui-header ui-header_2 ui-header_white">
          Каталоги
          <div class="lt-main-menu__buttons">
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
              @click="showUpdateCatalogs=true"
            >
              <i class="far fa-edit"></i>
            </div>
          </div>
        </h2>

        <wg-tabs-catalog :catalog="dCatalogs" @onFocus="isFocusProduct"/>
        <h2 v-if="dCheckCatalog!=undefined" class="ui-header ui-header_2 ui-header_white">
          {{dCheckCatalog.title}}
          <div class="lt-main-menu__buttons">
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
              @click="showUpdateProducts=true"
            >
              <i class="far fa-edit"></i>
            </div>
          </div>
        </h2>
      </div>

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddShops">Показать еще ...</div>
      </div>-->
      <wg-form-update-catalogs
        :shop="dShop"
        :catalogs="dCatalogs"
        :show="showUpdateCatalogs"
        @onHide="showUpdateCatalogs=false"
      />
      <!-- <wg-form-update-products
        :catalog="dCheckCatalog"
        :show="showUpdateProducts"
        @onHide="showUpdateProducts=false"
      />-->
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myshop",
  data() {
    return {
      dShop: undefined,
      dCatalogs: [],
      dCheckCatalog: undefined,
      showUpdateCatalogs: false,
      showUpdateProducts: false
    };
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  methods: {
    isFocusProduct(product) {
      this.dCatalogs = this.dCatalogs.map(mapCatalog => {
        mapCatalog.checked = false;
        if (mapCatalog.catalog_id == product.catalog_id) {
          this.dCheckCatalog = mapCatalog;
          mapCatalog.checked = true;
        }
        return mapCatalog;
      });
    },
    isRedirMyShops() {
      this.$router.push({ path: `/my_shops` });
    },
    isShowShop() {
      let body = new FormData();
      body.set("page", 1);
      body.set("shop_id", this.$route.params.id);
      body.set("user_id", this.profileID);
      this.$api("shops")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.dShop = response.body.data.shops[0];
            this.isShowCatalogs();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isShowCatalogs() {
      let body = new FormData();
      body.set("page", 1);
      body.set("shop_id", this.$route.params.id);
      body.set("user_id", this.profileID);
      this.$api("catalogs")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.dCatalogs = response.body.data.catalogs.map(mapCatalog => {
              mapCatalog["checked"] = false;
              return mapCatalog;
            });
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
    this.isShowShop();
  }
};
</script>