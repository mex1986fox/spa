<template>
  <ui-table-tr>
    <ui-table-td
      class="wg-table__td_left col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
      colspan="2"
    >
      <div class="wg-table__td_date">{{dProduct.date_create|filter_date}}</div>
      <div>{{dProduct.subject+" "+dProduct.city}}</div>
      <div>{{dProduct.title}}</div>
    </ui-table-td>
    <ui-table-td class="wg-table__td_date wg-table__td_left col-phone_clean">
      <div class="wg-table__td_date">{{dProduct.date_create|filter_date}}</div>
    </ui-table-td>
    <ui-table-td class="wg-table-mypost__td_img col-phone_clean">
      <ui-img
        class="wg-table-mypost__img"
        :src="dProduct.main_photo"
        :alt="'/public/img/drovito.png'"
        :nofon="dProduct.main_photo!=null?false:true"
      />
    </ui-table-td>
    <ui-table-td
      class="col-phone_clean"
    >{{dProduct.type|filter_for_transport( dProduct.brand, dProduct.model)}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dProduct.title}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dProduct.price|filter_price}}</ui-table-td>
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
          @click="isShowMyProduct(dProduct.product_id)"
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
          @click="isShowMyProduct(dProduct.product_id)"
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
      <!-- <wg-form-update-product :show="showUpdateProduct"
                              @onHide="isHideUpdateProduct"
                              @onUpdateProduct="isUpdateProduct"
                              :product="dProduct" />
      <wg-form-update-product :show="showUpdateProduct"
                              @onHide="showUpdateProduct=false"
      :product="dProduct" />-->

      <ui-menu :show="showMenu" @onHide="isHideMenu">
        <ul class="ui-menu__ul">
          <li class="ui-menu__li" @click="isShowUpdateProduct">Редактировать</li>
          <li class="ui-menu__li" @click="isDeleteProductAlbumAndProduct">Удалить</li>
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
      showUpdateProduct: false,
      dProduct: this.product
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  props: {
    product: {
      default: undefined
    }
  },
  watch: {
    product(newQ) {
      this.dProduct = newQ;
    }
  },
  methods: {
    isShowMyProduct(productId) {
      this.$router.push({ path: `/my_product/${productId}` });
    },
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
      this.$emit("onClickExcess");
    },
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdateProduct() {
      this.showMenu = false;
      this.showUpdateProduct = true;
    },
    isHideUpdateProduct() {
      this.showUpdateProduct = false;
    },
    isUpdateProduct(product) {
      this.dProduct = product;
      this.$emit("onUpdateProduct", product);
    },
    isDeleteProductAlbumAndProduct() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dProduct.product_id);
      //отправляем запрос
      this.$api("productsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeleteProduct();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteProduct() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("product_id", this.dProduct.product_id);
      //отправляем запрос
      this.$api("products")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.$emit("onDeleteProduct", this.product);
            this.$store.commit("myproducts/deleteProduct", this.dProduct);
            this.$store.commit("products/deleteProduct", this.dProduct);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteProductAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dProduct.product_id);
      //отправляем запрос
      this.$api("productsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.isDeleteProduct();
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
