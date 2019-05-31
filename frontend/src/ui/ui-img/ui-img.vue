<template>
  <div class="ui-img">
    <img ref="fon" class="ui-img__fon" :src="dSrc">
    <img ref="pict" class="ui-img__pict" :src="dSrc">
  </div>
</template>

<script>
export default {
  data() {
    return { dSrc: this.src != null ? this.src : this.alt };
  },
  props: {
    src: {
      default: "",
      type: String
    },
    alt: {
      default: "",
      type: String
    }
  },
  watch: {
    src(newQ) {
      this.dSrc = this.src != null ? this.src : this.alt;
    }
  },
  methods: {
    //опредляет расположение горизонтальное или вертикальное
    locSlide(elem) {
      if (elem.clientWidth - elem.clientHeight >= 0) {
        return "hor";
      }
      return "ver";
    },
    locImg(elem) {
      if (elem.naturalWidth - elem.naturalHeight >= 0) {
        return "hor";
      }
      return "ver";
    },
    //устанавливает выравнивание картинки относительно блока
    setPositionImg(slide, img) {
      if (this.locSlide(slide) == "hor" && this.locImg(img) == "hor") {
        // проверить соотношение
        if (
          slide.clientWidth / slide.clientHeight <
          img.naturalWidth / img.naturalHeight
        ) {
          img.className = "ui-img__pict ui-img__pict_horizon";
        } else {
          img.className = "ui-img__pict ui-img__pict_vertical";
        }
      }
      if (this.locSlide(slide) == "hor" && this.locImg(img) == "ver") {
        img.className = "ui-img__pict ui-img__pict_vertical";
      }
      if (this.locSlide(slide) == "ver" && this.locImg(img) == "hor") {
        img.className = "ui-img__pict ui-img__pict_horizon";
      }
      if (this.locSlide(slide) == "ver" && this.locImg(img) == "ver") {
        if (
          slide.clientHeight / slide.clientWidth >
          img.naturalHeight / img.naturalWidth
        ) {
          img.className = "ui-img__pict ui-img__pict_horizon";
        } else {
          img.className = "ui-img__pict ui-img__pict_vertical";
        }
      }
    }
  },
  mounted() {
    this.$refs.pict.addEventListener("error", () => {
      this.dSrc = this.alt;
    });
    this.$refs.pict.addEventListener("load", () => {
      setTimeout(() => {
        this.setPositionImg(this.$el, this.$refs.pict);
        this.$refs.pict.style.opacity = "1";
        this.$refs.fon.style.opacity = "0.2";
      }, 200);
    });
  }
};
</script>
