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
      <div class="wg-card-post__info-date">{{dAd.date_create}}</div>
      <div class="wg-card-post__info-text">{{dAd.city +" ("+dAd.subject+")"}}</div>
      <div class="wg-card-post__info-text">{{dAd.brand +" "+dAd.model}}</div>
    </div>
    <div class="wg-card-post__photo" @click="isLoadImgLincks">
      <ui-img
        class="wg-card-post__img"
        :src="dAd.main_photo"
        :alt="'https://humor.fm/uploads/posts/2015-08/15/7_prodolzhenie-vy-najdete-na-nashem-sajte-yaustalcom-42.png'"
      />
    </div>
    <wg-slider-zoom :slides="slides" :show="showSlides" @onHide="showSlides=false"></wg-slider-zoom>
    <span
      class="wg-card-post__title"
    >{{dAd.brand+" "+dAd.model+" "+dAd.year+" г.в. "+String(dAd.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" руб."}}</span>
    <span ref="descr" class="wg-card-post__description wg-card-post__description_ellips">
      <div class="wg-card-ad__params">
        <span v-if="dAd.document_id!=null" class="wg-card-ad__param">
          {{"Документы: "}}
          <span
            class="wg-card-ad__param-info"
          >{{dAd.document_id==1?"с документавми":"без документов"}}</span>
        </span>
        <span v-if="dAd.state_id!=null" class="wg-card-ad__param">
          {{"Состояние: "}}
          <span
            class="wg-card-ad__param-info"
          >{{dAd.state_id==1?"не требует вложений (ОТС)":dAd.state_id==2?"требует незначительных вложений (ХТС)":"требует значительных вложений"}}</span>
        </span>
        <span v-if="dAd.exchange_id!=null" class="wg-card-ad__param">
          {{"Обмен: "}}
          <span
            class="wg-card-ad__param-info"
          >{{dAd.exchange_id==1?"готов к обмену":"не готов к обмену"}}</span>
        </span>
        <span v-if="dAd.mileage!=null" class="wg-card-ad__param">
          {{"Пробег: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(dAd.mileage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" км."}}</span>
        </span>
        <span v-if="dAd.transmission!=null" class="wg-card-ad__param">
          {{"Коробка передач: "}}
          <span class="wg-card-ad__param-info">{{dAd.transmission}}</span>
        </span>
        <span v-if="dAd.wheel_id!=null" class="wg-card-ad__param">
          {{"Руль: "}}
          <span class="wg-card-ad__param-info">{{dAd.wheel_id==1?"левый":"правый"}}</span>
        </span>
        <span v-if="dAd.fuel!=null" class="wg-card-ad__param">
          {{"Топливо: "}}
          <span class="wg-card-ad__param-info">{{dAd.fuel}}</span>
        </span>
        <span v-if="dAd.power!=null" class="wg-card-ad__param">
          {{"Мощность: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(dAd.power).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" л.с."}}</span>
        </span>
        <span v-if="dAd.volume!=null" class="wg-card-ad__param">
          {{"Объем: "}}
          <span
            class="wg-card-ad__param-info"
          >{{String(dAd.volume).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+" л."}}</span>
        </span>
        <span v-if="dAd.drive!=null" class="wg-card-ad__param">
          {{"Привод: "}}
          <span class="wg-card-ad__param-info">{{dAd.drive}}</span>
        </span>

        <span v-if="dAd.body!=null" class="wg-card-ad__param">
          {{"Кузов: "}}
          <span class="wg-card-ad__param-info">{{dAd.body}}</span>
        </span>
      </div>
      {{dAd.description!=null?dAd.description:''}}
    </span>
    <div class="wg-card-post__button-menu-bot">
      <wg-likes-ad
        :likes="dAd.likes"
        :dislikes="dAd.dislikes"
        :userID="dAd.user_id"
        :adID="dAd.ad_id"
      />
      <div
        class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 wg-card-post__button-showdesc"
        @click="isShowDescription"
      >
        <i v-if="showDescription==false" class="fas fa-angle-down"></i>
        <i v-if="showDescription==true" class="fas fa-angle-up"></i>
      </div>
    </div>
    <wg-form-update-ad
      :show="showUpdateAd"
      @onHide="isHideUpdateAd"
      @onUpdateAd="isUpdateAd"
      :ad="ad"
    />
    <ui-menu :show="showMenu" @onHide="isHideMenu">
      <ul class="ui-menu__ul">
        <li
          class="ui-menu__li"
          v-if="profileUserID==dAd.user_id"
          @click="isShowUpdateAd"
        >Редактировать</li>
        <li
          class="ui-menu__li"
          v-if="profileUserID==dAd.user_id"
          @click="isDeleteAlbumAndAd"
        >Удалить</li>
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
      showUpdateAd: false,
      dAd: this.ad
    };
  },
  props: {
    ad: {
      type: Object,
      default: {}
    }
  },
  watch: {
    ad(newQ) {
      this.dAd = newQ;
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
    isShowUpdateAd() {
      this.showMenu = false;
      this.showUpdateAd = true;
    },
    isHideUpdateAd() {
      this.showUpdateAd = false;
    },
    isUpdateAd(ad) {
      this.dAd = ad;
      this.$emit("onUpdateAd");
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
        body.set("users_id[]", this.dAd.user_id);
        body.set("ads_id[]", this.dAd.ad_id);
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
    isDeleteAlbumAndAd() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adsphoto")
        .deleteAlbum(body)
        .then(response => {
          this.isDeleteAd();
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeleteAd() {
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
            this.$emit("onDeleteAd", this.dAd);
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
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adsphoto")
        .deleteAlbum(body)
        .then(response => {
          this.$emit("onDeleteAlbum", dAd);
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
