<template>
  <div class="wg-form-registration__card-img">
    <ui-img :src="userPhotoHost+'/'+linck"/>
    <div class="wg-form-registration__card-img-buttons">
      <div
        v-if="checkMain==true"
        class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder"
        title="Главная фотография"
      >
        <i class="fas fa-check"></i>
      </div>
      <div
        class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder"
        @click="isDeletePhoto(keyPhoto)"
        title="Удалить"
      >
        <i class="far fa-trash-alt"></i>
      </div>
      <div
        class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder"
        title="Меню"
        @click="showMenu=true"
      >
        <i class="fas fa-ellipsis-v"></i>
      </div>
      <ui-menu :show="showMenu" @onHide="showMenu=false" position="left-bottom">
        <ul class="ui-menu__ul">
          <li class="ui-menu__li" @click="isUpdateProfile(userPhotoHost+'/'+linck)">Сделать аватаром</li>
          <li class="ui-menu__li" @click="isDeletePhoto(keyPhoto)">Удалить</li>
        </ul>
      </ui-menu>
    </div>
    <div v-if="showSpinner==true" class="wg-form-registration__card-img-spinner">
      <ui-spinner class="ui-spinner_s1 ui-spinner_white"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showMenu: false,
      userPhotoHost: this.$hosts.userPhoto,
      showSpinner: false
    };
  },
  props: {
    linck: {
      default: "",
      type: String
    },
    keyPhoto: {
      default: "",
      type: String
    },
    checkMain: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken",
      tokenPayload: "tokens/getAccessTokenPayload"
    })
  },
  methods: {
    isDeletePhoto(key) {
      if (this.checkMain == true) {
        this.isUpdateProfile("null");
      }
      this.showMenu = false;
      this.showSpinner = true;
      let body = {
        name_files: [key],
        access_token: this.token
      };
      this.$api("userphoto")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$emit("onDeletePhoto", key);
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
    isUpdateProfile(url) {
      (this.showMenu = false), (this.showSpinner = true);
      let body = {
        avatar: url,
        access_token: this.token
      };
      this.$api("profile")
        .update(body)
        .then(response => {
          if (response.body.status == "ok") {
            // обновляем профайл пользователя
            this.$store.commit(
              "profile/updateProfile",
              response.body.data.profile
            );
            this.$emit("onUserUpdated");
          }
          setTimeout(() => {
            this.showSpinner = false;
          }, 1500);
        })
        .catch(error => {
          if (error.body.status == "except") {
          }
          this.showSpinner = false;
        });
    }
  }
};
</script>

