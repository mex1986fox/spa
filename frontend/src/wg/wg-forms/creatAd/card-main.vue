<template>
  <form ref="formCreatePost">
    <div class="wg-form-registration__card-header">Укажите основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_7">
          <wg-select-location caption="Город продажи *" name="city_id" :help="excCity"/>
        </div>
      </div>
      <div class="row">
        <div class="col_7">
          <wg-select-transport caption="Модель автомобиля *" name="model_id" :help="excModel"/>
        </div>
      </div>
      <div class="row">
        <div class="col_3">
          <ui-ef-select name="year" :menu="yearMenu" caption="Год выпуска *" :help="excYear"/>
        </div>
      </div>
      <div class="row">
        <div class="col_3">
          <ui-ef-text
            :help="excPrice"
            name="price"
            caption="Цена руб. *"
            masc="mascPrice"
            :maxlength="11"
          />
        </div>
      </div>
    </div>

    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isCreateAd"
        :disabled="dSpinn"
        value="Создать"
      >
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
    <ui-snackbar :show="showSnackbar" model="err" :time="5000" @onHide="showSnackbar=false">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input
          model="button"
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
      excModel: "",
      excCity: "",
      excYear: "",
      excPrice: "",
      showSnackbar: false,
      masSnackbar: "",
      dSpinn: false
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
          selected: false
        });
        maxDate--;
      }
      return menu;
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
    isCreateAd() {
      this.dSpinn = true;
      this.excYear = "";
      this.excPrice = "";
      this.excCity = "";
      this.excModel = "";
      let form = this.$refs.formCreatePost;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let price = body.get("price");
      let year = body.get("year");
      let city_id = body.get("city_id");
      let model_id = body.get("model_id");
      let fExc = false;
      if (price == undefined || price == "") {
        this.excPrice = "Заполните цену.";
        fExc = true;
      }
      if (year == undefined || year == "") {
        this.excYear = "Заполните год.";
        fExc = true;
      }
      if (city_id == undefined || city_id == "") {
        this.excCity = "Выберите город.";
        fExc = true;
      }
      if (model_id == undefined || model_id == "") {
        this.excModel = "Выберите модель автомобиля.";
        fExc = true;
      }
      if (fExc == true) {
        this.dSpinn = false;
        return;
      }

      this.$api("ads")
        .create(body)
        .then(response => {
          this.dSpinn = false;
          this.$emit("onCreatedAd", response.body.data);
        })
        .catch(error => {
          this.dSpinn = false;
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.excPrice = exc["price"] ? exc["price"] : "";
          this.excYear = exc["year"] ? exc["year"] : "";
          this.excCity = exc["city_id"] ? exc["city_id"] : "";
          this.excModel = exc["model_id"] ? exc["model_id"] : "";
        });
    }
  }
};
</script>

