<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр обявлений</template>
    <template slot="content">
      <form ref="formFilterPosts">
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
            <div class="col_7">
              <div class="ui-header ui-header_white ui-header_3">Прочее</div>
              <ui-ef-select
                class="ui-ef-select_white"
                name="drive_id"
                :menu="dDriveMenu"
                caption="Привод"
              />
              <ui-ef-select
                class="ui-ef-select_white"
                name="transmission_id"
                caption="Коробка передач"
                :menu="dTransmissionMenu"
              />
              <ui-ef-select
                class="ui-ef-select_white"
                name="body_id"
                caption="Кузов"
                :menu="dBodyMenu"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_3">
              <ui-ef-text
                class="ui-ef-text_white"
                name="mileage"
                caption="Пробег от"
                :maxlength="10"
              />
            </div>
            <div class="col_3 col_offset-1">
              <ui-ef-text class="ui-ef-text_white" name="mileage" caption="до" :maxlength="10"/>
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
            <div class="col_7">
              <ui-ef-select
                class="ui-ef-select_white"
                name="fuel_id"
                caption="Топливо"
                :menu="dFuelMenu"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_3">
              <ui-ef-text class="ui-ef-text_white" name="power" caption="Мощьность от"/>
            </div>
            <div class="col_3 col_offset-1">
              <ui-ef-text class="ui-ef-text_white" name="power" caption="до"/>
            </div>
          </div>
          <div class="row">
            <div class="col_3">
              <ui-ef-select
                class="ui-ef-select_white"
                name="volume"
                caption="Объем от"
                :menu="dVolumeMenu"
              />
            </div>
            <div class="col_3 col_offset-1">
              <ui-ef-select
                class="ui-ef-select_white"
                name="volume"
                caption="до"
                :menu="dVolumeMenu2"
              />
            </div>
          </div>
        </div>
        <div class="wg-filter__section">
          <div class="row">
            <div class="col_12">
              <div class="ui-header ui-header_white ui-header_3">Расположение руля</div>
              <ui-ef-radio class="ui-ef-radio_white" name="wheel_id" value="1">Левый</ui-ef-radio>
              <ui-ef-radio class="ui-ef-radio_white" name="wheel_id" value="2">Правый</ui-ef-radio>
            </div>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Наличие документов</div>
            <ui-ef-radio class="ui-ef-radio_white" name="document_id" value="1">С документами</ui-ef-radio>
            <ui-ef-radio class="ui-ef-radio_white" name="document_id" value="2">Без документов</ui-ef-radio>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Состояние</div>
            <ui-ef-checkbox class="ui-ef-checkbox_white" value="1">Не требует вложений (ОТС)</ui-ef-checkbox>
            <ui-ef-checkbox
              class="ui-ef-checkbox_white"
              value="2"
            >Требует незначительных вложений (ХТС)</ui-ef-checkbox>
            <ui-ef-checkbox class="ui-ef-checkbox_white" value="3">Требует значительных вложений</ui-ef-checkbox>
          </div>
          <div class="col_12">
            <div class="ui-header ui-header_white ui-header_3">Обмен</div>
            <ui-ef-radio class="ui-ef-radio_white" name="exchange_id" value="1">Готов к обмену</ui-ef-radio>
            <ui-ef-radio class="ui-ef-radio_white" name="exchange_id" value="2">Не готов к обмену</ui-ef-radio>
          </div>
        </div>
      </form>
    </template>
    <template slot="buttons">
      <input
        class="ui-button ui-button_float_white"
        type="button"
        value="Применить"
        @click="isShowPosts"
      >
      <!-- <input class="ui-button ui-button_float_white" type="button" value="Отмена" @click="isHide"> -->
    </template>
  </wg-filter>
</template>
<script>
export default {
  data() {
    return {
      filterPosts: {},
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
      dVolumeMenu2: []
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
      return this.$store.getters["transports/getMenuDrive"];
    },
    transmissionMenu() {
      return this.$store.getters["transports/getMenuTransmission"];
    },
    bodyMenu() {
      return this.$store.getters["transports/getMenuBody"];
    },
    fuelMenu() {
      return this.$store.getters["transports/getMenuFuel"];
    },
    volumeMenu() {
      return this.$store.getters["transports/getMenuVolume"];
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
      this.dVolumeMenu2 = newQ;
    },
    show(newQ) {
      if (newQ == true) {
        let fUsers = JSON.parse(this.$cookie.get("filter_ads"));
        if (fUsers != null) {
          this.filterPosts = fUsers;
          this.countries_id = this.filterPosts["countries_id[]"]
            ? this.filterPosts["countries_id[]"].split(",")
            : [];
          this.subjects_id = this.filterPosts["subjects_id[]"]
            ? this.filterPosts["subjects_id[]"].split(",")
            : [];
          this.cities_id = this.filterPosts["cities_id[]"]
            ? this.filterPosts["cities_id[]"].split(",")
            : [];
          this.types_id = this.filterPosts["types_id[]"]
            ? this.filterPosts["types_id[]"].split(",")
            : [];
          this.brands_id = this.filterPosts["brands_id[]"]
            ? this.filterPosts["brands_id[]"].split(",")
            : [];
          this.models_id = this.filterPosts["models_id[]"]
            ? this.filterPosts["models_id[]"].split(",")
            : [];
          if (this.filterPosts["sort_id"] != undefined) {
            this.sortMenu = this.sortMenu.map(val => {
              val.selected = false;
              if (val.value == this.filterPosts["sort_id"]) {
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
    isHide() {
      this.$emit("onHide");
    },
    isShowPosts() {
      let form = this.$refs.formFilterPosts;
      let body = new FormData(form);
      //добавляем фильтр в куки
      let cookieFilterPosts = {};
      for (var key of body.keys()) {
        cookieFilterPosts[key] = body.get(key);
      }
      // console.dir(cookieFilterPosts);
      this.$cookie.set("filter_posts", JSON.stringify(cookieFilterPosts));
      // console.dir(this.$cookie.get("filter_posts"));
      //отправляем запрос
      this.$api("post")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("posts/updatePosts", response.body.data.posts);
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