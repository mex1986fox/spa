<template>
  <div class="wg-card-user">
    <!-- <div class="wg-card-user__button-close">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
    </div>-->
    <div class="wg-card-user__photo">
      <img class="wg-card-user__img" v-if="user.avatar!=null" :src="user.avatar">
      <i v-else class="far fa-user"></i>
    </div>
    <div class="wg-card-user__button-menu">
      <div class="ui-button ui-button_float_black ui-button_noborder ui-button_circle_s1">
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
    <span class="wg-card-user__nickname">{{user.login!=null?user.login:""}}</span>
    <span
      class="wg-card-user__name"
    >{{(user.name!=null?user.name:'')+" "+(user.surname!=null?user.surname:'')}}</span>
  </div>
</template>
<script>
export default {
  name: "wg-card-user",
  data() {
    return {};
  },
  props: {
    user: {
      type: Object,
      default: {}
    }
  }
};
</script>
