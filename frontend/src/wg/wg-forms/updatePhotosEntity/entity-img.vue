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
      <ui-spinner class="ui-spinner_s1 ui-button-file__spinner ui-spinner_white"/>
    </div>
    <ui-snackbar
      :show="mesSnackbar!=undefined"
      type="err"
      :time="5000"
      @onHide="mesSnackbar=undefined"
    >
      <p>{{mesSnackbar}}</p>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="mesSnackbar=undefined"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showMenu: false,
      showSpinner: false,
      mesSnackbar: undefined
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
  watch: {
    checkMain(newQ) {
      this.showSpinner = false;
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
      if (this.checkMain != true) {
        this.showSpinner = true;
        this.$emit("onDeletePhoto", key);
      } else {
        this.mesSnackbar = "Главное фото нельзя удалить.";
      }
    },
    isCheckMain(key) {
      this.showMenu = false;
      if (this.checkMain != true) {
        this.showSpinner = true;
        this.$emit("onCheckMain", key);
      } else {
        this.mesSnackbar = "Это фото уже отмечено главным.";
      }
    }
  }
};
</script>

