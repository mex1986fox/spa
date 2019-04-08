<template>
  <div class="wg-select-location">
    <ui-ef-text
      @onClick="isClickText"
      :readonly="true"
      :disabled="disabled"
      :value="dTextValue"
      :caption="caption"
    ></ui-ef-text>

    <input type="hidden" :name="name" :value="dValue">
    <ui-blind
      :show="dShowMenu"
      class="wg-select-location__blinde"
      @onClick="isHideMenu"
      position="fixed"
    >
      <div class="wg-select-location__menu">
        <div class="wg-select-location__menu-header">Укажите свой город</div>
        <div class="wg-select-location__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="wg-select-location__menu-ef">
          <ui-ef-search
            placeholder="Введите название города"
            @onInput="isSearch"
            :value="dTextValue"
          ></ui-ef-search>
        </div>
        <div
          class="wg-select-location__menu-chipheader"
          v-if="citiesFilters.length>0"
        >Нажмите на свой город</div>
        <div class="wg-select-location__menu-chipsies">
          <ui-ef-chips
            v-for="(city, key) in citiesFilters"
            :key="key"
            :value="city.value"
            :caption="city.option"
            @onClick="isClickChips"
          ></ui-ef-chips>
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
      dCities: undefined,
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
      default: "Город проживания"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isClickText() {
      this.dSearth = this.dTextValue;
      this.dShowMenu = true;
      if (this.dCities == undefined) {
        this.dCities = this.cities;
      }
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
      this.dShowMenu = false;
    }
  },
  computed: {
    cities() {
      let cities = JSON.parse(
        JSON.stringify(this.$store.state.locations.cities)
      );
      if (cities != undefined) {
        cities = cities.sort(function(a, b) {
          if (a.country_id > b.country_id) {
            return 1;
          }
          if (a.country_id < b.country_id) {
            return -1;
          }
          if (a.subject_id > b.subject_id) {
            return 1;
          }
          if (a.subject_id < b.subject_id) {
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
        let menu = cities.map(city => {
          return {
            value: city.city_id,
            option: city.extended_name,
          };
        });
        return menu;
      }
      return undefined;
    },
    citiesFilters() {
      if (this.dSearth != "" && this.cities != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let cities = this.cities.filter(city => {
          return -1 != city.option.search(regexp);
        });
        return cities;
      }
      return [];
    }
  }
};
</script>
