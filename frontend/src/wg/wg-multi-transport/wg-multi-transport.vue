<template>
  <div class="wg-multi-location">
    <input v-if="modelsId.length>0" type="hidden" name="models_id[]" :value="modelsId">
    <input v-if="brandsId.length>0" type="hidden" name="brands_id[]" :value="brandsId">
    <input v-if="typesId.length>0" type="hidden" name="types_id[]" :value="typesId">
    <ui-ef-container :maxlength="180" :caption="caption" @onClick="isClickText">
      <template v-if="dCheckTypes.length>0 || dCheckBrands.length>0 || dCheckModels.length>0">
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(type, key) in dCheckTypes"
          :key="'type_'+key"
          :value="type.value"
          :caption="type.caption"
          deleted
          @onDeleted="isClickCheckboxType"
        ></ui-ef-chips>
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(brand, key) in dCheckBrands"
          :key="'brand_'+key"
          :value="brand.value"
          :caption="brand.caption"
          deleted
          @onDeleted="isClickCheckboxBrand"
        ></ui-ef-chips>
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(model, key) in dCheckModels"
          :key="'model_'+key"
          :value="model.value"
          :caption="model.caption"
          deleted
          @onDeleted="isClickCheckboxModel"
        ></ui-ef-chips>
      </template>
      <template slot="icon">
        <i class="fas fa-car"></i>
      </template>
    </ui-ef-container>
    <ui-blind
      :show="dShowMenu"
      class="wg-multi-location__blinde"
      @onClick="isHideMenu"
      position="fixed"
    >
      <div class="wg-multi-location__menu">
        <div class="wg-multi-location__menu-header">{{caption}}</div>
        <div class="wg-multi-location__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="wg-multi-location__menu-ef">
          <ui-ef-search
            placeholder="Введите марку, модель автомобиля..."
            @onInput="isSearch"
            :value="dTextValue"
            :showMenu="modelsFilter.length>0 || brandsFilter.length>0 || typesFilter.length>0"
          >
            <div class="wg-multi-location__search-menu">
              <div v-if="typesFilter.length>0" class="ui-ef-search__menu-group">Типы</div>
              <ui-ef-checkbox
                v-for="(type, key) in typesFilter"
                :key="'type_'+modType+'_'+key"
                :value="type.value"
                :caption="type.option"
                :checked="type.checked"
                @onClick="isClickCheckboxType"
              >{{type.option}}</ui-ef-checkbox>
              <div v-if="brandsFilter.length>0" class="ui-ef-search__menu-group">Марки</div>
              <ui-ef-checkbox
                v-for="(brand, key) in brandsFilter"
                :key="'sub_'+modBrand+'_'+key"
                :value="brand.value"
                :caption="brand.option"
                :checked="brand.checked"
                @onClick="isClickCheckboxBrand"
              >{{brand.option}}</ui-ef-checkbox>
              <div v-if="modelsFilter.length>0" class="ui-ef-search__menu-group">Модели</div>
              <ui-ef-checkbox
                v-for="(model, key) in modelsFilter"
                :key="'model_'+modModel+'_'+key"
                :value="model.value"
                :caption="model.option"
                :checked="model.checked"
                @onClick="isClickCheckboxModel"
              >{{model.option}}</ui-ef-checkbox>
            </div>
          </ui-ef-search>
        </div>
        <div
          class="wg-multi-location__menu-chipheader"
          v-if="dCheckTypes.length>0 || dCheckBrands.length>0 || dCheckModels.length>0"
        >Выбранные пункты</div>
        <div class="wg-multi-location__menu-chipsies">
          <ui-ef-chips
            v-for="(type, key) in dCheckTypes"
            :key="'type_'+key"
            :value="type.value"
            :caption="type.caption"
            deleted
            @onDeleted="isClickCheckboxType"
          ></ui-ef-chips>
          <ui-ef-chips
            v-for="(brand, key) in dCheckBrands"
            :key="'brand_'+key"
            :value="brand.value"
            :caption="brand.caption"
            deleted
            @onDeleted="isClickCheckboxBrand"
          ></ui-ef-chips>
          <ui-ef-chips
            v-for="(model, key) in dCheckModels"
            :key="'model_'+key"
            :value="model.value"
            :caption="model.caption"
            deleted
            @onDeleted="isClickCheckboxModel"
          ></ui-ef-chips>
        </div>
        <div
          class="wg-multi-location__menu-chipbuttons"
          v-if="dCheckTypes.length>0 || dCheckBrands.length>0 || dCheckModels.length>0"
        >
          <input
            class="ui-button ui-button_float_black"
            type="button"
            value="Готово"
            @click="isHideMenu"
          >
          <input
            class="ui-button ui-button_float_black"
            type="button"
            value="Очистить"
            @click="isClear"
          >
        </div>
      </div>
    </ui-blind>
  </div>
