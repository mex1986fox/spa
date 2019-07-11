<template>
  <ui-table-tr>
    <ui-table-td
      class="wg-table__td_left col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
      colspan="2"
    >
      <div class="wg-table__td_date">{{dShop.date_create|filter_date}}</div>
      <div>{{dShop.subject+" "+dShop.city}}</div>
      <div>{{dShop.title}}</div>
    </ui-table-td>
    <ui-table-td class="wg-table__td_date wg-table__td_left col-phone_clean">
      <div class="wg-table__td_date">{{dShop.date_create|filter_date}}</div>
    </ui-table-td>
    <ui-table-td class="wg-table-mypost__td_img col-phone_clean">
      <ui-img
        class="wg-table-mypost__img"
        :src="dShop.main_photo"
        :alt="'/public/img/drovito.png'"
        :nofon="dShop.main_photo!=null?false:true"
      />
    </ui-table-td>
    <ui-table-td class="col-phone_clean">{{dShop.subject+" "+dShop.city}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dShop.title}}</ui-table-td>
    <ui-table-td>
      <div class="wg-table__buttons">
        <div
          @click="isShowExcess"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 col-phone_clean"
        >
          <i v-if="showExcess==false" class="fas fa-angle-down"></i>
          <i v-if="showExcess==true" class="fas fa-angle-up"></i>
        </div>
        <div
          @click="isShowUpdateProduct"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 col-phone_clean"
        >
          <i class="far fa-edit"></i>
        </div>

        <div
          @click="showMenu=true"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
        >
          <i class="fas fa-ellipsis-v"></i>
        </div>
        <div
          @click="isShowUpdateProduct"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
        >
          <i class="far fa-edit"></i>
        </div>
        <div
          @click="isShowExcess"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
        >
          <i v-if="showExcess==false" class="fas fa-angle-down"></i>
          <i v-if="showExcess==true" class="fas fa-angle-up"></i>
        </div>
      </div>
      <wg-form-update-shop
        :show="showUpdateShop"
        @onHide="isHideUpdateShop"
        @onUpdateShop="isUpdateShop"
        :shop="dShop"
      />
      <wg-form-update-product
        :show="showUpdateProduct"
        @onHide="showUpdateProduct=false"
        :shop="dShop"
      />

      <ui-menu :show="showMenu" @onHide="isHideMenu">
        <ul class="ui-menu__ul">
          <li class="ui-menu__li" @click="isShowUpdateShop">Редактировать</li>
          <li class="ui-menu__li" @click="isDeleteShopAlbumAndShop">Удалить</li>
        </ul>
      </ui-menu>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-myposts",
  data() {
    return {
      showExcess: false,
      showMenu: false,
      showUpdateShop: false,
      showUpdateProduct: false,
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
      default: undefined
    }
  },
  watch: {
    shop(newQ) {
      this.dShop = newQ;
    }
  },
  methods: {
    isShowUpdateProduct() {
      this.showUpdateProduct = true;
    },
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
      this.$emit("onClickExcess");
    },
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdateShop() {
      this.showMenu = false;
      this.showUpdateShop = true;
    },
    isHideUpdateShop() {
      this.showUpdateShop = false;
    },
    isUpdateShop(shop) {
      this.dShop = shop;
      this.$emit("onUpdateShop", shop);
    },
    isDeleteShopAlbumAndShop() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dShop.shop_id);
      //отправляем запрос
      this.$api("shopsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeleteShop();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteShop() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("shop_id", this.dShop.shop_id);
      //отправляем запрос
      this.$api("shops")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.$emit("onDeleteShop", this.shop);
            this.$store.commit("myshops/deleteShop", this.dShop);
            this.$store.commit("shops/deleteShop", this.dShop);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteShopAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dShop.shop_id);
      //отправляем запрос
      this.$api("shopsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.isDeleteShop();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>
