<template>
  <div>
    <div class="wg-form-registration__card-header">Фотографии</div>

    <div class="wg-form-registration__card-imgs">
      <form ref="formUploadPhoto">
        <ui-button-file
          class="ui-button_float_black"
          @onChange="isChangeFiles"
          :clear="clearFiles"
          @onClear="clearFiles=false"
          :disabled="bfileDisabled"
        ></ui-button-file>
      </form>
      <wg-form-update-photos-entity-img
        v-for="(val, key) in lincksPhoto"
        :key="key"
        :keyPhoto="key"
        :linck="val"
        :entity="dEntity"
        :checkMain="key==dMainPhoto?true:false"
        @onDeletePhoto="isDeletePhoto"
        @onCheckMain="isChackMain"
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
      dMainPhoto: undefined,
      changeFiles: [],
      clearFiles: false,
      dLoading: false,
      lincksPhoto: undefined,
      showMenuKey: undefined,
      imgSpinner: false,
      bfileDisabled: false,
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
      type: Object,
      default: undefined
    }
  },
  watch: {
    dMainPhoto(newQ) {
      if (newQ != undefined) {
        this.isChackMainEntity(newQ);
      }
    },
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
      this.isUploadPhotos();
    },
    isUploadPhotos() {
      this.bfileDisabled = true;
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
            this.bfileDisabled = false;
            this.isShowLincksPhoto();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            this.bfileDisabled = false;
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
            if (
              response.body.status == "ok" &&
              response.body.data.albums[0] != undefined
            ) {
              this.dMainPhoto = response.body.data.albums[0].main;
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
            this.lincksPhoto = lPhoto;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isChackMain(keyPhoto) {
      let body = new FormData();
      body.set("entity_id", this.dEntity[this.dEntityID]);
      body.set("access_token", this.token);
      body.set("name_file", keyPhoto);
      this.$api(this.dApiPhotoServer)
        .checkMain(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.dMainPhoto = keyPhoto;
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isChackMainEntity(keyPhoto) {
      let body = new FormData();
      body.set("main_photo", this.lincksPhoto[keyPhoto]);
      body.set(this.dEntityID, this.dEntity[this.dEntityID]);
      body.set("access_token", this.token);
      this.$api(this.dApiEntityServer)
        .update(body)
        .then(response => {
          if (response.body.status == "ok") {
            // обновляем профайл пользователя
            this.$emit("onUpdateEntity", response.body.data);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isHide() {
      this.$emit("onHide", this.dEntity);
    }
  },
  mounted() {
    this.isShowLincksPhoto();
  }
};
</script>

