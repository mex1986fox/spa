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

    <input type="hidden" :name="name" :value="dValue">
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
          <ui-ef-search placeholder="Введите модель автомобиля" @onInput="isSearch"></ui-ef-search>
        </div>
        <div
          class="wg-select-location__menu-chipheader"
          v-if="modelsFilters.length>0"
        >Нажмите на модель автомобиля</div>
        <div class="wg-select-location__menu-chipsies">
          <ui-ef-chips
            v-for="(model, key) in modelsFilters"
            :key="key"
            :value="model.value"
            :caption="model.option"
            @onClick="isClickChips"
          ></ui-ef-chips>
        </div>
        <div class="wg-select-location__menu-chipbuttons" v-if="modelsFilters.length>0">
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
  name: "wg-select-location",
  data() {
    return {
      dShowMenu: false,
      dModels: undefined,
      dTextValue: "",
      dSearth: "",
      dValue: ""
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
  methods: {
    isClickText() {
      this.dSearth = this.dTextValue;
      this.dShowMenu = true;
      if (this.dModels == undefined) {
        this.dModels = this.models;
      }
    },
    isClear() {
      this.dTextValue = "";
      this.dSearth = "";
      this.dValue = "";
      this.isHideMenu();
    },
    isHideMenu() {
      this.dShowMenu = false;
    },
    isSearch(strSearch) {
      this.dSearth = strSearch;
    },
    isClickChips(chips) {
      this.dValue = chips.value;
      this.dTextValue = chips.caption;
      this.isHideMenu();
    }
  },
  computed: {
    models() {
      let models = JSON.parse(
        JSON.stringify(this.$store.state.transports.models)
      );
      if (models != undefined) {
        models = models.sort(function(a, b) {
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
        let menu = models.map(model => {
          return {
            value: model.model_id,
            option: model.extended_name
          };
        });
        return menu;
      }
      return undefined;
    },
    modelsFilters() {
      if (this.dSearth != "" && this.models != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp(repl, "i");
        let models = this.models.filter(model => {
          return -1 != model.option.search(regexp);
        });
        return models;
      }
      return [];
    }
  }
};
</script>
