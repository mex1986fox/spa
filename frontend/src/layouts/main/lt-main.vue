<template>
  <div class="lt-main">
    <div class="lt-main__menu">
      <lt-main-profile @onShowRegistration="isShowRegistration"></lt-main-profile>
      <ul class="lt-main__menu-list">
        <li class="lt-main__menu-item">Люди</li>
        <li class="lt-main__menu-item">Фотографии</li>
        <li class="lt-main__menu-item">Блоги</li>
        <li class="lt-main__menu-item">События</li>
        <li class="lt-main__menu-item">Объявления</li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "lt-main",
  data() {
    return {};
  },
  methods: {
    isShowRegistration() {
      this.$emit("onShowRegistration");
    }
  }
};
</script>
