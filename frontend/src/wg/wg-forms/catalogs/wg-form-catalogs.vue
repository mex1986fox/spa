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
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                    @click="isShowPhotoCatalogs(catalog)"
                  >
                    <i class="fas fa-camera"></i>
                  </div>
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
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
          @click="showCreataCatalogs=true"
        >
      </div>
    </ui-window-card>
    <wg-form-catalogs-create
      :shop="dShop"
      :show="showCreataCatalogs"
      @onHide="showCreataCatalogs=false"
    />
    <wg-form-catalogs-photo
      :catalog="dChecCatalog"
      :show="showPhotoCatalogs"
      @onHide="isHidePhotoCatalogs"
      statusForm="update"
    />
  </ui-window>
</template>
<script>
import { mapGetters } from "vuex";
import WgFormCatalogsCreate from "./wg-form-catalogs-create.vue";
import WgFormCatalogsPhoto from "./wg-form-catalogs-photo.vue";
export default {
  data() {
    return {
      showCreataCatalogs: false,
      showPhotoCatalogs: false,
      dCatalogs: this.catalogs,
      dChecCatalog: undefined,
      dShop: this.shop
    };
  },
  components: {
    WgFormCatalogsCreate,
    WgFormCatalogsPhoto
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
    isHide() {
      this.$emit("onHide");
    },
    isShowPhotoCatalogs(catalog) {
      this.dChecCatalog = catalog;
      this.showPhotoCatalogs = true;
    },
    isHidePhotoCatalogs() {
      this.showPhotoCatalogs = false;
      this.dChecCatalog = undefined;
    }
  }
};
</script>
