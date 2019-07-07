import WgFormCreatShopCardMain from "./card-main.vue";

import { mapGetters } from "vuex";
export default {
  name: "wg-form-create-shop",
  components: {
    WgFormCreatShopCardMain
  },
  data() {
    return {
      dHeshoper: "Создать магазин",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
      showCardPhoto: false,
      clientHeigthContainer: undefined,
      dShop: undefined
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
    isHide(shop) {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$emit("onHide");
        if (shop != undefined) {
          this.$store.commit("shops/unshiftShop", shop);
        }
      }, 200);
    },
    isHideSnackbar() {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$emit("onHide");
      }, 200);
    },
    isShowCardPhoto(shop) {
      this.dShop = shop;
      this.showCard = false;
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
