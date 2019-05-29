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
      <div class="ui-header ui-header_3">Загруженные фотографии:</div>
    </div>
    <div class="wg-form-registration__card-imgs" v-if="lincksPhoto!=undefined">
      <wg-form-registration-card-photo-img
        v-for="(val, key) in lincksPhoto"
        :key="key"
        :keyPhoto="key"
        :linck="val"
        @onDeletePhoto="isDeletePhoto"
        :checkMain="profileAvater==userPhotoHost+'/'+val?true:false"
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
      changeFiles: [],
      clearFiles: false,
      dLoading: false,
      lincksPhoto: undefined,
      userPhotoHost: this.$hosts.userPhoto,
      showMenuKey: undefined,
      imgSpinner: false
    };
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken",
      tokenPayload: "tokens/getAccessTokenPayload",
      profileAvater: "profile/getAvatar"
    })
  },
  props: {
    nameService: {
      type: String,
      default: "userphoto"
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
      this.dLoading = true;
      this.$api("userphoto")
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
      let body = { users_id: [this.tokenPayload.userID] };
      this.$api("userphoto")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
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
    isHide() {
      this.$emit("onHide");
    }
  },
  mounted() {
    this.isShowLincksPhoto();
  }
};
</script>

