<template>
  <div class="ui-menu">
    <!-- <div class="ui-button ui-button_white">вход</div>
        <div class="ui-button ui-button_black">вход</div>
        <div class="ui-button ui-button_float_white">вход</div>
    <div class="ui-button ui-button_float_black">вход</div>-->
    <div class="ui-menu-profile">
      <div class="ui-menu-profile__avatar">
        <i class="far fa-user"></i>
      </div>
      <div class="ui-menu-profile__nickname">Nick Name</div>
      <div class="ui-menu-profile__buttons">
        <div class="ui-button ui-button_float_white">выход</div>
      </div>
    </div>
    <ul class="ui-menu__list">
      <li class="ui-menu__item">Люди</li>
      <li class="ui-menu__item">Люди</li>
      <li class="ui-menu__item">Люди</li>
      <li class="ui-menu__item">Люди</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ui-menu"
};
</script>
