<template>
  <div class="lt-main__menu-profile">
    <template v-if="token==undefined">
      <div class="lt-main__menu-avatar">
        <i class="far fa-user"></i>
      </div>
      <div class="lt-main__menu-buttons">
        <div class="ui-button ui-button_float_white" @click="isShowLogin">вход</div>
        <div
          class="ui-button ui-button_float_white ui-button_noborder"
          @click="isShowRegistration"
        >регистрация</div>
      </div>
    </template>
    <template v-else>
      <div class="lt-main__menu-avatar">
        <i class="far fa-user" v-if="avatar==undefined"></i>
        <img v-if="avatar!=undefined" :src="avatar">
      </div>
      <div class="lt-main__menu-nickname">{{login}}</div>
      <div class="lt-main__menu-buttons">
        <div class="ui-button ui-button_float_white" @click="isDeleteToken">выход</div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "lt-main-profile",
  data() {
    return { errLoadAvatar: false };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken",
      tokenPayload: "tokens/getAccessTokenPayload",
      avatar: "profile/getAvatar",
      login: "profile/getLogin"
    })
  },

  watch: {
    token(newQ, oldQ) {
      if (oldQ == undefined && newQ != undefined) {
        this.$store.dispatch("profile/updateProfile", this.token);
      }
    }
  },
  methods: {
    isShowRegistration() {
      this.$emit("onShowRegistration");
    },
    isShowLogin() {
      this.$emit("onShowLogin");
    },
    isDeleteToken() {
      this.$store.dispatch("tokens/deleteTokens");
      this.$store.commit("profile/deleteProfile");
    }
  }
};
</script>

