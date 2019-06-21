<template>
  <div>
    <form ref="formUploadPhoto">
      <div class="wg-form-registration__card-header">Фотографии</div>
      <div class="wg-form-registration__card-files-header" v-if="changeFiles.length>0">
        <div class="ui-header ui-header_3">Выбранные фотографии:</div>
      </div>
      <div class="wg-form-registration__card-files">
        <div class="wg-form-registration__card-file" v-for="(file, key) in changeFiles" :key="key">
          <i class="far fa-file-image wg-form-registration__card-file-icon"></i>
          {{file.name}}
        </div>
      </div>

      <div class="wg-form-registration__card-buttons">
        <input
          type="button"
          v-if="changeFiles.length!=0"
          class="ui-button ui-button_float_black"
          @click="isUploadPhotos"
          :disabled="dLoading"
          value="Загрузить"
        >
        <input
          type="button"
          v-if="changeFiles.length!=0"
          @click="clearFiles=true"
          class="ui-button ui-button_float_black"
          :disabled="dLoading"
          value="Очистить"
        >
        <ui-spinner v-if="dLoading==true" class="ui-spinner_s1"/>
        <ui-button-file
          v-show="changeFiles.length==0"
          class="ui-button_circle_s3 ui-button_float_black"
          @onChange="isChangeFiles"
          :clear="clearFiles"
          @onClear="clearFiles=false"
        ></ui-button-file>
      </div>
    </form>
    <div class="wg-form-registration__card-files-header" v-if="lincksPhoto!=undefined">
      <div class="ui-header ui-header_3">Выберите из фотографий главное фото:</div>
    </div>
    <div class="wg-form-registration__card-imgs" v-if="lincksPhoto!=undefined">
      <wg-form-registration-card-photo-img
        v-for="(val, key) in lincksPhoto"
        :key="key"
        :keyPhoto="key"
        :linck="val"
        :ad="dAd"
        :checkMain="dAd.main_photo==adPhotoHost+'/'+val?true:false"
        @onDeletePhoto="isDeletePhoto"
        @onUpdateAd="isUpdateAd"
      />
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        v-if="lincksPhoto!=undefined"
        class="ui-button ui-button_float_black"
        @click="isHide"
        value="Готово"
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgFormRegistrationCardPhotoImg from "./card-photo-img.vue";
export default {
  components: {
    WgFormRegistrationCardPhotoImg
  },
  data() {
    return {
      dAd: this.ad,
      changeFiles: [],
      clearFiles: false,
      dLoading: false,
      lincksPhoto: undefined,
      userPhotoHost: this.$hosts.userPhoto,
      showMenuKey: undefined,
      imgSpinner: false,
      adPhotoHost: this.$hosts.adsPhoto
    };
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken",
      tokenPayload: "tokens/getAccessTokenPayload"
    })
  },
  props: {
    ad: {
      default: undefined
    }
  },
  methods: {
    isChangeFiles(files) {
      this.changeFiles = files;
    },
    isUploadPhotos() {
      let form = this.$refs.formUploadPhoto;
      let body = new FormData(form);
      body.set("access_token", this.token);
      body.set("ad_id", this.ad.ad_id);
      this.dLoading = true;
      this.$api("adsphoto")
        .upload(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.changeFiles = [];
            this.dLoading = false;
            this.isShowLincksPhoto();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isShowLincksPhoto() {
      let body = {
        users_id: [this.tokenPayload.userID],
        ads_id: [this.ad.ad_id]
      };
      this.$api("adsphoto")
        .show(body)
        .then(response => {
          if (
            response.body.status == "ok" &&
            response.body.data[0] != undefined
          ) {
            this.lincksPhoto = response.body.data[0].files.mini;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePhoto(keyPhoto) {
      delete this.lincksPhoto[keyPhoto];
      let lPhoto = this.lincksPhoto;
      this.lincksPhoto = undefined;
      setTimeout(() => {
        this.lincksPhoto = lPhoto;
      }, 100);
    },
    isUpdateAd(ad) {
      this.dAd = ad;
      let lPhoto = this.lincksPhoto;
      this.lincksPhoto = undefined;
      this.$emit("onUpdateAd", ad);
      setTimeout(() => {
        this.lincksPhoto = lPhoto;
      }, 100);
    },
    isHide() {
      this.$emit("onHide");
    }
  },
  mounted() {
    this.isShowLincksPhoto();
  }
};
</script>

