<template>
  <table class="ui-table">
    <slot></slot>
  </table>
</template>
<script>
export default {
  data() {
    return {
      sInt: undefined
    };
  },
  methods: {
    // подгоняет ширину колонок шапки
    // под ширину колонок body
    transformWidthTd() {
      if (this.$refs.thead || this.$refs.tbody) {
        let thCol = this.$refs.thead.getElementsByClassName("ui-table__th");
        let tdCol = this.$refs.tbody.getElementsByClassName("ui-table__td");
        if (tdCol.length != 0) {
          for (let k = 0; k < thCol.length; k++) {
            thCol[k].style.width = tdCol[k].clientWidth + "px";
          }
        }
      }
    }
  },
  mounted() {
    this.transformWidthTd();
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(this.sInt);
        this.sInt = setTimeout(() => {
          this.transformWidthTd();
        }, 100);
      },
      true
    );
  },
  updated() {
    this.transformWidthTd();
  }
};
</script>

