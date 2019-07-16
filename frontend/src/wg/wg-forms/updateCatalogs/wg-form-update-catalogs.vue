<template>
  <wg-form-list
    v-if="dShop!=undefined"
    :show="dShow"
    @onHide="isHide"
    :header="'Каталоги &quot;'+dShop.title+'&quot;'"
    position="fixed"
    :fon="dShop.main_photo"
  >
    <template slot="content">
      <div v-for="(catalog) in dCatalogs" :key="catalog.catalog_id" class="row">
        <div class="col_2">{{catalog.date_create|filter_date}}</div>
        <div class="col_4">
          <div class="wg-table-mypost__td_img">
            <ui-img
              class="wg-table-mypost__img"
              :src="catalog.main_photo"
              alt="/public/img/drovito.png"
            />
          </div>
        </div>
        <div class="col_4">{{catalog.title}}</div>
      </div>
    </template>
    <template slot="forms">
      <wg-form-update-catalogs-create :show="dShowCreateCatalog"/>
    </template>
    <template slot="button">
      <div class="ui-button ui-button_orange ui-button_circle_s2" @click="dShowCreateCatalog=true">
        <i class="fas fa-plus"></i>
      </div>
    </template>
  </wg-form-list>
</template>
<script>
import WgFormUpdateCatalogsCreate from "./wg-form-update-catalogs-create.vue";
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
      dShowCreateCatalog: false
    };
  },
  components: { WgFormUpdateCatalogsCreate },
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
