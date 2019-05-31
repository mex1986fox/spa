<template>
  <form ref="formUpdateAd">
    <div class="wg-form-registration__card-header">Укажите дополнительную информацию</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_4">
          <div class="ui-header ui-header_3">Прочее</div>
          <ui-ef-select name="drive_id" :menu="driveMenu" caption="Привод" :help="excDrive"/>
          <ui-ef-select
            name="transmission_id"
            :menu="transmissionMenu"
            caption="Коробка передач"
            :help="excTransmission"
          />
          <ui-ef-select name="body_id" :menu="bodyMenu" caption="Кузов" :help="excBody"/>
          <ui-ef-text
            :help="excMileage"
            name="mileage"
            caption="Пробег км."
            :masc="{use:mascNumber}"
            :maxlength="10"
          />
        </div>
        <div class="col_4 col_offset-2">
          <div class="ui-header ui-header_3">Двигатель</div>
          <ui-ef-select name="fuel_id" :menu="fuelMenu" caption="Топливо" :help="excFuel"/>
          <ui-ef-select name="volume" :menu="volumeMenu" caption="Объем л." :help="excVolume"/>
          <ui-ef-text
            :help="excPower"
            name="power"
            caption="Мощьность л.с."
            :masc="{use:mascNumber}"
            :maxlength="4"
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
          <ui-ef-textarea name="description" caption="Описание" :help="excDescr" :autoresize="200"></ui-ef-textarea>
        </div>
      </div>
    </div>
    <div class="wg-form-registration__card-buttons">
      <div class="ui-button ui-button_float_black" @click="isUpdateProfile">Отправить</div>
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excDrive: undefined,
      excTransmission: undefined,
      excBody: undefined,
      excMileage: undefined,
      excFuel: undefined,
      excVolume: undefined,
      excPower: undefined,
      excDescr: undefined,
      dSpinn: false
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
    },
    wheelMenu() {
      return this.$store.getters["transports/getMenuWheel"];
    }
  },
  methods: {
    isUpdateProfile() {
      this.dSpinn = true;
      this.excDrive = undefined;
      this.excTransmission = undefined;
      this.excBody = undefined;
      this.excMileage = undefined;
      this.excFuel = undefined;
      this.excVolume = undefined;
      this.excPower = undefined;
      this.excDescr = undefined;

      let form = this.$refs.formUpdateAd;
      let body = new FormData(form);
      body.set("access_token", this.token);
      body.set("ad_id", this.ad.ad_id);

      let flExc = false;
      let description = body.get("description");

      // проверяем поля
      if (description.length > 1600) {
        this.excDescr = "Не более 1600 символов.";
        fExc = true;
      }
      // если есть ошибки запрос не отправляем
      if (flExc == true) {
        this.dSpinn = false;
        return;
      }
      this.$api("ads")
        .update(body)
        .then(response => {
          if (response.body.status == "ok") {
            console.log(response.body.data);
            // обновляем профайл пользователя

            this.$emit("onAdUpdated");
            this.dSpinn = false;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            this.dSpinn = false;
            let exc = error.body.data;
            this.excDrive = exc["drive_id"] ? exc["drive_id"] : "";
            this.excTransmission = exc["transmission_id"]
              ? exc["transmission_id"]
              : "";
            this.excBody = exc["body_id"] ? exc["body_id"] : "";
            this.excMileage = exc["mileage"] ? exc["mileage"] : "";
            this.excFuel = exc["fuel"] ? exc["fuel"] : "";
            this.excVolume = exc["volume"] ? exc["volume"] : "";
            this.excPower = exc["power"] ? exc["power"] : "";
            this.excDescr = exc["description"] ? exc["description"] : "";
          }
        });
    },
    mascNumber(val) {
      let newQ = val.replace(/[^0-9]/gim, "");
      if (newQ[0] == 0) {
        newQ = newQ.substr(1);
      }
      if (newQ.length > 3) {
        let spl = newQ.split("");
        spl.splice(-3, 0, " ");
        newQ = spl.join("");
      }
      if (newQ.length > 6) {
        let spl = newQ.split("");
        spl.splice(-7, 0, " ");
        newQ = spl.join("");
      }
      return newQ;
    }
  }
};
</script>
