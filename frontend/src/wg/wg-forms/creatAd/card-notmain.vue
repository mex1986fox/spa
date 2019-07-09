<template>
  <form ref="formUpdateAd">
    <div class="wg-form-registration__card-header">Укажите дополнительную информацию</div>
    <div class="wg-form-create-post__card-ef">
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
          <ui-ef-radio name="wheel_id" value="1">Левый</ui-ef-radio>
          <ui-ef-radio name="wheel_id" value="2">Правый</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Наличие документов</div>
          <ui-ef-radio name="document_id" value="1">С документами</ui-ef-radio>
          <ui-ef-radio name="document_id" value="2">Без документов</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Состояние</div>
          <ui-ef-radio name="state_id" value="1">Не требует вложений (ОТС)</ui-ef-radio>
          <ui-ef-radio name="state_id" value="2">Требует незначительных вложений (ХТС)</ui-ef-radio>
          <ui-ef-radio name="state_id" value="3">Требует значительных вложений</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_12">
          <div class="ui-header ui-header_3">Обмен</div>
          <ui-ef-radio name="exchange_id" value="1">Готов к обмену</ui-ef-radio>
          <ui-ef-radio name="exchange_id" value="2">Не готов к обмену</ui-ef-radio>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <div class="ui-header ui-header_3">Дополнительно</div>
          <ui-ef-textarea
            name="description"
            caption="Описание"
            :help="exc['description']"
            :autoresize="200"
          ></ui-ef-textarea>
        </div>
      </div>
    </div>
    <div class="wg-form-registration__card-buttons">
      <div class="ui-button ui-button_float_black" @click="isUpdateAd">Отправить</div>
      <div class="ui-button ui-button_float_black" @click="isSkip">Пропустить</div>
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
    <ui-snackbar :show="showSnackbar" type="err" :time="5000" @onHide="isHideSnackbar">
      <p>{{masSnackbar}}</p>
      <div class="ui-snackbar__buttons">
        <div
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="isHideSnackbar"
        >Закрыть</div>
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
      dSpinn: false,
      showSelecWolume: false,
      showSelecPower: false,
      showSnackbar: false,
      masSnackbar: ""
    };
  },
  props: {
    ad: {
      tupe: Object,
      default: undefined
    }
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken"
    }),
    driveMenu() {
      return this.$store.getters["transports/getMenuDrive"]();
    },
    transmissionMenu() {
      return this.$store.getters["transports/getMenuTransmission"]();
    },
    bodyMenu() {
      return this.$store.getters["transports/getMenuBody"]();
    },
    fuelMenu() {
      return this.$store.getters["transports/getMenuFuel"]();
    },
    volumeMenu() {
      return this.$store.getters["transports/getMenuVolume"]();
    },
    wheelMenu() {
      return this.$store.getters["transports/getMenuWheel"]();
    }
  },
  methods: {
    isHideSnackbar() {
      this.showSnackbar = false;
      this.masSnackbar = "";
    },
    isSelectFuel(selObg) {
      if (selObg[0]["value"] == 3) {
        this.showSelecWolume = false;
      } else {
        this.showSelecWolume = true;
      }
      this.showSelecPower = true;
    },
    isSkip() {
      this.$emit("onAdUpdated", this.ad);
      this.dSpinn = false;
    },
    isUpdateAd() {
      this.dSpinn = true;
      this.exc = [];

      let form = this.$refs.formUpdateAd;
      let body = new FormData(form);

      body.set("access_token", this.token);
      body.set("ad_id", this.ad.ad_id);
      let flExc = false;
      let description = body.get("description");

      if (description.length > 1600) {
        this.exc["description"] = "Не более 1600 символов.";
        flExc = true;
      }
      // если есть ошибки запрос не отправляем
      if (flExc == true) {
        this.dSpinn = false;
        return;
      }
      //задаем нулевые параметры
      let _body = new FormData();
      [
        "drive_id",
        "transmission_id",
        "body_id",
        "mileage",
        "fuel_id",
        "power",
        "volume",
        "wheel_id",
        "document_id",
        "state_id",
        "exchange_id"
      ].forEach(elem => {
        _body.set(elem, 0);
      });
      _body.set("description", "");
      //сливаем поля
      for (var key of body.keys()) {
        if (body.get(key) != "") {
          _body.set(key, body.get(key));
        }
      }
      this.$api("ads")
        .update(_body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$emit("onAdUpdated", response.body.data.ad);
            this.dSpinn = false;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            this.dSpinn = false;
            this.exc = error.body.data;
            if (this.exc.massege == "Запрос пустой не имеет параметров.") {
              this.showSnackbar = true;
              this.masSnackbar = "Заполните поля формы.";
            }
          }
        });
    }
  }
};
</script>
