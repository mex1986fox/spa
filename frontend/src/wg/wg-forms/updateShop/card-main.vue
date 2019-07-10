<template>
  <form ref="formCreateShop">
    <div class="wg-form-registration__card-header">Основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <div class="row">
        <div class="col_7">
          <ui-ef-text name="title" caption="Заголовок *" :value="dShop.title" :help="excTitle"></ui-ef-text>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <ui-ef-textarea
            name="description"
            caption="Описание *"
            :value="dShop.description"
            :help="excDescr"
            :autoresize="200"
          ></ui-ef-textarea>
        </div>
      </div>
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isUpdateShop"
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
      excTitle: "",
      excDescr: "",
      excModel: "",
      showSnackbar: false,
      masSnackbar: "",
      dSpinn: false,
      dShop: this.shop
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  props: {
    shop: {
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
    isUpdateShop() {
      this.dSpinn = true;
      this.excTitle = "";
      this.excDescr = "";
      let form = this.$refs.formCreateShop;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let title = body.get("title");
      let description = body.get("description");
      let city_id = body.get("city_id");
      body.set("shop_id", this.shop.shop_id);
      let fExc = false;
      if (title == undefined || title == "") {
        this.excTitle = "Заполните заголовок.";
        fExc = true;
      }
      if (description == undefined || description == "") {
        this.excDescr = "Заполните описание.";
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

      this.$api("shops")
        .update(body)
        .then(response => {
          this.dSpinn = false;
          this.dShop = response.body.data.shop;
          this.$emit("onUpdateShop", response.body.data.shop);
        })
        .catch(error => {
          this.dSpinn = false;
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.excTitle = exc["title"] ? exc["title"] : "";
          this.excDescr = exc["description"] ? exc["description"] : "";
        });
    }
  }
};
</script>

