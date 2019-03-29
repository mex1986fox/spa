<template>
  <div class="lt-main__menu-profile">
    <template v-if="token==undefined">
      <div class="lt-main__menu-avatar">
        <i class="far fa-user"></i>
      </div>
      <div class="lt-main__menu-buttons">
        <div class="ui-button ui-button_float_white">вход</div>
        <div
          class="ui-button ui-button_float_white ui-button_noborder"
          @click="isShowRegistration"
        >регистрация</div>
      </div>
    </template>
    <template v-else>
      <div class="lt-main__menu-avatar">
        <i class="far fa-user"></i>
      </div>
      <!-- <div class="lt-main__menu-nickname">Nick Name</div> -->
      <div class="lt-main__menu-buttons">
        <div class="ui-button ui-button_float_white" @click="isDeleteToken">выход</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "lt-main-profile",
  data() {
    return {
      token_update_timer: undefined
    };
  },
  computed: {
    token() {
      return this.$store.getters["tokens/getAccessToken"];
    }
  },
  methods: {
    isShowRegistration() {
      this.$emit("onShowRegistration");
    },
    isDeleteToken() {
      this.$store.dispatch("tokens/deleteTokens");
    }
  }
};
</script>

