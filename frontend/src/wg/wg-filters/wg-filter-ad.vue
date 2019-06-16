<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр обявлений</template>
    <template slot="content">
      <form ref="formFilterAds">
        <ui-ef-select
          class="ui-ef-select_white"
          name="sort_id"
          caption="Сортировать по"
          cleaner
          :menu="sortMenu"
        />
        <wg-multi-location
          :countries_id="countries_id"
          :subjects_id="subjects_id"
          :cities_id="cities_id"
          caption="Места продажи"
          class="wg-multi-location_white"
        />
        <wg-multi-transport
          :types_id="types_id"
          :brands_id="brands_id"
          :models_id="models_id"
          caption="Марки, модели"
          class="wg-multi-location_white"
        />
        <div class="wg-filter__section">
          <div class="row">
            <div class="col_9">
              <div class="ui-header ui-header_white ui-header_3">Прочее</div>
              <ui-ef-select
                class="ui-ef-select_white"
                name="drive_id[]"
                :menu="dDriveMenu"
                caption="Привод"
                multiple
              />
              <ui-ef-select
                class="ui-ef-select_white"
                name="transmission_id[]"
                caption="Коробка передач"
                :menu="dTransmissionMenu"
                multiple
              />
              <ui-ef-select
                class="ui-ef-select_white"
                name="body_id[]"
                caption="Кузов"
                :menu="dBodyMenu"
                multiple
              />
            </div>
          </div>
          <div class="row">
            <div class="col_4">
              <ui-ef-text
                class="ui-ef-text_white"
                name="mileage"
                caption="Пробег от"
                :maxlength="10"
                :value="mileage"
                masc="mascNumber"
                @onBlur="onBlurMileage"
                @onInput="mileage=$event"
              />
            </div>
            <div class="col_4 col_offset-1">
              <ui-ef-text
                class="ui-ef-text_white"
                name="mileage2"
                caption="до"
                :maxlength="10"
                :value="mileage2"
                masc="mascNumber"
                @onBlur="onBlurMileage"
                @onInput="mileage2=$event"
              />
            </div>
          </div>
        </div>
        <div class="wg-filter__section">
          <div class="row">
            <div class="col_12">
              <div class="ui-header ui-header_white ui-header_3">Двигатель</div>
            </div>
          </div>
          <div class="row">
            <div class="col_9">
              <ui-ef-select
                class="ui-ef-select_white"
                name="fuel_id[]"
                caption="Топливо"
                :menu="dFuelMenu"
                multiple
              />
            </div>
          </div>
          <div class="row">
            <div class="col_4">
              <ui-ef-text
                class="ui-ef-text_white"
                name="power"
                caption="Мощьность от"
                :value="power"
                masc="mascNumber"
                @onBlur="onBlurPower"
                @onInput="power=$event"
              />
            </div>
            <div class="col_4 col_offset-1">
              <ui-ef-text
                class="ui-ef-text_white"
                name="power2"
                caption="до"
                :value="power2"
                masc="mascNumber"
                @onBlur="onBlurPower"
                @onInput="power2=$event"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_4">
              <ui-ef-select
                class="ui-ef-select_white"
                name="volume"
                caption="Объем от"
                :menu="dVolumeMenu"
                cleaner
                @onSelect="dChekVolume=$event[0].value"
                @onClianer="dChekVolume=null"
              />
            </div>

            <div class="col_4 col_offset-1">
              <ui-ef-select
                class="ui-ef-select_white"
                name="volume2"
                caption="до"
                :menu="dVolumeMenu2"
                cleaner
                @onSelect="dChekVolume2=$event[0].value"
                @onClianer="dChekVolume2=null"
              />
            </div>
          </div>
        </div>
        <div class="wg-filter__section">
          <div class="row">
            <div class="col_12">
              <div class="ui-header ui-header_white ui-header_3">Расположение руля</div>
              <ui-ef-radio
                class="ui-ef-radio_white"
                name="wheel_id"
                value="1"
                :checked="wheel_id==1"
              >Левый</ui-ef-radio>
              <ui-ef-radio
                class="ui-ef-radio_white"
                name="wheel_id"
                value="2"
                :checked="wheel_id==2"
              >Правый</ui-ef-radio>
            </div>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Наличие документов</div>
            <ui-ef-radio
              class="ui-ef-radio_white"
              name="document_id"
              value="1"
              :checked="document_id==1"
            >С документами</ui-ef-radio>
            <ui-ef-radio
              class="ui-ef-radio_white"
              name="document_id"
              value="2"
              :checked="document_id==2"
            >Без документов</ui-ef-radio>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Состояние</div>
            <ui-ef-checkbox
              class="ui-ef-checkbox_white"
              name="state_id[]"
              value="1"
              :checked="state_id.indexOf('1') != -1?true:false"
            >Не требует вложений (ОТС)</ui-ef-checkbox>
            <ui-ef-checkbox
              class="ui-ef-checkbox_white"
              name="state_id[]"
              value="2"
              :checked="state_id.indexOf('2') != -1?true:false"
            >Требует незначительных вложений (ХТС)</ui-ef-checkbox>
            <ui-ef-checkbox
              class="ui-ef-checkbox_white"
              name="state_id[]"
              value="3"
              :checked="state_id.indexOf('3') != -1?true:false"
            >Требует значительных вложений</ui-ef-checkbox>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Обмен</div>
            <ui-ef-radio
              class="ui-ef-radio_white"
              name="exchange_id"
              value="1"
              :checked="exchange_id==1"
            >Готов к обмену</ui-ef-radio>
            <ui-ef-radio
              class="ui-ef-radio_white"
              name="exchange_id"
              value="2"
              :checked="exchange_id==2"
            >Не готов к обмену</ui-ef-radio>
          </div>
        </div>
      </form>
    </template>
    <template slot="buttons">
      <input
        class="ui-button ui-button_float_white"
        type="button"
        value="Применить"
        @click="isShowAds"
      >
      <!-- <input class="ui-button ui-button_float_white" type="button" value="Отмена" @click="isHide"> -->
    </template>
  </wg-filter>
