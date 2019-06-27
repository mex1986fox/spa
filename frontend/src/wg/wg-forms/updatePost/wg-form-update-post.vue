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
              <wg-form-creat-post-card-main :post="post" @onUpdatePost="isUpdatePost"/>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardPhoto==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-post-card-photo
                :post="post"
                @onHide="isHide"
                @onUpdatePost="isUpdatePost"
              />
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
    <ui-snackbar :show="dShow && token==undefined" type="err" :time="5000" @onHide="isHide">
      <b>Добавить пост могут только авторизованные пользователи.</b>
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
import WgFormCreatPostCardMain from "./card-main.vue";
import WgFormCreatPostCardPhoto from "./card-photo.vue";
import { mapGetters } from "vuex";
export default {
  name: "wg-form-update-post",
  components: { WgFormCreatPostCardMain, WgFormCreatPostCardPhoto },
  data() {
    return {
      dHeader: "Редактировать пост",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
      showCardPhoto: true,
      clientHeigthContainer: undefined,
      dPost: this.post
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    post: {
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
        this.$emit("onHide");
        this.$store.commit("posts/updatePost", this.dPost);
        this.$store.commit("myposts/updatePost", this.dPost);
      }, 200);
    },
    isUpdatePost(post) {
      this.dPost = post;
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