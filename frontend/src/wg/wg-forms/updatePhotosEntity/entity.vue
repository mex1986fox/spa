<template>
  <div>
    <form ref="formUploadPhoto">
      <div class="wg-form-registration__card-header">Выберите и загрузите фотографии</div>
      <div class="wg-form-registration__card-files-header"
           v-if="changeFiles.length>0">
        <div class="ui-header ui-header_3">Выбранные фотографии:</div>
      </div>
      <div class="wg-form-registration__card-files">
        <div class="wg-form-registration__card-file"
             v-for="(file, key) in changeFiles"
             :key="key">
          <i class="far fa-file-image wg-form-registration__card-file-icon"></i>
          {{file.name}}
        </div>
      </div>

      <div class="wg-form-registration__card-buttons">
        <input type="button"
               v-if="changeFiles.length!=0"
               class="ui-button ui-button_float_black"
               @click="isUploadPhotos"
               :disabled="dLoading"
               value="Загрузить">
        <input type="button"
               v-if="changeFiles.length!=0"
               @click="clearFiles=true"
               class="ui-button ui-button_float_black"
               :disabled="dLoading"
               value="Очистить">
        <ui-spinner v-if="dLoading==true"
                    class="ui-spinner_s1" />
        <ui-button-file v-show="changeFiles.length==0"
                        class="ui-button_circle_s3 ui-button_float_black"
                        @onChange="isChangeFiles"
                        :clear="clearFiles"
                        @onClear="clearFiles=false"></ui-button-file>
      </div>
    </form>
    <div class="wg-form-registration__card-files-header"
         v-if="lincksPhoto!=undefined">
      <div class="ui-header ui-header_3">Выберите из фотографий главное фото:</div>
    </div>
    <div class="wg-form-registration__card-imgs"
         v-if="lincksPhoto!=undefined">
      <wg-form-update-photos-entity-img v-for="(val, key) in lincksPhoto"
                                        :key="key"
                                        :keyPhoto="key"
                                        :linck="val"
                                        :entity="dEntity"
                                        :checkMain="dEntity.main_photo==dHost+'/'+val?true:false"
                                        @onDeletePhoto="isDeletePhoto"
                                        @onUpdateAd="isUpdateAd" />
    </div>
    <div class="wg-form-registration__card-buttons">
      <input type="button"
             v-if="lincksPhoto!=undefined"
             class="ui-button ui-button_float_black"
             @click="isHide"
             value="Готово">
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgFormUpdatePhotosEntityImg from "./entity-img.vue";
export default {
  components: {
    WgFormUpdatePhotosEntityImg
  },
  data() {
    return {
      dApiPhotoServer: this.apiPhotoServer, //имя апи для работы с сервером фотографий
      dApiEntityServer: this.apiEntityServer, //имя апи для работы с сервером сущности
      dEntityID: this.entityID,
      dEntity: this.entity,
      changeFiles: [],
      clearFiles: false,
      dLoading: false,
      lincksPhoto: undefined,
      showMenuKey: undefined,
      imgSpinner: false
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
    apiPhotoServer: {
      type: String,
      default: undefined
    },
    apiEntityServer: {
      type: String,
      default: undefined
    },
    entityID: {
      type: String,
      default: undefined
    },
    entity: {
      type: Number,
      default: undefined
    }
  },
  watch: {
    apiPhotoServer(newQ) {
      this.dApiPhotoServer = newQ;
    },
    apiEntityServer(newQ) {
      this.dApiEntityServer = newQ;
    },
    entityID(newQ) {
      this.dEntityID = newQ;
    },
    entity(newQ) {
      this.dEntity = newQ;
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
      body.set("entity_id", this.dEntity[this.dEntityID]);
      this.dLoading = true;
      this.$api(this.dApiPhotoServer)
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
      let body = new FormData();
      body.set("users_id[]", this.tokenPayload.userID);
      body.set("entities_id[]", this.dEntity[this.dEntityID]);
      this.$api(this.dApiPhotoServer)
        .show(body)
        .then(
          response => {
            if (response.body.status == "ok") {
              this.lincksPhoto = response.body.data.albums[0].mini;
            }
          },
          error => {
            if (error.body.status == "except") {
              console.dir(error);
            }
          }
        );
    },
    isDeletePhoto(keyPhoto) {
      let body = new FormData();
      body.set("entity_id", this.dEntity[this.dEntityID]);
      body.set("access_token", this.token);
      body.set("name_files[]", keyPhoto);
      this.$api(this.dApiPhotoServer)
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            delete this.lincksPhoto[keyPhoto];
            let lPhoto = this.lincksPhoto;
            this.lincksPhoto = undefined;
            setTimeout(() => {
              this.lincksPhoto = lPhoto;
            }, 100);
          }
          this.showSpinner = false;
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
            this.showSpinner = false;
          }
        });
    },
    isChackMain(ad) {
      let body = new FormData();
      body.set("users_id[]", this.tokenPayload.userID);
      body.set("entities_id[]", this.dEntity[this.dEntityID]);
      body.set("access_token", this.dEntity[this.dEntityID]);
      this.$api(this.dApiPhotoServer)
        .checkMain(body)
        .then(response => {
          if (response.body.status == "ok") {
            delete this.lincksPhoto[keyPhoto];
            let lPhoto = this.lincksPhoto;
            this.lincksPhoto = undefined;
            setTimeout(() => {
              this.lincksPhoto = lPhoto;
            }, 100);
          }
          this.showSpinner = false;
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
            this.showSpinner = false;
          }
        });
    },
    isHide() {
      this.$emit("onHide", this.dEntity);
    }
  }
};
</script>

