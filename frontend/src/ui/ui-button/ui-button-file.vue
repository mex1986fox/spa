<template>
  <div @click="isClickAddFile()" class="ui-button ui-button-file">
    <input
      ref="file"
      class="ui-button-file__input"
      type="file"
      name="files[]"
      :accept="accept"
      multiple
      :disabled="disabled"
    >
    <i v-if="disabled==false" class="fas fa-folder-plus"></i>
    <ui-spinner v-if="disabled!=false" class="ui-button-file__spinner"/>
  </div>
</template>

<script>
export default {
  name: "ui-button-file",
  data() {
    return {
      dFiles: [],
      modCompleted: false
    };
  },
  props: {
    clear: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/jpeg"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isClickAddFile() {
      this.$refs.file.click();
    }
  },
  watch: {
    clear(newQ) {
      if (newQ == true) {
        this.$refs.file.value = "";
        this.dFiles = [];
        this.$emit("onClear");
        this.$emit("onChange", this.dFiles);
      }
    }
  },
  mounted() {
    this.$refs.file.addEventListener("change", event => {
      let split = event.target.value.split("\\");
      this.dFiles = [];
      Array.from(event.target.files).forEach(file => {
        this.dFiles.push({ name: file.name, type: file.type, size: file.size });
      });
      if (this.dFiles.length > 0) {
        this.modCompleted = true;
      }
      this.$emit("onChange", this.dFiles);
    });
  }
};
</script>

