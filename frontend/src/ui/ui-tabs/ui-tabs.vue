<template>
  <nav class="ui-tabs">
    <div ref="container" class="ui-tabs__container">
      <div ref="line" class="ui-tabs__line">
        <slot></slot>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "ui-tabs",
  data() {
    return {
      dShowBut: false,
      scroll: 0,
      widthLine: 0,
      widthContainer: 0
    };
  },
  watch: {
    scroll(newQ) {
      this.$refs.line.style.marginLeft = newQ + "px";
    },
    widthLine(newQ) {
      this.$refs.line.style.width = newQ + "px";
    }
  },
  methods: {
    setWidthLine() {
      setTimeout(() => {
        let elChilds = this.$refs.line.children;
        let widthChilds = 0;
        for (const child of elChilds) {
          let style = window.getComputedStyle(child, null);
          widthChilds =
            widthChilds +
            child.offsetWidth +
            parseFloat(style.marginLeft) +
            parseFloat(style.marginRight);
        }
        this.widthLine = widthChilds + 2;
        this.setOffset();
      }, 500);
    },
    setWidthContainer() {
      this.widthContainer = this.$refs.container.offsetWidth;
    },
    setOffset() {
      if (this.widthContainer < this.widthLine) {
        let scroll = 0;

        for (const child of this.$children) {
          if (child.dChecked == true) {
            if (this.widthLine - scroll > 0) {
              this.scroll = scroll * -1;
              break;
            }
          }
          scroll += child.$el.offsetWidth;
        }
      }
    }
  },
  mounted() {
    this.setWidthLine();
    this.setWidthContainer();
    window.onresize = () => {
      this.setWidthLine();
      this.setWidthContainer();
    };

    this.$refs.container.addEventListener("wheel", e => {
      if (this.widthContainer < this.widthLine) {
        e = e || window.event;
        let delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta == 100) delta = 3;
        if (delta == -100) delta = -3;
        let scroll = this.scroll + delta * -1 * 40;
        if (scroll >= 0) {
          scroll = 0;
        }

        if (this.widthLine - this.widthContainer + scroll >= 0 || delta <= 0) {
          this.scroll = scroll;
        }
      }
    });
  }
};
</script>
        