</template>
<script>
export default {
  data() {
    return {
      filterAds: JSON.parse(this.$cookie.get("filter_ads")),
      exc: [],
      countries_id: [],
      subjects_id: [],
      cities_id: [],
      types_id: [],
      brands_id: [],
      models_id: [],
      sortMenu: [
        { value: 1, option: "дате (новые)", selected: false },
        { value: 2, option: "дате (старые)", selected: false },
        { value: 3, option: "городам (а-я)", selected: false },
        { value: 4, option: "городам (я-а)", selected: false },
        { value: 5, option: "моделям (а-я)", selected: false },
        { value: 6, option: "моделям (я-а)", selected: false },
        { value: 7, option: "цене (дороже)", selected: false },
        { value: 8, option: "цене (дешевле)", selected: false },
        { value: 9, option: "пробег (больше)", selected: false },
        { value: 10, option: "пробег (меньше)", selected: false },
        { value: 11, option: "мощность (больше)", selected: false },
        { value: 12, option: "мощность (меньше)", selected: false }
      ],
      dDriveMenu: [],
      dTransmissionMenu: [],
      dBodyMenu: [],
      dFuelMenu: [],
      dVolumeMenu: [],
      dVolumeMenu2: [],
      dChekVolume: undefined,
      dChekVolume2: undefined,
      document_id: undefined,
      wheel_id: undefined,
      state_id: [],
      exchange_id: undefined,
      mileage: undefined,
      mileage2: undefined,
      power: undefined,
      power2: undefined
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    // подключает гетеры из хранилишь

    driveMenu() {
      return this.generateMenu("drive_id[]", "transports/getMenuDrive");
    },
    transmissionMenu() {
      return this.generateMenu(
        "transmission_id[]",
        "transports/getMenuTransmission"
      );
    },
    bodyMenu() {
      return this.generateMenu("body_id[]", "transports/getMenuBody");
    },
    fuelMenu() {
      return this.generateMenu("fuel_id[]", "transports/getMenuFuel");
    },
    volumeMenu() {
      if (this.dChekVolume2 != undefined) {
        this.filterAds.volume2 = this.dChekVolume2;
      }
      if (this.dChekVolume2 == null) {
        delete this.filterAds.volume2;
        this.dChekVolume2 = undefined;
      }
      if (
        this.dChekVolume2 == undefined &&
        this.filterAds.volume2 != undefined
      ) {
        this.dChekVolume2 = this.filterAds.volume2;
      }
      return this.generateMenuVolume(
        "volume",
        "transports/getMenuVolume",
        this.dChekVolume2
      );
    },
    volumeMenu2() {
      if (this.dChekVolume != undefined) {
        this.filterAds.volume = this.dChekVolume;
      }
      if (this.dChekVolume == null) {
        delete this.filterAds.volume;
        this.dChekVolume = undefined;
      }
      if (this.dChekVolume == undefined && this.filterAds.volume != undefined) {
        this.dChekVolume = this.filterAds.volume;
      }
      return this.generateMenuVolume2(
        "volume2",
        "transports/getMenuVolume2",
        this.dChekVolume
      );
    }
  },
  watch: {
    driveMenu(newQ) {
      this.dDriveMenu = newQ;
    },
    transmissionMenu(newQ) {
      this.dTransmissionMenu = newQ;
    },
    bodyMenu(newQ) {
      this.dBodyMenu = newQ;
    },
    fuelMenu(newQ) {
      this.dFuelMenu = newQ;
    },
    volumeMenu(newQ) {
      this.dVolumeMenu = newQ;
    },
    volumeMenu2(newQ) {
      this.dVolumeMenu2 = newQ;
    },
    show(newQ) {
      if (newQ == true) {
        let fUsers = JSON.parse(this.$cookie.get("filter_ads"));
        if (fUsers != null) {
          this.filterAds = fUsers;
          this.power = this.filterAds["power"]
            ? this.filterAds["power"]
            : undefined;
          this.power2 = this.filterAds["power2"]
            ? this.filterAds["power2"]
            : undefined;
          this.mileage2 = this.filterAds["mileage2"]
            ? this.filterAds["mileage2"]
            : undefined;
          this.mileage = this.filterAds["mileage"]
            ? this.filterAds["mileage"]
            : undefined;
          this.exchange_id = this.filterAds["exchange_id"]
            ? this.filterAds["exchange_id"]
            : undefined;
          this.state_id = this.filterAds["state_id[]"]
            ? this.filterAds["state_id[]"].split(",")
            : [];
          this.wheel_id = this.filterAds["wheel_id"]
            ? this.filterAds["wheel_id"]
            : undefined;
          this.document_id = this.filterAds["document_id"]
            ? this.filterAds["document_id"]
            : undefined;
          this.countries_id = this.filterAds["countries_id[]"]
            ? this.filterAds["countries_id[]"].split(",")
            : [];
          this.subjects_id = this.filterAds["subjects_id[]"]
            ? this.filterAds["subjects_id[]"].split(",")
            : [];
          this.cities_id = this.filterAds["cities_id[]"]
            ? this.filterAds["cities_id[]"].split(",")
            : [];
          this.types_id = this.filterAds["types_id[]"]
            ? this.filterAds["types_id[]"].split(",")
            : [];
          this.brands_id = this.filterAds["brands_id[]"]
            ? this.filterAds["brands_id[]"].split(",")
            : [];
          this.models_id = this.filterAds["models_id[]"]
            ? this.filterAds["models_id[]"].split(",")
            : [];
          if (this.filterAds["sort_id"] != undefined) {
            this.sortMenu = this.sortMenu.map(val => {
              val.selected = false;
              if (val.value == this.filterAds["sort_id"]) {
                val.selected = true;
              }
              return val;
            });
          }
        }
      }
    }
  },
  methods: {
    onBlurPower() {
      let epow;

      if (
        this.power != "" &&
        this.power != undefined &&
        this.power2 != undefined &&
        this.power2 != "" &&
        Number(this.power.replace(/\s/g, "")) >
          Number(this.power2.replace(/\s/g, ""))
      ) {
        epow = this.power;
        this.power = this.power2;
        this.power2 = epow;
      }
    },
    onBlurMileage() {
      let epow;
      if (
        this.mileage != "" &&
        this.mileage != undefined &&
        this.mileage2 != undefined &&
        this.mileage2 != "" &&
        Number(this.mileage.replace(/\s/g, "")) >
          Number(this.mileage2.replace(/\s/g, ""))
      ) {
        epow = this.mileage;
        this.mileage = this.mileage2;
        this.mileage2 = epow;
      }
    },
    generateMenu(name, getter) {
      let ids =
        this.filterAds != null && this.filterAds[name] != undefined
          ? this.filterAds[name].split(",")
          : [];
      return this.$store.getters[getter].map((val, key) => {
        if (ids.indexOf(String(val.value)) != -1) {
          val.selected = true;
        }
        return val;
      });
    },
    generateMenuVolume(name, getter, chekVolume2) {
      // console.dir(chekVolume2);
      return this.$store.getters[getter]
        .filter((val, key) => {
          if (chekVolume2 != undefined && val.value >= chekVolume2) {
            return false;
          }
          return true;
        })
        .map((val, key) => {
          val.selected = false;
          if (
            this.filterAds["volume"] != undefined &&
            this.filterAds["volume"] == val.value
          ) {
            val.selected = true;
          }
          return val;
        });
    },
    generateMenuVolume2(name, getter, chekVolume1) {
      return this.$store.getters[getter]
        .filter((val, key) => {
          if (chekVolume1 != undefined && val.value <= chekVolume1) {
            return false;
          }
          return true;
        })
        .map((val, key) => {
          val.selected = false;
          if (
            this.filterAds["volume2"] != undefined &&
            this.filterAds["volume2"] == val.value
          ) {
            val.selected = true;
          }
          return val;
        });
    },
    isHide() {
      this.$emit("onHide");
    },
    isShowAds() {
      let form = this.$refs.formFilterAds;
      let body = new FormData(form);
      //добавляем фильтр в куки
      let cookieFilterAds = {};
      for (var key of body.keys()) {
        if (body.getAll(key).length > 1) {
          cookieFilterAds[key] = body.getAll(key).join();
        } else {
          cookieFilterAds[key] = body.get(key);
        }
      }
      this.$cookie.set("filter_ads", JSON.stringify(cookieFilterAds),{
        expires: "1D"
      });
      // console.dir(this.$cookie.get("filter_ads"));
      //отправляем запрос
      body.set("page", 1);
      this.$api("ads")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("ads/updateAds", response.body.data.ads);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>