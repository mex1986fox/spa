
<template>
    <div class="lt-main-menu">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: "lt-name-menu",
  data() {
    return {
      };
  },
  methods: {},
  mounted() {
    this.$el.parentNode.addEventListener("scroll", ev => {
      let scrollTop = ev.target.scrollTop;
      let menu = this.$el;
      menu.style.marginTop = scrollTop + "px";
      menu.style.transition = "background 0.5s ease";
      if (scrollTop > 0) {
        menu.style.background = "#00000060";
      } else {
        menu.style.background = "#00000000";
      }
    });
  }
};
</script>

