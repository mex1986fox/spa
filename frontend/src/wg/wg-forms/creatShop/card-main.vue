<template>
  <form ref="formCreateShop">
    <div class="wg-form-registration__card-header">Укажите основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_7">
          <wg-select-location caption="Город расположения *" name="city_id" :help="exc['city']"/>
        </div>
      </div>
      <div class="row">
        <div class="col_8">
          <ui-ef-text name="title" caption="Заголовок *" :help="exc['title']"></ui-ef-text>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <ui-ef-textarea
            name="description"
            caption="Описание *"
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
        @click="isCreateShop"
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
      exc: [],
      showSnackbar: false,
      masSnackbar: "",
      dSpinn: false
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    token(newQ) {
      if (newQ != undefined) {
        this.$emit("onLogin");
      }
    }
  },
  methods: {
    isCreateShop() {
      this.dSpinn = true;
      this.exc = [];
      let form = this.$refs.formCreateShop;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let title = body.get("title");
      let description = body.get("description");
      let city_id = body.get("city_id");
      let fExc = false;
      if (title == undefined || title == "") {
        this.exc["title"] = "Заполните название.";
        fExc = true;
      }
      if (description == undefined || description == "") {
        this.exc["description"] = "Заполните описание.";
        fExc = true;
      }
      if (city_id == undefined || city_id == "") {
        this.exc["city"] = "Выберите город.";
        fExc = true;
      }
      if (fExc == true) {
        this.dSpinn = false;
        return;
      }

      this.$api("shops")
        .create(body)
        .then(response => {
          this.dSpinn = false;
          this.$emit("onCreatedShop", response.body.data);
        })
        .catch(error => {
          this.dSpinn = false;
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.exc["title"] = exc["title"] ? exc["title"] : "";
          this.exc["description"] = exc["description"]
            ? exc["description"]
            : "";
          this.exc["city"] = exc["city_id"] ? exc["city_id"] : "";
        });
    }
  }
};
</script>

