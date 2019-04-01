<template>
  <div>
    <form ref="formUploadPhoto">
      <div class="wg-form-registration__card-header">Загрузите фотографии</div>
      <div class="wg-form-registration__card-files">
        <div class="ui-header ui-header_3" v-if="changeFiles.length>0">Выбранные фотографии:</div>
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
    <div class="wg-form-registration__card-imgs">
      <div class="wg-form-registration__card-img">
        <img src="http://www.fotoprizer.ru/img/111116-112740-ft.jpg">
        <div class="wg-form-registration__card-img-delete">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="wg-form-registration__card-img">
        <img src="http://v-mishakov.ru/Teorija/Ritm/1.jpg">
        <div class="wg-form-registration__card-img-delete">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div class="wg-form-registration__card-img">
        <img
          src="https://photogenica.ru/html/img-LP/fotografii-znamenitostey/fotografii-znamenitostej-dla-izdatelstv.jpg"
        >
        <div class="wg-form-registration__card-img-delete">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
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
      dLoading: false
    };
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken"
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

