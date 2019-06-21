<template>
  <ui-blind :show="dShow" position="fixed">
    <div class="wg-form-registration" v-if="dShow && token!=undefined">
      <ui-animation-display v-if="dShowAnimation==true" :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">{{dHeader}}</div>
            <div class="wg-form-registration__menu-buttons">
              <div @click="isHide()" class="ui-button ui-button_float_white ui-button_circle_s2">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
          <ui-animation-display v-if="showCard==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-update-ad-card-main :ad="ad" @onUpdateAd="isUpdateAd"/>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardPhoto==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-update-ad-card-photo :ad="ad" @onHide="isHide" @onUpdateAd="isUpdateAd"/>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
    <ui-snackbar :show="dShow && token==undefined" type="err" :time="5000" @onHide="isHide">
      <b>Добавить объявление могут только авторизованные пользователи.</b>
      <p>Авторизуйтесь или зарегистрируйтесь.</p>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="isHide"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </ui-blind>
</template>

<script>
import WgFormUpdateAdCardMain from "./card-main.vue";
import WgFormUpdateAdCardPhoto from "./card-photo.vue";
import { mapGetters } from "vuex";
export default {
  name: "wg-form-update-ad",
  components: { WgFormUpdateAdCardMain, WgFormUpdateAdCardPhoto },
  data() {
    return {
      dHeader: "Редактировать объявление",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
      showCardPhoto: true,
      clientHeigthContainer: undefined,
      dAd: this.ad
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    ad: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
      if (newQ == true) {
        setTimeout(() => {
          let scrollTop = this.$el.parentNode.scrollTop;
          this.$el.style.marginTop = scrollTop + "px";
          this.dShowAnimation = true;
        }, 100);
      }
    }
  },
  methods: {
    isHide() {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$store.commit("ads/updateAd", this.dAd);
        this.$emit("onHide");
      }, 200);
    },
    isUpdateAd(ad) {
      this.dAd = ad;
    }
  },
  mounted() {
    if (this.dShow == true) {
      setTimeout(() => {
        let scrollTop = this.$el.parentNode.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
        this.dShowAnimation = true;
      }, 4);
    }
  }
};
</script>