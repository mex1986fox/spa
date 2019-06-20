<template>
  <form ref="formUpdatePost">
    <div class="wg-form-registration__card-header">Основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_3">
          <ui-ef-select name="year" :menu="yearMenu" caption="Год выпуска *" :help="exc['year']"/>
        </div>
      </div>
      <div class="row">
        <div class="col_3">
          <ui-ef-text
            :value="dAd.price"
            :help="exc['price']"
            name="price"
            caption="Цена руб. *"
            masc="mascNumber"
            :maxlength="11"
          />
        </div>
      </div>

      <div class="row">
        <div class="col_4">
          <div class="ui-header ui-header_3">Прочее</div>
          <ui-ef-select name="drive_id" :menu="driveMenu" caption="Привод" :help="exc['drive_id']"/>
          <ui-ef-select
            name="transmission_id"
            :menu="transmissionMenu"
            caption="Коробка передач"
            :help="exc['transmission_id']"
          />
          <ui-ef-select name="body_id" :menu="bodyMenu" caption="Кузов" :help="exc['body_id']"/>
          <ui-ef-text
            :help="exc['mileage']"
            name="mileage"
            :value="String(dAd.mileage)"
            caption="Пробег км."
            masc="mascNumber"
            :maxlength="10"
          />
        </div>
        <div class="col_4 col_offset-2">
          <div class="ui-header ui-header_3">Двигатель</div>
          <ui-ef-select
            @onSelect="isSelectFuel"
            name="fuel_id"
            :menu="fuelMenu"
            caption="Топливо"
            :help="exc['fuel_id']"
          />
          <ui-ef-text
            v-if="showSelecPower"
            :help="exc['power']"
            name="power"
            caption="Мощьность л.с."
            masc="mascNumber"
            :maxlength="4"
            :value="String(dAd.power)"
          />
          <ui-ef-select
            v-if="showSelecWolume"
            name="volume"
            :menu="volumeMenu"
            caption="Объем л."
            :help="exc['volume']"
          />
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Расположение руля</div>
          <ui-ef-radio
            name="wheel_id"
            value="1"
            :checked="dAd['wheel_id'] != null ? dAd['wheel_id'] == 1 : false"
          >Левый</ui-ef-radio>
          <ui-ef-radio
            name="wheel_id"
            value="2"
            :checked="dAd['wheel_id'] != null ? dAd['wheel_id'] == 2 : false"
          >Правый</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Наличие документов</div>
          <ui-ef-radio
            name="document_id"
            value="1"
            :checked="dAd['document_id'] != null ? dAd['document_id'] == 1 : false"
          >С документами</ui-ef-radio>
          <ui-ef-radio
            name="document_id"
            value="2"
            :checked="dAd['document_id'] != null ? dAd['document_id'] == 2 : false"
          >Без документов</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Состояние</div>
          <ui-ef-radio
            name="state_id"
            value="1"
            :checked="dAd['state_id'] != null ? dAd['state_id'] == 1 : false"
          >Не требует вложений (ОТС)</ui-ef-radio>
          <ui-ef-radio
            name="state_id"
            value="2"
            :checked="dAd['state_id'] != null ? dAd['state_id'] == 2 : false"
          >Требует незначительных вложений (ХТС)</ui-ef-radio>
          <ui-ef-radio
            name="state_id"
            value="3"
            :checked="dAd['state_id'] != null ? dAd['state_id'] == 3 : false"
          >Требует значительных вложений</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Обмен</div>
          <ui-ef-radio
            name="exchange_id"
            value="1"
            :checked="dAd['exchange_id'] != null ? dAd['exchange_id'] == 1 : false"
          >Готов к обмену</ui-ef-radio>
          <ui-ef-radio
            name="exchange_id"
            value="2"
            :checked="dAd['exchange_id'] != null ? dAd['exchange_id'] == 2 : false"
          >Не готов к обмену</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <div class="ui-header ui-header_3">Дополнительно</div>
          <ui-ef-textarea
            name="description"
            :value="dAd.description"
            caption="Описание"
            :help="exc['description']"
            :autoresize="200"
          ></ui-ef-textarea>
        </div>
      </div>
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isUpdateAd"
        :disabled="dSpinn"
        value="Изменить"
      >
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
    <ui-snackbar :show="showSnackbar" model="err" :time="5000" @onHide="showSnackbar=false">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="showSnackbar=false"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      exc: [],
      showSnackbar: false,
      showSelecWolume: true,
      showSelecPower: true,
      masSnackbar: "",
      dSpinn: false,
      dAd: this.ad,
      chWheel: this.ad["wheel_id"]
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    }),
    yearMenu() {
      let minDate = 1935;
      let maxDate = 2019;
      let menu = [];
      while (minDate != maxDate) {
        menu.push({
          value: maxDate,
          option: maxDate,
          selected: this.dAd.year == maxDate ? true : false
        });
        maxDate--;
      }
      return menu;
    },
    driveMenu() {
      return this.$store.getters["transports/getMenuDrive"]([
        this.dAd.drive_id
      ]);
    },
    transmissionMenu() {
      return this.$store.getters["transports/getMenuTransmission"]([
        this.dAd.transmission_id
      ]);
    },
    bodyMenu() {
      return this.$store.getters["transports/getMenuBody"]([this.dAd.body_id]);
    },
    fuelMenu() {
      return this.$store.getters["transports/getMenuFuel"]([this.dAd.fuel_id]);
    },
    volumeMenu() {
      return this.$store.getters["transports/getMenuVolume"]([this.dAd.volume]);
    },
    wheelMenu() {
      return this.$store.getters["transports/getMenuWheel"]([this.dAd.whel_id]);
    }
  },
  props: {
    ad: {
      type: Object,
      default: undefined
    }
  },
  watch: {
    token(newQ) {
      if (newQ != undefined) {
        this.$emit("onLogin");
      }
    }
  },
  methods: {
    isSelectFuel(selObg) {
      if (selObg[0]["value"] == 3) {
        this.showSelecWolume = false;
      } else {
        this.showSelecWolume = true;
      }
      this.showSelecPower = true;
    },
    isUpdateAd() {
      this.dSpinn = true;
      this.exc = [];
      let form = this.$refs.formUpdatePost;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let price = body.get("price");
      let year = body.get("year");
      body.set("ad_id", this.ad.ad_id);
      let fExc = false;
      if (price == undefined || price == "") {
        this.exc.price = "Заполните цену.";
        fExc = true;
      }
      if (year == undefined || year == "") {
        this.exc.year = "Заполните год.";
        fExc = true;
      }
      if (fExc == true) {
        this.masSnackbar = "Возникли ошибки в форме.";
        this.showSnackbar = true;
        this.dSpinn = false;
        return;
      }

      this.$api("ads")
        .update(body)
        .then(response => {
          this.dSpinn = false;
          this.dAd = response.body.data.ad;
          this.$emit("onUpdateAd", response.body.data.ad);
        })
        .catch(error => {
          this.dSpinn = false;
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.exc = exc;
        });
    }
  },
  mounted() {
    this.fuelMenu.forEach(element => {
      if (element.value == 3 && element.selected == true) {
        this.showSelecWolume = false;
      }
    });
  }
};
</script>

