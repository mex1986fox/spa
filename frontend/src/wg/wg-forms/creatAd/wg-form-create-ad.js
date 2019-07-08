import WgFormCreatAdCardMain from "./card-main.vue";
import WgFormCreatAdCardNotmain from "./card-notmain.vue";
import { mapGetters } from "vuex";
export default {
  name: "wg-form-create-ad",
  components: {
    WgFormCreatAdCardMain,
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
        if (this.dAd != undefined) {
          this.$store.commit("ads/unshiftAd", this.dAd);
        }
      }, 200);
    },
    isHideSnackbar() {
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
    },
    isUpdateAd(data) {
      this.dAd = data.ad;
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
