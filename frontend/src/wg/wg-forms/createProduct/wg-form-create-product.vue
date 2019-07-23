<template>
  <ui-window
    class="wg-form-catalogs-create ui-blind_content-top"
    :show="show"
    @onHide="isHide"
    position="fixed"
    :delayHide="0"
    header="Создать продукт"
  >
    <ui-window-card animate="opacity" :show="show && dProduct==undefined" :delayShow="0">
      <form ref="formCreateProduct">
        <div class="ui-window-card__header">Основное</div>
        <div class="ui-window-card__ef">
          <div class="row">
            <div class="col_8">
              <ui-ef-text name="title" caption="Название *" :help="exc['title']"/>
            </div>
          </div>
          <div class="row">
            <div class="col_12">
              <ui-ef-text name="description" caption="Описание *" :help="exc['description']"/>
            </div>
          </div>
          <div class="row">
            <div class="col_4">
              <ui-ef-text
                :help="exc['price']"
                name="price"
                caption="Цена руб. *"
                masc="mascPrice"
                :maxlength="11"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_8">
              <wg-multi-transport
                caption="Модель автомобиля *"
                name="model_id"
                :help="exc['model_id']"
              />
            </div>
          </div>
        </div>
      </form>
      <div class="ui-window-card__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black"
          value="Создать"
          @click="isCreateProduct"
        >
        <input type="button" class="ui-button ui-button_float_black" value="Отмена" @click="isHide">
      </div>
    </ui-window-card>
    <ui-window-card animate="opacity" :show="show && dProduct!=undefined" :delayShow="300">
      <wg-form-update-photos-entity
        apiPhotoServer="catalogsphoto"
        apiEntityServer="catalogs"
        entityID="catalog_id"
        statusForm="create"
        :entity="dProduct"
        @onHide="isHide"
        @onUpdateEntity="isUpdateProduct"
      />
    </ui-window-card>
  </ui-window>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      exc: [],
      dProduct: undefined
    };
  },

  props: {
    show: {
      default: false,
      type: Boolean
    },
    shop: {
      default: undefined,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isUpdateProduct(resp) {
      this.dProduct = resp.catalog;
    },
    isHide() {
      if (this.dProduct != undefined) {
        this.$emit("onCreatedProduct", this.dProduct);
      }
      this.$emit("onHide");
    },
    isCreateProduct() {
      this.dSpinn = true;
      this.exc = [];
      let form = this.$refs.formCreateProduct;
      let body = new FormData(form);
      body.set("access_token", this.token);
      body.set("shop_id", this.shop.shop_id);
      let title = body.get("title");
      let description = body.get("description");

      if (title == undefined || title == "") {
        this.exc["title"] = "Заполните заголовок.";
      }
      if (description == undefined || description == "") {
        this.exc["description"] = "Заполните описание.";
      }
      if (this.exc.length > 0) {
        this.dSpinn = false;
        return;
      }
      if (title.length > 70) {
        this.exc["title"] = "Не более 70 символов.";
        fExc = true;
      }
      if (description.length > 1600) {
        this.exc["description"] = "Не более 1600 символов.";
        fExc = true;
      }
      if (this.exc.length > 0) {
        this.dSpinn = false;
        return;
      }

      this.$api("catalogs")
        .create(body)
        .then(response => {
          this.dSpinn = false;
          this.dProduct = response.body.data.catalog;
        })
        .catch(error => {
          this.dSpinn = false;
          this.exc = error.body.data;
        });
    }
  }
};
</script>
