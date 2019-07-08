<template>
  <div class="wg-form-registration__card-img">
    <ui-img :src="linck"/>
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
          <li class="ui-menu__li" @click="isCheckMain(keyPhoto)">Сделать главной</li>
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
      adsPhotoHost: this.$hosts.adsPhoto,
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
    },
    ad: {
      default: undefined
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
      this.showMenu = false;
      this.showSpinner = true;
      this.$emit("onDeletePhoto", key);
    },
    isCheckMain(key) {
      this.showMenu = false;
      this.showSpinner = true;
      this.$emit("onCheckMain", key);
    }
  }
};
</script>

