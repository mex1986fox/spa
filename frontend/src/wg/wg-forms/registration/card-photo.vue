<template>
  <div>
    <form ref="formUploadPhoto">
      <div class="wg-form-registration__card-header">Выберите и загрузите фотографии</div>
      <div class="wg-form-registration__card-files-header">
        <div class="ui-header ui-header_3" v-if="changeFiles.length>0">Выбранные фотографии:</div>
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
    <div class="wg-form-registration__card-imgs" v-if="lincksPhoto!=undefined">
      <div class="wg-form-registration__card-img" v-for="(linck, key) in lincksPhoto" :key="key">
        <img :src="userPhotoHost+'/'+linck">
        <div class="wg-form-registration__card-img-buttons">
          <div
            class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder"
            @click="isDeletePhoto(key)"
            title="Удалить"
          >
            <i class="far fa-trash-alt"></i>
          </div>
          <div
            class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder"
            title="Меню"
          >
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      changeFiles: [],
      clearFiles: false,
      dLoading: false,
      lincksPhoto: undefined,
      userPhotoHost: this.$hosts.userPhoto
    };
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken",
      tokenPayload: "tokens/getAccessTokenPayload"
    })
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
      this.$http
        .post(this.$hosts.services + "/api/userphoto/upload", body)
        .then(
          response => {
            if (response.body.status == "ok") {
              this.changeFiles = [];
              this.dLoading = false;
              this.isShowLincksPhoto();
            }
          },
          error => {
            if (error.body.status == "except") {
              console.dir(error);
            }
          }
        );
    },
    isShowLincksPhoto() {
      let body = { users_id: [this.tokenPayload.userID] };
      this.$http.post(this.$hosts.services + "/api/userphoto/show", body).then(
        response => {
          if (response.body.status == "ok") {
            console.dir(response.body.data[0]);
            this.lincksPhoto = response.body.data[0].files.mini;
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    },
    isDeletePhoto(key) {
      let body = {
        name_files: [key],
        access_token: this.token
      };
      this.$http
        .post(this.$hosts.services + "/api/userphoto/delete", body)
        .then(
          response => {
            if (response.body.status == "ok") {
              delete this.lincksPhoto[key];
              let lPhoto = this.lincksPhoto;
              this.lincksPhoto = undefined;
              setTimeout(() => {
                this.lincksPhoto = lPhoto;
              }, 100);
            }
          },
          error => {
            if (error.body.status == "except") {
              console.dir(error);
            }
          }
        );
    }
  }
};
</script>

