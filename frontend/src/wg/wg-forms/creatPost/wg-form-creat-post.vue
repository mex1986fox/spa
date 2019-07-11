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
              <wg-form-update-photos-entity
                apiPhotoServer="postphoto"
                apiEntityServer="post"
                entityID="post_id"
                :entity="dPost"
                @onHide="isHide"
                @onUpdateEntity="isUpdatePost"
                statusForm="create"
              />
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCard==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-post-card-main @onCreatedPost="isShowCardPhoto"/>
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
import { mapGetters } from "vuex";
export default {
  name: "wg-form-create-post",
  components: { WgFormCreatPostCardMain },
  data() {
    return {
      dHeader: "Создать пост",
      dShow: this.show,
      dShowAnimation: false,
      showCard: true,
      showCardPhoto: false,
      clientHeigthContainer: undefined,
      dPost: undefined
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
        if (this.dPost != undefined) {
          this.$store.commit("posts/unshiftPost", this.dPost);
          this.$store.commit("myposts/unshiftPost", this.dPost);
        }
        this.$emit("onHide");
      }, 200);
    },
    isUpdatePost(data) {
      this.dPost = data.post;
    },
    isShowCardPhoto(post) {
      this.dPost = post;
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
</script>