<template>
  <div class="wg-multi-location">
    <ui-ef-text
      @onClick="isClickText"
      :readonly="true"
      :disabled="disabled"
      :value="dTextValue"
      :caption="caption"
    ></ui-ef-text>

    <input type="hidden" name="cities_id" :value="citiesId">
    <input type="hidden" name="subjects_id" :value="subjectsId">
    <ui-blind
      :show="dShowMenu"
      class="wg-multi-location__blinde"
      @onClick="isHideMenu"
      position="fixed"
    >
      <div class="wg-multi-location__menu">
        <div class="wg-multi-location__menu-header">Укажите свой город</div>
        <div class="wg-multi-location__menu-close">
          <div @click="isHideMenu" class="ui-button ui-button_float_black ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="wg-multi-location__menu-ef">
          <ui-ef-search
            placeholder="Введите название города"
            @onInput="isSearch"
            :value="dTextValue"
            :showMenu="subjectsFilter.length>1 || citiesFilter.length>1"
          >
            <div class="wg-multi-location__search-menu">
              <ui-ef-checkbox
                v-for="(subject, key) in subjectsFilter"
                :key="'sub_'+key"
                :value="subject.value"
                :caption="subject.option"
                @onClick="isClickCheckboxSubject"
              >{{subject.option}}</ui-ef-checkbox>
              <ui-ef-checkbox
                v-for="(city, key) in citiesFilter"
                :key="'cit_'+key"
                :value="city.value"
                :caption="city.option"
                @onClick="isClickCheckboxCity"
              >{{city.option}}</ui-ef-checkbox>
            </div>
          </ui-ef-search>
        </div>
        <div
          class="wg-multi-location__menu-chipheader"
          v-if="citiesFilter.length>0"
        >Выбранные пункты</div>
        <div class="wg-multi-location__menu-chipsies">
          <ui-ef-chips
            v-for="(subject, key) in dCheckSubjects"
            :key="'subj_'+key"
            :value="subject.value"
            :caption="subject.caption"
            deleted
            @onDeleted="isClickCheckboxSubject"
          ></ui-ef-chips>
          <ui-ef-chips
            v-for="(city, key) in dCheckCities"
            :key="'cit_'+key"
            :value="city.value"
            :caption="city.caption"
            deleted
            @onDeleted="isClickCheckboxCity"
          ></ui-ef-chips>
        </div>
      </div>
    </ui-blind>
  </div>
</template>
<script>
export default {
  name: "wg-multi-location",
  data() {
    return {
      dShowMenu: false,
      dCities: undefined,
      dTextValue: "",
      dSearth: "",
      dValue: "",
      dCheckCities: [],
      dCheckSubjects: []
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
    isClickCheckboxCity(chb) {
      if (chb.checked == true) {
        this.dCheckSubjects.forEach((elem, key) => {
          if (elem.value == chb.value) {
            return;
          }
        });
        this.dCheckCities.push(chb);
      }
      if (chb.checked == false) {
        this.dCheckCities.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckCities.splice(key, 1);
          }
        });
      }
    },
    isClickCheckboxSubject(chb) {
      if (chb.checked == true) {
        this.dCheckSubjects.forEach((elem, key) => {
          if (elem.value == chb.value) {
            return;
          }
        });
        this.dCheckSubjects.push(chb);
        //убрать у городов
        let gCities = this.$store.getters["locations/getCities"](chb.value);
        console.dir(gCities);
      }
      if (chb.checked == false) {
        this.dCheckSubjects.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckSubjects.splice(key, 1);
          }
        });
      }
    }
  },
  computed: {
    citiesId() {
      let citiesId = [];
      this.dCheckCities.forEach(city => {
        citiesId.push(city.value);
      });
      return citiesId;
    },
    subjectsId() {
      let subjectId = [];
      this.dCheckSubjects.forEach(subject => {
        subjectId.push(subject.value);
      });
      return subjectId;
    },
    subjects() {
      let subjects = JSON.parse(
        JSON.stringify(this.$store.state.locations.subjects)
      );
      if (subjects != undefined) {
        subjects = subjects.sort(function(a, b) {
          if (a.country_id > b.country_id) {
            return 1;
          }
          if (a.country_id < b.country_id) {
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
        let menu = subjects.map(subject => {
          return {
            value: subject.subject_id,
            option: subject.extended_name
          };
        });
        return menu;
      }
      return undefined;
    },
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
            option: city.extended_name
          };
        });
        return menu;
      }
      return undefined;
    },
    citiesFilter() {
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
    },
    subjectsFilter() {
      if (this.dSearth != "" && this.subjects != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let subjects = this.subjects.filter(subject => {
          return -1 != subject.option.search(regexp);
        });
        return subjects;
      }
      return [];
    }
  }
};
</script>
