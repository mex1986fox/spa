<template>
  <div class="wg-card-user">
    <div class="wg-card-user__info">
      <div class="wg-card-user__button-menu">
        <div
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s2"
          @click="showMenu=true"
        >
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div class="wg-card-user__info-date">{{user.date_create}}</div>
      <div class="wg-card-user__info-text">{{user.city +" ("+user.subject+")"}}</div>
    </div>
    <div class="wg-card-user__avatar">
      <div class="wg-card-user__photo-fon">
        <img class="wg-card-user__photo-fon-img" v-if="user.avatar!=null" :src="user.avatar">
      </div>
      <div class="wg-card-user__photo">
        <img class="wg-card-user__img" v-if="user.avatar!=null" :src="user.avatar">
        <i v-else class="far fa-user"></i>
      </div>
      <div>
        <span class="wg-card-user__nickname">{{user.login!=null?user.login:""}}</span>
        <span
          class="wg-card-user__name"
        >{{(user.name!=null?user.name:'')+" "+(user.surname!=null?user.surname:'')}}</span>
      </div>
    </div>
    <ui-menu :show="showMenu" @onHide="isHideMenu">
      <ul class="ui-menu__ul">
        <li
          class="ui-menu__li"
          v-if="profileUserID==user.user_id"
          @click="isShowUpdateProfile"
        >Редактировать</li>
        <li class="ui-menu__li">Подружиться</li>
      </ul>
    </ui-menu>
    <wg-form-update-profile :show="showUpdateProfile" @onHide="isHideUpdateProfile"></wg-form-update-profile>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-card-user",
  data() {
    return {
      showMenu: false,
      showUpdateProfile: false
    };
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters({
      profileUserID: "profile/getID"
    })
  },
  methods: {
    isHideMenu() {
      this.showMenu = false;
    },
    isHideUpdateProfile() {
      this.showUpdateProfile = false;
    },
    isShowUpdateProfile() {
      this.showMenu = false;
      this.showUpdateProfile = true;
    }
  }
};
</script>
