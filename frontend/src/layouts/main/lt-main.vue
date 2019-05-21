<template>
  <div class="lt-main">
    <div class="lt-main__menu">
      <lt-main-profile @onShowRegistration="isShowRegistration" @onShowLogin="isShowLogin"></lt-main-profile>
      <ul class="lt-main__menu-list">
        <router-link to="/users" class="lt-main__menu-item">Люди</router-link>
        <router-link to="/posts" class="lt-main__menu-item">Посты</router-link>
        <router-link to="/ads" class="lt-main__menu-item">Объявления</router-link>
        <router-link to="/ads" class="lt-main__menu-item">Витрины</router-link>
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
    <wg-form-login :key="keyRegistration()" :show="showLogin" @onHide="showLogin = false"/>
  </div>
</template>
<script>
export default {
  name: "lt-main",
  data() {
    return {
      showRegistration: false,
      showLogin: false
    };
  },
  methods: {
    isShowRegistration() {
      this.showRegistration = true;
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
