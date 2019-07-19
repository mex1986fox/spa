<template>
  <ui-window
    class="wg-form-catalogs"
    :show="show"
    :header="dShop.title"
    @onHide="isHide"
    position="fixed"
    :delayHide="0"
  >
    <ui-window-card animate="opacity" :show="show" :delayShow="0">
      <div class="ui-window-card__header">Каталоги</div>
      <div class="ui-window-card__ef">
        <div class="wg-form-catalogs__content">
          <div class="row" v-for="(catalog, key) in dCatalogs" :key="key">
            <div class="col_1">
              <div
                class="wg-form-catalogs__coll wg-form-catalogs__date"
              >{{catalog.date_create|filter_date}}</div>
            </div>
            <div class="col_2">
              <div class="wg-form-catalogs__coll">
                <ui-img
                  :class="{ 'wg-form-catalogs__img': catalog.main_photo==null }"
                  :src="catalog.main_photo"
                  :alt="'/public/img/drovito.png'"
                  :nofon="catalog.main_photo!=null?false:true"
                />
              </div>
            </div>
            <div class="col_7">
              <div class="wg-form-catalogs__coll">{{catalog.title}}</div>
            </div>
            <div class="col_2">
              <div class="wg-form-catalogs__coll">
                <div class="wg-form-catalogs__buttons">
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                    @click="isShowUpdateCatalog(catalog)"
                  >
                    <i class="far fa-edit"></i>
                  </div>
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                    @click="isShowDeleteCatalog(catalog)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-window-card__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black"
          value="Создать каталог"
          @click="showCreateCatalog=true"
        >
      </div>
    </ui-window-card>
    <wg-form-catalogs-create
      :key="gmethods.randKey()"
      :shop="dShop"
      :show="showCreateCatalog"
      @onHide="showCreateCatalog=false"
      @onCreatedCatalog="isCreateCatalog"
    />
    <wg-form-catalogs-update
      v-if="updateCatalog!=undefined"
      :key="gmethods.randKey()"
      :shop="dShop"
      :catalog="updateCatalog"
      :show="showUpdateCatalog"
      @onHide="isHideUpdateCatalog"
      @onUpdateCatalog="isUpdateCatalog"
    />
    <wg-form-catalogs-delete
      v-if="deleteCatalog!=undefined"
      :shop="dShop"
      :catalog="deleteCatalog"
      :show="showDeleteCatalog"
      @onHide="isHideDeleteCatalog"
      @onUpdateCatalog="isDeleteCatalog"
      @onCheckedConfirm="isCheckedConfirm"
      :checkedConfirm="checkedConfirm"
    />
  </ui-window>
</template>
<script>
import { mapGetters } from "vuex";
import WgFormCatalogsCreate from "./wg-form-catalogs-create.vue";
import WgFormCatalogsUpdate from "./wg-form-catalogs-update.vue";
import WgFormCatalogsDelete from "./wg-form-catalogs-delete.vue";
export default {
  data() {
    return {
      showCreateCatalog: false,
      showUpdateCatalog: false,
      showDeleteCatalog: false,
      dCatalogs: this.catalogs,
      updateCatalog: undefined,
      deleteCatalog: undefined,
      dShop: this.shop,
      checkedConfirm: false
    };
  },
  components: {
    WgFormCatalogsCreate,
    WgFormCatalogsUpdate,
    WgFormCatalogsDelete
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    catalogs: {
      default: () => {
        return [];
      },
      type: Array
    },
    shop: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  watch: {
    catalogs(newQ) {
      this.dCatalogs = newQ;
    },
    shop(newQ) {
      this.dShop = newQ;
    }
  },
  methods: {
    isCheckedConfirm() {
      console.dir("confirm");
      this.checkedConfirm = true;
    },
    isDeleteCatalog(catalog) {
      this.dCatalogs = this.dCatalogs.filter(mapCatalog => {
        if (mapCatalog.catalog_id != catalog.catalog_id) {
          return true;
        }
      });
    },
    isCreateCatalog(catalog) {
      this.dCatalogs = this.dCatalogs.push(catalog);
    },
    isUpdateCatalog(catalog) {
      this.dCatalogs = this.dCatalogs.map(mapCatalog => {
        if (mapCatalog.catalog_id == catalog.catalog_id) {
          return catalog;
        }
        return mapCatalog;
      });
    },
    isHide() {
      if (this.dCatalogs != undefined) {
        this.$emit("onUpdateCatalogs", this.dCatalogs);
      }
      this.$emit("onHide");
    },
    isShowUpdateCatalog(catalog) {
      this.updateCatalog = catalog;
      this.showUpdateCatalog = true;
    },
    isHideUpdateCatalog() {
      this.showUpdateCatalog = true;
      this.updateCatalog = undefined;
    },
    isShowDeleteCatalog(catalog) {
      this.deleteCatalog = catalog;
      this.showDeleteCatalog = true;
    },
    isHideDeleteCatalog() {
      this.showDeleteCatalog = true;
      this.deleteCatalog = undefined;
    }
  }
};
</script>
