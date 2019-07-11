<template>
  <ui-table-tr>
    <ui-table-td
      class="wg-table__td_left col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
      colspan="3"
    >
      <div class="wg-table__td_date">{{dAd.date_create|filter_date}}</div>
      <div>{{dAd.subject+" "+dAd.city}}</div>
      <div>{{dAd.brand+" "+dAd.model}}</div>
      <div>{{dAd.year+" г.в."}}</div>
      <div>{{dAd.price|filter_price}}{{" руб."}}</div>
    </ui-table-td>
    <ui-table-td
      class="wg-table__td_date wg-table__td_left col-phone_clean"
    >{{dAd.date_create|filter_date}}</ui-table-td>
    <ui-table-td class="wg-table-mypost__td_img col-phone_clean">
      <ui-img
        class="wg-table-mypost__img"
        :src="dAd.main_photo"
        :alt="'/public/img/drovito.png'"
        :nofon="dAd.main_photo!=null?false:true"
      />
    </ui-table-td>
    <ui-table-td class="col-phone_clean">{{dAd.subject+" "+dAd.city}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dAd.brand+" "+dAd.model}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dAd.year}}</ui-table-td>
    <ui-table-td class="col-phone_clean">{{dAd.price|filter_price}}</ui-table-td>
    <ui-table-td>
      <div class="wg-table__buttons">
        <div
          @click="isShowExcess"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
        >
          <i v-if="showExcess==false" class="fas fa-angle-down"></i>
          <i v-if="showExcess==true" class="fas fa-angle-up"></i>
        </div>
        <div
          @click="showMenu=true"
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
        >
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <wg-form-update-ad
        :show="showUpdatePost"
        @onHide="isHideUpdatePost"
        @onUpdatePost="isUpdatePost"
        :ad="dAd"
      />
      <ui-menu :show="showMenu" @onHide="isHideMenu">
        <ul class="ui-menu__ul">
          <li class="ui-menu__li" @click="isShowUpdatePost">Редактировать</li>
          <li class="ui-menu__li" @click="isDeletePostAlbumAndAd">Удалить</li>
        </ul>
      </ui-menu>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableExces from "../wg-table-exces.vue";
export default {
  name: "wg-table-myads",
  components: { WgTableExces },
  data() {
    return {
      showExcess: false,
      showMenu: false,
      showUpdatePost: false,
      dAd: this.ad
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  props: {
    ad: {
      default: undefined
    }
  },
  watch: {
    ad(newQ) {
      this.dAd = newQ;
    }
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
      this.$emit("onClickExcess");
    },
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdatePost() {
      this.showMenu = false;
      this.showUpdatePost = true;
    },
    isHideUpdatePost() {
      this.showUpdatePost = false;
    },
    isUpdatePost(ad) {
      this.dAd = ad;
      this.$emit("onUpdatePost", ad);
    },
    isDeletePostAlbumAndAd() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeletePost();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePost() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("ads")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.$emit("onDeletePost", this.ad);
            this.$store.commit("myads/deleteAd", this.dAd);
            this.$store.commit("ads/deleteAd", this.dAd);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePostAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("entity_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adsphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.isDeletePost();
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
