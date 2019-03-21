<template>
  <div @click="isClickAddFile()"
       class="ui-button-file ui-button-file_float_black">
    <input ref="file"
           class="ui-button-file__input"
           type="file"
           name="files[]"
           :accept="accept"
           multiple>
    <i class="far fa-images ui-button-file__images"></i>
    <span class="ui-button-file__plus">+</span>
  </div>

</template>

<script>
export default {
  name: "ui-button-file",
  data() {
    return {};
  },
  methods: {
    isClickAddFile() {
      this.$refs.file.click();
    }
  }
};
</script>

