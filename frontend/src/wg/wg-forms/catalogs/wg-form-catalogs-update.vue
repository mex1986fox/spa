<template>
  <ui-window
    class="wg-form-catalogs-create ui-blind_content-top"
    :show="show"
    @onHide="isHide"
    position="fixed"
    :delayHide="0"
    header="Редактировать каталог"
  >
    <ui-window-card animate="opacity" :show="show" :delayShow="300">
      <form ref="formUpdateCatalog">
        <div class="ui-window-card__header">Основное</div>
        <div class="ui-window-card__ef">
          <div class="row">
            <div class="col_8">
              <ui-ef-text
                :value="dCatalog.title"
                name="title"
                caption="Название *"
                :help="exc['title']"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_12">
              <ui-ef-text
                :value="dCatalog.description"
                name="description"
                caption="Описание *"
                :help="exc['description']"
              />
            </div>
          </div>
        </div>
      </form>
      <div class="ui-window-card__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black"
          value="Редактировать"
          @click="isUpdateCatalog"
        >
        <input type="button" class="ui-button ui-button_float_black" value="Отмена" @click="isHide">
      </div>
    </ui-window-card>
    <ui-window-card animate="opacity" :show="show" :delayShow="0">
      <wg-form-update-photos-entity
        apiPhotoServer="catalogsphoto"
        apiEntityServer="catalogs"
        entityID="catalog_id"
        :statusForm="dCatalog.main_photo==null?'create':'update'"
        :entity="dCatalog"
        @onHide="isHide"
        @onUpdateEntity="isUpdateCatalog"
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
      dCatalog: this.catalog
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
    },
    catalog: {
      default: undefined,
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    catalog(newQ) {
      this.dCatalog = newQ;
    }
  },
  methods: {
    isUpdateCatalog(resp) {
      this.dCatalog = resp.catalog;
    },
    isHide() {
      if (this.dCatalog != undefined) {
        this.$emit("onUpdateCatalog", this.dCatalog);
      }
      this.$emit("onHide");
    },
    isUpdateCatalog() {
      this.dSpinn = true;
      this.exc = [];
      let form = this.$refs.formUpdateCatalog;
      let body = new FormData(form);
      body.set("access_token", this.token);
      body.set("catalog_id", this.dCatalog.catalog_id);
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
        .update(body)
        .then(response => {
          this.dSpinn = false;
          this.dCatalog = response.body.data.catalog;
        })
        .catch(error => {
          this.dSpinn = false;
          this.exc = error.body.data;
        });
    }
  }
};
</script>
