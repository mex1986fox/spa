<template>
  <div class="wg-select-location">
    <ui-ef-text
      @onClick="isClickText"
      :readonly="true"
      :disabled="disabled"
      :value="dTextValue"
      :caption="caption"
      :help="help"
    >
      <template slot="icon">
        <i class="fas fa-car"></i>
      </template>
    </ui-ef-text>

    <input
      type="hidden"
      name="type_id"
      :value="dCheckIdType"
      v-if="dCheckIdType!=undefined && dCheckIdBrand==undefined && dCheckIdModel==undefined"
    >
    <input
      type="hidden"
      name="brand_id"
      :value="dCheckIdBrand"
      v-if="dCheckIdType!=undefined && dCheckIdBrand!=undefined && dCheckIdModel==undefined"
    >
    <input
      type="hidden"
      name="model_id"
      :value="dCheckIdModel"
      v-if="dCheckIdType!=undefined && dCheckIdBrand!=undefined && dCheckIdModel!=undefined"
    >
    <ui-blind
      :show="dShowMenu"
      class="wg-select-location__blinde"
      @onClick="isHideMenu"
      position="fixed"
    >
      <div class="wg-select-location__menu">
        <div class="wg-select-location__menu-header">{{caption}}</div>
        <div class="wg-select-location__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="wg-select-location__menu-ef">
          <div class="row">
            <div class="col_12">
              <ui-ef-select
                caption="Тип транспорта"
                :menu="typesMenu"
                @onSelect="isSelectType"
                @onClianer="isClianerType"
                :cleaner="true"
              ></ui-ef-select>
            </div>
          </div>
          <div class="row">
            <div class="col_12">
              <ui-ef-select
                caption="Марка"
                :menu="brandsMenu"
                @onSelect="isSelectBrand"
                @onClianer="isClianerBrand"
                :cleaner="true"
                :disabled="dCheckIdType==undefined"
              ></ui-ef-select>
            </div>
          </div>
          <div class="row">
            <div class="col_12">
              <ui-ef-select
                caption="Модель"
                :menu="modelsMenu"
                @onSelect="isSelectModel"
                @onClianer="isClianerModel"
                :cleaner="true"
                :disabled="dCheckIdBrand==undefined"
              ></ui-ef-select>
            </div>
          </div>
        </div>
        <div class="wg-select-location__menu-buttons">
          <input
            type="button"
            value="Готово"
            class="ui-button ui-button_float_black"
            @click="isHideMenu"
          >
        </div>
      </div>
    </ui-blind>
  </div>
</template>
<script>
export default {
  name: "wg-select-transport",
  data() {
    return {
      dShowMenu: false,
      dCheckIdType: undefined,
      dCheckIdBrand: undefined,
      dCheckIdModel: undefined
    };
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    caption: {
      type: String,
      default: "Модель автомобиля"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: ""
    }
  },
  computed: {
    dTextValue() {
      let type = this.$store.getters["transports/getType"](this.dCheckIdType);
      let brand = this.$store.getters["transports/getBrand"](
        this.dCheckIdBrand
      );
      let model = this.$store.getters["transports/getModel"](
        this.dCheckIdModel
      );

      return this.$options.filters.filter_for_transport(
        type == undefined ? null : type.name,
        brand == undefined ? null : brand.name,
        model == undefined ? null : model.name
      );
    },
    typesMenu() {
      let types = this.$store.getters["transports/getTypes"];
      let checkIdType = this.dCheckIdType;
      if (types != undefined) {
        let menu = types.map(type => {
          return {
            value: type.type_id,
            option: type.extended_name,
            selected: checkIdType == type.type_id ? true : false
          };
        });
        return menu;
      }
      return undefined;
    },
    brandsMenu() {
      let checkIdBrand = this.dCheckIdBrand;
      if (this.dCheckIdType != undefined) {
        let brands = this.$store.getters["transports/getBrands"](
          this.dCheckIdType
        );
        if (brands != undefined) {
          let menu = brands.map(brand => {
            return {
              value: brand.brand_id,
              option: brand.extended_name,
              selected: checkIdBrand == brand.brand_id ? true : false
            };
          });
          return menu;
        }
      }
      return undefined;
    },
    modelsMenu() {
      let checkIdModel = this.dCheckIdModel;
      if (this.dCheckIdBrand != undefined) {
        let models = this.$store.getters["transports/getModels"](
          this.dCheckIdBrand
        );
        if (models != undefined) {
          let menu = models.map(model => {
            return {
              value: model.model_id,
              option: model.extended_name,
              selected: checkIdModel == model.model_id ? true : false
            };
          });
          return menu;
        }
      }
      return undefined;
    }
  },
  watch: {
    dCheckIdType(newQ) {
      this.dCheckIdBrand = undefined;
      this.dCheckIdModel = undefined;
    },
    dCheckIdBrand(newQ) {
      this.dCheckIdModel = undefined;
    }
  },
  methods: {
    isClickText() {
      this.dShowMenu = true;
    },
    isHideMenu() {
      this.dShowMenu = false;
    },
    isSelectType(types) {
      this.dCheckIdType = types[0].value;
    },
    isSelectBrand(brands) {
      this.dCheckIdBrand = brands[0].value;
    },
    isSelectModel(models) {
      this.dCheckIdModel = models[0].value;
    },
    isClianerType() {
      this.dCheckIdType = undefined;
    },
    isClianerBrand() {
      this.dCheckIdBrand = undefined;
    },
    isClianerModel() {
      this.dCheckIdModel = undefined;
    }
  }
};
</script>
