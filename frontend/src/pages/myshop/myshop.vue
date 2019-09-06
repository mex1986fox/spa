<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">
          {{dShop!=undefined?dShop.
          title:''}}
        </div>
        <div class="lt-main-menu__buttons">
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isRedirMyShops"
          >
            <i class="fas fa-sign-out-alt"></i>
          </div>
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
        <div class="row" v-if="loadingCatalogs==false && dCatalogs==undefined">
          <div class="col_4 col-phone_6">
            <p
              class="ui-header ui-header_white ui_header_h3"
            >Каталоги не созданы. Создайте каталоги!</p>
            <input
              type="button"
              class="ui-button ui-button_float_white"
              value="Создать"
              @click="showUpdateCatalogs=true"
            >
          </div>
        </div>
        <ui-spinner
          v-if="loadingCatalogs==true"
          title="Загрузка каталогов"
          class="ui-spinner_s3 ui-spinner_white"
        />

        <wg-tabs-catalog
          v-if="dCatalogs!=undefined"
          :catalogs="dCatalogs"
          @onFocus="isFocusProduct"
        />
        <h2 v-if="dCheckCatalog!=undefined" class="ui-header ui-header_2 ui-header_white">
          {{dCheckCatalog.title}}
          <div class="lt-main-menu__buttons">
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
              @click="showCreateProduct=true"
            >
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </h2>
        <wg-table-myproducts :catalog="dCatalogs"></wg-table-myproducts>
      </div>

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddShops">Показать еще ...</div>
      </div>-->
      <wg-form-catalogs
        :shop="dShop"
        :catalogs="dCatalogs"
        :show="showUpdateCatalogs"
        @onHide="showUpdateCatalogs=false"
        @onUpdateCatalogs="isUpdateCatalogs"
      />
      <wg-form-create-product
        :show="showCreateProduct"
        @onHide="showCreateProduct=false"
        :shop="dShop"
        :catalog="dCheckCatalog"
      />
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
      dCatalogs: undefined,
      dCheckCatalog: undefined,
      loadingCatalogs: false,
      showUpdateCatalogs: false,
      showCreateProduct: false
    };
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  watch: {
    dCatalogs(newQ) {
      if (newQ == undefined) {
        this.dCheckCatalog = undefined;
      }
    },
    dCheckCatalog(newQ) {
      if (newQ != undefined) {
        this.isShowProducts();
      }
    }
  },
  methods: {
    isUpdateCatalogs(catalogs) {
      this.dCatalogs = catalogs.length <= 0 ? undefined : catalogs;
    },
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
      this.loadingCatalogs = true;
      let body = new FormData();
      body.set("page", 1);
      body.set("shop_id", this.$route.params.id);
      body.set("user_id", this.profileID);
      this.$api("catalogs")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            
            if (response.body.data.catalogs.length > 0) {
              this.dCatalogs = response.body.data.catalogs.map(mapCatalog => {
                mapCatalog["checked"] = false;
                return mapCatalog;
              });
              this.dCatalogs[0]["checked"] = true;
              this.dCheckCatalog = this.dCatalogs[0];
            } else {
              this.$store.commit("myproducts/updateProducts", undefined);
            }
            this.loadingCatalogs = false;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            this.loadingCatalogs = false;
            console.dir(error);
          }
        });
    },
    isShowProducts() {
      this.loadingProducts = true;
      let body = new FormData();
      body.set("page", 1);
      body.set("shop_id", this.$route.params.id);
      body.set("catalog_id", this.dCheckCatalog.catalog_id);
      body.set("user_id", this.profileID);
      this.$api("products")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            if (response.body.data.products.length > 0) {
              this.$store.commit(
                "myproducts/updateProducts",
                response.body.data.products
              );
            } else {
              this.$store.commit("myproducts/updateProducts", undefined);
            }
            this.loadingCatalogs = false;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            this.loadingCatalogs = false;
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