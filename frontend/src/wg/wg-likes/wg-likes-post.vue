<template>
  <div class="wg-likes">
    <div
      class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
      @click="isCreateLike(1)"
    >
      <i class="far fa-thumbs-up"></i>
    </div>
    <div class="wg-likes__counter">{{dLikes!=null?dLikes:0}}</div>
    <div
      class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
      @click="isCreateLike(0)"
    >
      <i class="far fa-thumbs-down"></i>
    </div>
    <div class="wg-likes__counter">{{dDislikes!=null?dDislikes:0}}</div>

    <ui-snackbar :show="showSnackbar" type="err" :time="5000" @onHide="isHideSnackbar">
      <b>{{dExc}}</b>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="isHideSnackbar"
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
      dExc: undefined,
      showSnackbar: false,
      dLikes: this.likes,
      dDislikes: this.dislikes
    };
  },
  props: {
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    userID: {
      type: Number,
      default: undefined
    },
    postID: {
      type: Number,
      default: undefined
    }
  },
  computed: {
    // подключает гетеры из хранилишь
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  methods: {
    isHideSnackbar() {
      this.showSnackbar = false;
      this.dExc = undefined;
    },
    isCreateLike(vote) {
      this.dExc = undefined;
      if (this.token != undefined) {
        let body = new FormData();
        body.set("access_token", this.token);
        body.set("user_id", this.userID);
        body.set("post_id", this.postID);
        body.set("vote", vote);
        this.$api("post")
          .createLike(body)
          .then(response => {
            if (response.body.status == "ok") {
              if (vote == 1) {
                this.dLikes += 1;
              }
              if (vote == 0) {
                this.dDislikes += 1;
              }
            }
          })
          .catch(error => {
            this.dExc = error.body.data.massege;
            this.showSnackbar = true;
          });
      } else {
        this.dExc = "Лайкать могут только зарегистрированные пользователи.";
        this.showSnackbar = true;
      }
    }
  }
};
</script>

