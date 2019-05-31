<template>
  <ui-blind :show="dShow">
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
          <ui-animation-display v-if="showCardPhoto==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-photo :ad="dAd" @onHide="isHide"/>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardNotMain==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-notmain :ad="dAd" @onAdUpdated="isShowCardPhoto"/>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCard==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-main @onCreatedAd="isShowCardNotMain"/>
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
import WgFormCreatAdCardMain from "./card-main.vue";
import WgFormCreatAdCardPhoto from "./card-photo.vue";
import WgFormCreatAdCardNotmain from "./card-notmain.vue";
import { mapGetters } from "vuex";
export default {
  name: "wg-form-create-ad",
  components: {
    WgFormCreatAdCardMain,
    WgFormCreatAdCardPhoto,
    WgFormCreatAdCardNotmain
  },
  data() {
    return {
      dHeader: "Создать объявление",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
      showCardNotMain: false,
      showCardPhoto: false,
      clientHeigthContainer: undefined,
      dAd: undefined
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
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
        this.$emit("onHide");
      }, 200);
    },
    isShowCardNotMain(ad) {
      this.dAd = ad;
      this.showCard = false;
      setTimeout(() => {
        this.showCardNotMain = true;
      }, 200);
    },

    isShowCardPhoto(ad) {
      this.dAd = ad;
      this.showCardNotMain = false;
      setTimeout(() => {
        this.showCardPhoto = true;
      }, 200);
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