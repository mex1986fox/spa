<template>
  <div class="layout">
    <ui-menu></ui-menu>
    <div class="ui-content"></div>
  </div>
</template>
<script>
export default {
  name: "layout",
  data() {
    return {
      hello: "Hello"
    };
  }
};
</script>
<style lang="scss">
html {
  height: 100%;
  width: 100%;
}

body {
  position: relative;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #333;
  background-color: #fff;
  margin: 0;
  padding: 0;
  height: 100%;
}
.layout {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to top left,
    rgb(110, 32, 58) 20%,
    rgb(48, 63, 146) 50%,
    rgb(82, 12, 114) 80%
  );
}
.ui-content {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  background-color: rgba(48, 48, 48, 0.719);
  height: 100%;
  width: 100%;
}
</style>

