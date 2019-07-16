<template>
  <ui-blind :show="dShow" :position="'fixed'">
    <div class="wg-form-list">
      <ui-animation-display v-if="dShow" animate="opacity">
        <div class="wg-form-list__container">
          <div class="wg-form-list__card wg-form-list__card_create wg-form-registration__card">
            <form ref="formCreateCatalog">
              <div class="wg-form-registration__card-header">Укажите основные данные</div>
              <div class="wg-form-create-post__card-ef">
                <div class="row">
                  <div class="col_8">
                    <ui-ef-text class="ui-ef-text" name="title" caption="Название каталога *"></ui-ef-text>
                  </div>
                </div>
                <div class="row">
                  <div class="col_12">
                    <ui-ef-textarea
                      class="ui-ef-textarea"
                      name="description"
                      caption="Описание каталога *"
                      :autoresize="200"
                    ></ui-ef-textarea>
                  </div>
                </div>
              </div>
            </form>
            <div class="wg-form-registration__card-buttons">
              <input
                type="button"
                class="ui-button ui-button_float_black"
                @click="isCreateAd"
                value="Создать"
              >
              <input
                type="button"
                class="ui-button ui-button_float_black"
                @click="isCreateAd"
                value="отмена"
              >
            </div>
          </div>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dShow: this.show,
      dShop: this.shop,
      dCatalogs: this.catalogs,
      dSpinn: false,
      exc: [],
      masSnackbar: undefined,
      dShow: false
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    },
    isCreateCatalog() {
      this.dSpinn = true;
      this.exc = [];
      let body = new FormData(this.$refs.formCreateCatalog);
      body.set("access_token", this.token);
      body.set("shop_id", this.dShop.shop_id);
      let title = body.get("title");
      let description = body.get("description");
      let fExc = false;
      if (title == undefined || title == "") {
        this.exc["title"] = "Заполните название.";
        fExc = true;
      }
      if (description == undefined || description == "") {
        this.exc["description"] = "Заполните описание.";
        fExc = true;
      }
      if (fExc == true) {
        this.dSpinn = false;
        return;
      }

      this.$api("catalogs")
        .create(body)
        .then(response => {
          this.dSpinn = false;
          console.dir(response);
        })
        .catch(error => {
          this.dSpinn = false;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.exc["title"] = exc["title"] ? exc["title"] : "";
          this.exc["description"] = exc["description"]
            ? exc["description"]
            : "";
        });
    }
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    shop: {
      default: undefined,
      type: Object
    },
    catalogs: {
      default: undefined,
      type: Array
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
    },
    shop(newQ) {
      this.dShop = newQ;
    },
    catalogs(newQ) {
      this.dCatalogs = newQ;
    }
  }
};
</script>
