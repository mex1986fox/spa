<template>
  <form ref="formCreatePost">
    <div class="wg-form-registration__card-header">Укажите основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_7">
          <wg-select-location caption="Город размещения *"
                              name="city_id"
                              :help="excCity" />

          <wg-select-transport caption="Модель автомобиля *"
                               name="model_id"
                               :help="excModel" />
        </div>
      </div>
      <div class="row">
        <div class="col_8">
          <ui-ef-text name="title"
                      caption="Заголовок *"
                      :help="excTitle"></ui-ef-text>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <ui-ef-textarea name="description"
                          caption="Описание *"
                          :help="excDescr"
                          :autoresize="200"></ui-ef-textarea>
        </div>
      </div>
    </div>
    <div class="wg-form-registration__card-buttons">
      <input type="button"
             class="ui-button ui-button_float_black"
             @click="isCreatePost"
             :disabled="dSpinn"
             value="Создать">
      <ui-spinner v-if="dSpinn==true"
                  class="ui-spinner_s1" />
    </div>
    <ui-snackbar :show="showSnackbar"
                 model="err"
                 :time="5000"
                 @onHide="showSnackbar=false">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input type="button"
               class="ui-button ui-button_float_black ui-button_s1"
               @click="showSnackbar=false"
               value="Закрыть">
      </div>
    </ui-snackbar>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excTitle: "",
      excDescr: "",
      excModel: "",
      excCity: "",
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
    isCreatePost() {
      this.dSpinn = true;
      this.excTitle = "";
      this.excDescr = "";
      this.excCity = "";
      this.excModel = "";
      let form = this.$refs.formCreatePost;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let title = body.get("title");
      let description = body.get("description");
      let city_id = body.get("city_id");
      let model_id = body.get("model_id");

      let fExc = false;
      if (title == undefined || title == "") {
        this.excTitle = "Заполните заголовок.";
        fExc = true;
      }
      if (description == undefined || description == "") {
        this.excDescr = "Заполните описание.";
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
      if (title.length > 70) {
        this.excTitle = "Не более 70 символов.";
        fExc = true;
      }
      if (description.length > 1600) {
        this.excDescr = "Не более 1600 символов.";
        fExc = true;
      }
      if (fExc == true) {
        this.dSpinn = false;
        return;
      }

      this.$api("post")
        .create(body)
        .then(response => {
          this.dSpinn = false;
          this.$emit("onCreatedPost", response.body.data);
        })
        .catch(error => {
          this.dSpinn = false;
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.excTitle = exc["title"] ? exc["title"] : "";
          this.excDescr = exc["description"] ? exc["description"] : "";
          this.excCity = exc["city_id"] ? exc["city_id"] : "";
          this.excModel = exc["model_id"] ? exc["model_id"] : "";
        });
    }
  }
};
</script>

