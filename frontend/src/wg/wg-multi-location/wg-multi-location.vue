<template>
  <div class="wg-multi-location">
    <ui-ef-container :maxlength="180" :caption="caption" @onClick="isClickText">
      <template v-if="dCheckCountries.length>0 || dCheckSubjects.length>0 || dCheckCities.length>0">
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(country, key) in dCheckCountries"
          :key="'count_'+key"
          :value="country.value"
          :caption="country.caption"
          deleted
          @onDeleted="isClickCheckboxCountry"
        ></ui-ef-chips>
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(subject, key) in dCheckSubjects"
          :key="'subj_'+key"
          :value="subject.value"
          :caption="subject.caption"
          deleted
          @onDeleted="isClickCheckboxSubject"
        ></ui-ef-chips>
        <ui-ef-chips
          class="ui-ef-chips_white"
          v-for="(city, key) in dCheckCities"
          :key="'cit_'+key"
          :value="city.value"
          :caption="city.caption"
          deleted
          @onDeleted="isClickCheckboxCity"
        ></ui-ef-chips>
      </template>
      <template slot="icon">
        <i class="fas fa-map-marker-alt"></i>
      </template>
    </ui-ef-container>
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
            placeholder="Введите название страны, области, города..."
            @onInput="isSearch"
            :value="dTextValue"
            :showMenu="countriesFilter.length>0 || subjectsFilter.length>0 || citiesFilter.length>0"
          >
            <div class="wg-multi-location__search-menu">
              <ui-ef-checkbox
                v-for="(country, key) in countriesFilter"
                :key="'count_'+modCountry+'_'+key"
                :value="country.value"
                :caption="country.option"
                :checked="country.checked"
                @onClick="isClickCheckboxCountry"
              >{{country.option}}</ui-ef-checkbox>

              <ui-ef-checkbox
                v-for="(subject, key) in subjectsFilter"
                :key="'sub_'+modSubject+'_'+key"
                :value="subject.value"
                :caption="subject.option"
                :checked="subject.checked"
                @onClick="isClickCheckboxSubject"
              >{{subject.option}}</ui-ef-checkbox>

              <ui-ef-checkbox
                v-for="(city, key) in citiesFilter"
                :key="'cit_'+modCity+'_'+key"
                :value="city.value"
                :caption="city.option"
                :checked="city.checked"
                @onClick="isClickCheckboxCity"
              >{{city.option}}</ui-ef-checkbox>
            </div>
          </ui-ef-search>
        </div>
        <div
          class="wg-multi-location__menu-chipheader"
          v-if="dCheckCountries.length>0 || dCheckSubjects.length>0 || dCheckCities.length>0"
        >Выбранные пункты</div>
        <div class="wg-multi-location__menu-chipsies">
          <ui-ef-chips
            v-for="(country, key) in dCheckCountries"
            :key="'count_'+key"
            :value="country.value"
            :caption="country.caption"
            deleted
            @onDeleted="isClickCheckboxCountry"
          ></ui-ef-chips>
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
        <div
          class="wg-multi-location__menu-chipbuttons"
          v-if="dCheckCountries.length>0 || dCheckSubjects.length>0 || dCheckCities.length>0"
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
  name: "wg-multi-location",
  data() {
    return {
      dShowMenu: false,
      dTextValue: "",
      dSearth: "",
      dValue: "",
      dCheckCities: [],
      dCheckSubjects: [],
      dCheckCountries: [],
      modCity: 1,
      modSubject: 1,
      modCountry: 1
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
    isClear() {
      this.dCheckCities = [];
      this.dCheckSubjects = [];
      this.dCheckCountries = [];
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
    isClickCheckboxCountry(chb) {
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckCountries.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckCountries.push(chb);
        //убрать у субъектов отметки
        let gSubjects = this.$store.getters["locations/getSubjects"](chb.value);
        gSubjects.forEach(gSubject => {
          this.dCheckSubjects.forEach((checkSubj, key) => {
            if (gSubject.subject_id == checkSubj.value) {
              this.dCheckSubjects.splice(key, 1);
            }
          });
          //убрать у городов отметки
          let gCities = this.$store.getters["locations/getCities"](
            gSubject.subject_id
          );
          gCities.forEach(gCity => {
            this.dCheckCities.forEach((checkCity, key) => {
              if (gCity.city_id == checkCity.value) {
                this.dCheckCities.splice(key, 1);
              }
            });
          });
        });
      }
      if (chb.checked == false) {
        this.dCheckCountries.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckCountries.splice(key, 1);
          }
        });
      }
      this.modCountry++;
    },
    isClickCheckboxSubject(chb) {
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckSubjects.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckSubjects.push(chb);
        //убрать у городов отметки
        let gCities = this.$store.getters["locations/getCities"](chb.value);
        gCities.forEach(gCity => {
          this.dCheckCities.forEach((checkCity, key) => {
            if (gCity.city_id == checkCity.value) {
              this.dCheckCities.splice(key, 1);
            }
          });
        });
        // убрать у стран отметки
        let countryId = gCities[0].country_id;
        this.dCheckCountries.forEach((checkCountry, key) => {
          if (countryId == checkCountry.value) {
            this.dCheckCountries.splice(key, 1);
          }
        });
      }
      if (chb.checked == false) {
        this.dCheckSubjects.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckSubjects.splice(key, 1);
          }
        });
      }
      this.modSubject++;
    },
    isClickCheckboxCity(chb) {
      if (chb.checked == true) {
        let fBreake = false;
        this.dCheckCities.forEach((elem, key) => {
          if (elem.value == chb.value) {
            fBreake = true;
          }
        });
        if (fBreake != true) this.dCheckCities.push(chb);
        //убрать у субъектов отметки
        let gCity = this.$store.getters["locations/getCity"](chb.value);
        this.dCheckSubjects.forEach((checkSubj, key) => {
          if (gCity.subject_id == checkSubj.value) {
            this.dCheckSubjects.splice(key, 1);
          }
        });
        // убрать у стран отметки
        this.dCheckCountries.forEach((checkCountry, key) => {
          if (gCity.subject_id == checkCountry.value) {
            this.dCheckCountries.splice(key, 1);
          }
        });
      }
      if (chb.checked == false) {
        this.dCheckCities.forEach((elem, key) => {
          if (elem.value == chb.value) {
            this.dCheckCities.splice(key, 1);
          }
        });
      }
      this.modCity++;
    }
  },
  computed: {
    countriesId() {
      let countriesId = [];
      this.dCheckCountries.forEach(country => {
        countriesId.push(country.value);
      });
      return countriesId;
    },
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
    countries() {
      let countries = JSON.parse(
        JSON.stringify(this.$store.state.locations.countries)
      );
      if (countries != undefined) {
        countries = countries.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        let menu = countries.map(country => {
          return {
            value: country.country_id,
            option: country.name,
            checked: false
          };
        });
        return menu;
      }
      return undefined;
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
            option: subject.extended_name,
            checked: false
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
            option: city.extended_name,
            checked: false
          };
        });
        return menu;
      }
      return undefined;
    },
    countriesFilter() {
      let countriesId = this.countriesId;

      if (this.dSearth != "" && this.countries != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let countries = this.countries.filter(country => {
          return -1 != country.option.search(regexp);
        });

        countries = countries.map(country => {
          country.checked = false;
          countriesId.forEach(checkCountry => {
            if (checkCountry == country.value) {
              country.checked = true;
            }
          });
          return country;
        });

        return countries;
      }
      return [];
    },
    citiesFilter() {
      let citiesId = this.citiesId;
      if (this.dSearth != "" && this.cities != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let cities = this.cities.filter(city => {
          return -1 != city.option.search(regexp);
        });
        cities = cities.map(city => {
          city.checked = false;
          citiesId.forEach(checkCity => {
            if (checkCity == city.value) {
              city.checked = true;
            }
          });
          return city;
        });
        return cities;
      }
      return [];
    },
    subjectsFilter() {
      let subjectsId = this.subjectsId;
      if (this.dSearth != "" && this.subjects != undefined) {
        var invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        var repl = this.dSearth.replace(invalid, match => {
          return "\\" + match;
        });
        let regexp = new RegExp("^" + repl, "i");
        let subjects = this.subjects.filter(subject => {
          return -1 != subject.option.search(regexp);
        });
        subjects = subjects.map(subject => {
          subject.checked = false;
          subjectsId.forEach(checkSubject => {
            if (checkSubject == subject.value) {
              subject.checked = true;
            }
          });
          return subject;
        });
        return subjects;
      }
      return [];
    }
  }
};
</script>
