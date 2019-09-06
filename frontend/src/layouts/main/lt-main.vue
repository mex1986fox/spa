<template>
  <div class="lt-main">
    <div class="lt-main__menu">
      <lt-main-profile @onShowRegistration="isShowRegistration" @onShowLogin="isShowLogin"></lt-main-profile>
      <ul v-if="profileUserID!=undefined" class="lt-main__menu-list">
        <router-link to="/my_profile" class="lt-main__menu-item">Мой профиль</router-link>
        <router-link to="/my_posts" class="lt-main__menu-item">Мои посты</router-link>
        <router-link to="/my_ads" class="lt-main__menu-item">Мои объявления</router-link>
        <router-link to="/my_shops" class="lt-main__menu-item">Мои магазины</router-link>
        <router-link to="/my_products" class="lt-main__menu-item">Мои товары и услуги</router-link>
      </ul>
      <ul class="lt-main__menu-list">
        <router-link to="/users" class="lt-main__menu-item">Люди</router-link>
        <router-link to="/posts" class="lt-main__menu-item">Посты</router-link>
        <router-link to="/ads" class="lt-main__menu-item">Объявления</router-link>
        <router-link to="/shops" class="lt-main__menu-item">Товары и услуги</router-link>
        <!-- <li class="lt-main__menu-item">События</li>
        <li class="lt-main__menu-item">Фотографии</li>-->
      </ul>
    </div>
    <slot></slot>
    <wg-form-registration
      :key="keyRegistration()"
      :show="showRegistration"
      @onHide="showRegistration = false"
    />
    <wg-form-login :key="keyRegistration()" :show="showLogin" @onHide="isHideFormLogin"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "lt-main",
  data() {
    return {
      showRegistration: false,
      showLogin: false
    };
  },
  computed: {
    ...mapGetters({
      profileUserID: "profile/getID"
    })
  },
  methods: {
    isShowRegistration() {
      this.showRegistration = true;
    },
    isHideFormLogin() {
      this.showLogin = false;
    },
    isShowLogin() {
      this.showLogin = true;
    },
    keyRegistration() {
      return Math.floor(Math.random() * (1 - 999999)) + 1;
    }
  }
};
</script>