</template>
<script>
export default {
  name: "wg-multi-transport",
  data() {
    return {
      dShowMenu: false,
      dTextValue: "",
      dSearth: "",
      dValue: "",
      dCheckModels: [],
      dCheckBrands: [],
      dCheckTypes: [],
      modModel: 1,
      modBrand: 1,
      modType: 1
    };
  },
  props: {
    caption: {
      type: String,
      default: "Место проживания"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    models_id: {
      type: Array,
      default: () => []
    },
    brands_id: {
      type: Array,
      default: () => []
    },
    types_id: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isClear() {
      this.dCheckModels = [];
      this.dCheckBrands = [];
      this.dCheckTypes = [];
      this.isHideMenu();
    },
    isClickText() {
      this.dSearth = this.dTextValue;
      //показывать меню если не удаляем чипсы
      let fShowMenu = true;
      event.target.classList.forEach(className => {
        if (className == "ui-ef-chips__button" || className == "fa-times") {
          fShowMenu = false;
        }
      });
      this.dShowMenu = fShowMenu;
    },
    isHideMenu() {
      this.dShowMenu = false;
    },
    isSearch(strSearch) {
      this.dSearth = strSearch;
    },
    isClickCheckboxType(chb) {
      // console.dir(chb);
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckTypes.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckTypes.push(chb);
        //убрать у субъектов отметки
        let gBrands = this.$store.getters["transports/getBrands"](chb.value);
        gBrands.forEach(gBrand => {
          this.dCheckBrands.forEach((checkBrand, key) => {
            if (gBrand.brand_id == checkBrand.value) {
              this.dCheckBrands.splice(key, 1);
            }
          });
          //убрать у городов отметки
          let gModels = this.$store.getters["transports/getModels"](
            gBrand.brand_id
          );
          gModels.forEach(gModel => {
            this.dCheckModels.forEach((checkModel, key) => {
              if (gModel.model_id == checkModel.value) {
                this.dCheckModels.splice(key, 1);
              }
            });
          });
        });
      }
      if (chb.checked == false) {
        this.dCheckTypes.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckTypes.splice(key, 1);
          }
        });
      }
      this.modType++;
    },
    isClickCheckboxBrand(chb) {
      // console.dir(chb);
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckBrands.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckBrands.push(chb);
        //убрать у городов отметки
        let gModels = this.$store.getters["transports/getModels"](chb.value);
        gModels.forEach(gModel => {
          this.dCheckModels.forEach((checkModel, key) => {
            if (gModel.model_id == checkModel.value) {
              this.dCheckModels.splice(key, 1);
            }
          });
        });
        // убрать у стран отметки
        let typeId = gModels[0].type_id;
        this.dCheckTypes.forEach((checkType, key) => {
          if (typeId == checkType.value) {
            this.dCheckTypes.splice(key, 1);
          }
        });
      }
      if (chb.checked == false) {
        this.dCheckBrands.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckBrands.splice(key, 1);
          }
        });
      }
      this.modBrand++;
    },
    isClickCheckboxModel(chb) {
      // console.dir(chb);
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckModels.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckModels.push(chb);
        //убрать у субъектов отметки
        let gModel = this.$store.getters["transports/getModel"](chb.value);
        this.dCheckBrands.forEach((checkBrand, key) => {
          if (gModel.brand_id == checkBrand.value) {
            this.dCheckBrands.splice(key, 1);
          }
        });
        // убрать у стран отметки
        this.dCheckTypes.forEach((checkType, key) => {
          if (gModel.type_id == checkType.value) {
            this.dCheckTypes.splice(key, 1);
          }
        });
      }
      if (chb.checked == false) {
        this.dCheckModels.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckModels.splice(key, 1);
          }
        });
      }
      this.modModel++;
    },
    setupTypes() {
      if (this.types_id.length > 0) {
        this.types_id.forEach(id => {
          let type = this.$store.getters["transports/getType"](id);
          this.isClickCheckboxType({
            value: type.type_id,
            caption: type.name,
            checked: true
          });
        });
      }
    },
    setupBrands() {
      if (this.brands_id.length > 0) {
        this.brands_id.forEach(id => {
          let brand = this.$store.getters["transports/getBrand"](id);
          this.isClickCheckboxBrand({
            value: brand.brand_id,
            caption: brand.extended_name,
            checked: true
          });
        });
      }
    },
    setupModels() {
      if (this.models_id.length > 0) {
        this.models_id.forEach(id => {
          let model = this.$store.getters["transports/getModel"](id);
          this.isClickCheckboxModel({
            value: model.model_id,
            caption: model.extended_name,
            checked: true
          });
        });
      }
    }
  },
  computed: {
    modelsId() {
      let modelsId = [];
      this.dCheckModels.forEach(model => {
        modelsId.push(model.value);
      });
      return modelsId;
    },
    typesId() {
      let typesId = [];
      this.dCheckTypes.forEach(type => {
        typesId.push(type.value);
      });
      return typesId;
    },
    brandsId() {
      let brandId = [];
      this.dCheckBrands.forEach(brand => {
        brandId.push(brand.value);
      });
      return brandId;
    },
    models() {
      let models = JSON.parse(
        JSON.stringify(this.$store.state.transports.models)
      );
      if (models != undefined) {
        models = models.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        let menu = models.map(model => {
          return {
            value: model.model_id,
            option: model.extended_name,
            checked: false
          };
        });
        return menu;
      }
      return undefined;
    },
    brands() {
      let brands = JSON.parse(
        JSON.stringify(this.$store.state.transports.brands)
      );
      if (brands != undefined) {
        brands = brands.sort(function(a, b) {
          if (a.type_id > b.type_id) {
            return 1;
          }
          if (a.type_id < b.type_id) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        let menu = brands.map(brand => {
          return {
            value: brand.brand_id,
            option: brand.name + " (Все модели)",
            checked: false
          };
        });
        return menu;
      }
      return undefined;
    },
    types() {
      let types = JSON.parse(
        JSON.stringify(this.$store.state.transports.types)
      );
      if (types != undefined) {
        types = types.sort(function(a, b) {
          if (a.type_id > b.type_id) {
            return 1;
          }
          if (a.type_id < b.type_id) {
            return -1;
          }
          if (a.brand_id > b.brand_id) {
            return 1;
          }
          if (a.brand_id < b.brand_id) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        let menu = types.map(type => {
          return {
            value: type.type_id,
            option: type.extended_name,
            checked: false
          };
        });
        return menu;
      }
      return undefined;
    },
    modelsFilter() {
      let modelsId = this.modelsId;

      if (this.dSearth != "" && this.models != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp(repl, "i");
        let models = this.models.filter(type => {
          return -1 != type.option.search(regexp);
        });

        models = models.map(type => {
          type.checked = false;
          modelsId.forEach(checkType => {
            if (checkType == type.value) {
              type.checked = true;
            }
          });
          return type;
        });

        return models;
      }
      return [];
    },
    typesFilter() {
      let typesId = this.typesId;
      if (this.dSearth != "" && this.types != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let types = this.types.filter(model => {
          return -1 != model.option.search(regexp);
        });
        types = types.map(model => {
          model.checked = false;
          typesId.forEach(checkModel => {
            if (checkModel == model.value) {
              model.checked = true;
            }
          });
          return model;
        });
        return types;
      }
      return [];
    },
    brandsFilter() {
      let brandsId = this.brandsId;
      if (this.dSearth != "" && this.brands != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let brands = this.brands.filter(brand => {
          return -1 != brand.option.search(regexp);
        });
        brands = brands.map(brand => {
          brand.checked = false;
          brandsId.forEach(checkBrand => {
            if (checkBrand == brand.value) {
              brand.checked = true;
            }
          });
          return brand;
        });
        return brands;
      }
      return [];
    }
  },
  mounted() {
    this.setupModels();
    this.setupBrands();
    this.setupTypes();
  }
};
</script>
