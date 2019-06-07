<template>
  <div class="wg-card-post">
    <div class="wg-card-post__info">
      <div class="wg-card-post__button-menu">
        <div
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s2"
          @click="showMenu=true"
        >
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div class="wg-card-post__info-date">{{ad.date_create}}</div>
      <div class="wg-card-post__info-text">{{ad.city +" ("+ad.subject+")"}}</div>
      <div class="wg-card-post__info-text">{{ad.brand +" "+ad.model}}</div>
    </div>
    <div class="wg-card-post__photo" @click="isLoadImgLincks">
      <ui-img
        class="wg-card-post__img"
        :src="ad.main_photo"
        :alt="'https://humor.fm/uploads/posts/2015-08/15/7_prodolzhenie-vy-najdete-na-nashem-sajte-yaustalcom-42.png'"
      />
    </div>
    <wg-slider-zoom :slides="slides" :show="showSlides" @onHide="showSlides=false"></wg-slider-zoom>
    <span
      class="wg-card-post__title"
    >{{ad.brand+" "+ad.model+" "+ad.year+" г.в. "+String(ad.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" руб."}}</span>
    <span ref="descr" class="wg-card-post__description wg-card-post__description_ellips">
      <div class="wg-card-ad__params">
        <span v-if="ad.document_id!=null" class="wg-card-ad__param">
          {{"Документы: "}}
          <span
            class="wg-card-ad__param-info"
          >{{ad.document_id==1?"с документавми":"без документов"}}</span>
        </span>
        <span v-if="ad.state_id!=null" class="wg-card-ad__param">
          {{"Состояние: "}}
          <span
            class="wg-card-ad__param-info"
          >{{ad.state_id==1?"не требует вложений (ОТС)":ad.state_id==2?"требует незначительных вложений (ХТС)":"требует значительных вложений"}}</span>
        </span>
        <span v-if="ad.exchange_id!=null" class="wg-card-ad__param">
          {{"Обмен: "}}
          <span
            class="wg-card-ad__param-info"
          >{{ad.exchange_id==1?"готов к обмену":"не готов к обмену"}}</span>
        </span>
        <span v-if="ad.mileage!=null" class="wg-card-ad__param">
          {{"Пробег: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(ad.mileage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" км."}}</span>
        </span>
        <span v-if="ad.transmission!=null" class="wg-card-ad__param">
          {{"Коробка передач: "}}
          <span class="wg-card-ad__param-info">{{ad.transmission}}</span>
        </span>
        <span v-if="ad.wheel_id!=null" class="wg-card-ad__param">
          {{"Руль: "}}
          <span class="wg-card-ad__param-info">{{ad.wheel_id==1?"левый":"правый"}}</span>
        </span>
        <span v-if="ad.fuel!=null" class="wg-card-ad__param">
          {{"Топливо: "}}
          <span class="wg-card-ad__param-info">{{ad.fuel}}</span>
        </span>
        <span v-if="ad.power!=null" class="wg-card-ad__param">
          {{"Мощность: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(ad.power).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" л.с."}}</span>
        </span>
        <span v-if="ad.volume!=null" class="wg-card-ad__param">
          {{"Объем: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(ad.volume).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" л."}}</span>
        </span>
        <span v-if="ad.drive!=null" class="wg-card-ad__param">
          {{"Привод: "}}
          <span class="wg-card-ad__param-info">{{ad.drive}}</span>
        </span>

        <span v-if="ad.body!=null" class="wg-card-ad__param">
          {{"Кузов: "}}
          <span class="wg-card-ad__param-info">{{ad.body}}</span>
        </span>
      </div>
      {{ad.description!=null?ad.description:''}}
    </span>
    <div class="wg-card-post__button-menu-bot">
      <wg-likes-ad
        :likes="ad.likes"
        :dislikes="ad.dislikes"
        :userID="ad.user_id"
        :adID="ad.ad_id"
      />
      <div
        class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 wg-card-post__button-showdesc"
        @click="isShowDescription"
      >
        <i v-if="showDescription==false" class="fas fa-angle-down"></i>
        <i v-if="showDescription==true" class="fas fa-angle-up"></i>
      </div>
    </div>
    <!-- <wg-form-update-post :show="showUpdatePost" @onHide="isHideUpdatePost" :post="post"/> -->
    <ui-menu :show="showMenu" @onHide="isHideMenu">
      <ul class="ui-menu__ul">
        <li
          class="ui-menu__li"
          v-if="profileUserID==ad.user_id"
          @click="isShowUpdatePost"
        >Редактировать</li>
        <li class="ui-menu__li" v-if="profileUserID==ad.user_id" @click="isDeletePost">Удалить</li>
        <li class="ui-menu__li">Пожаловаться</li>
      </ul>
    </ui-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-card-ad",
  data() {
    return {
      showDescription: false,
      slides: [],
      showSlides: false,
      showMenu: false,
      showUpdatePost: false
    };
  },
  props: {
    ad: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters({
      profileUserID: "profile/getID",
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdatePost() {
      this.showMenu = false;
      this.showUpdatePost = true;
    },
    isHideUpdatePost() {
      this.showUpdatePost = false;
      this.$emit("onUpdatePost");
    },
    isShowDescription() {
      let height = this.$refs.descr.style.height;
      if (height == "auto") {
        this.showDescription = false;
        this.$refs.descr.style.height = "58px";
      } else {
        this.showDescription = true;
        this.$refs.descr.style.height = "auto";
      }
    },
    isLoadImgLincks() {
      if (this.slides.length > 0) {
        this.showSlides = true;
      } else {
        let body = new FormData();
        //добавляем фильтр в куки
        body.set("users_id[]", this.ad.user_id);
        body.set("ads_id[]", this.ad.ad_id);
        //отправляем запрос
        this.$api("adsphoto")
          .show(body)
          .then(response => {
            if (response.body.status == "ok") {
              let imgs = response.body.data[0].files.origin;
              for (let key in imgs) {
                this.slides.push({ src: this.$hosts.adsPhoto + imgs[key] });
              }
              this.showSlides = true;
            }
          })
          .catch(error => {
            if (error.body.status == "except") {
              console.dir(error);
            }
          });
      }
    },
    isDeletePost() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.ad.d_id);
      //отправляем запрос
      this.$api("ads")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeleteAlbum();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.ad.ad_id);
      //отправляем запрос
      this.$api("postphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$emit("onUpdatePost");
          }
        })
        .cacth(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>
