<template>
  <div class="ui-ef-chips"
       :class="{'ui-ef-chips_disabled':dDisabled}"
       @click="isClick">
    <input class="ui-ef-chips__input"
           type="checkbox"
           :name="dName"
           :checked="dSelected"
           :value="dValue">
    <div class="ui-ef-chips__icon"
         v-if="dSrc">
      <img class="ui-ef-chips__img"
           :class="{'ui-ef-chips__img_disabled':dDisabled}"
           :src="dSrc"
           alt="">
    </div>
    <span class="ui-ef-chips__caption"
          :class="{'ui-ef-chips__caption_disabled':dDisabled}"
          v-if="dCaption">
      {{dCaption}}
    </span>
    <span class="ui-ef-chips__button"
          :class="{'ui-ef-chips__button_disabled':dDisabled}"
          v-if="dDeleted"
          @click="isDeleted">
      <i class="fa fa-times"
         aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "uiChips",
  data() {
    return {
      dSrc: this.src,
      dValue: this.value,
      dName: this.name,
      dCaption: this.caption,
      dDeleted: this.deleted,
      dDisabled: this.disabled,
      dSelected: true
    };
  },
  methods: {
    isDeleted() {
      if (!this.dDisabled) {
        this.dSelected = false;
        let chips = {
          name: this.dName,
          value: this.dValue,
          checked: this.dSelected,
          caption: this.dCaption
        };
        this.$emit("onDeleted", chips);
      }
    },
    isClick(el) {
      var flagClick = true;
      el.target.classList.forEach(className => {
        if (
          className == "fa" ||
          className == "fa-times" ||
          className == "ui-ef-chips__button"
        ) {
          flagClick = false;
          return;
        }
      });
      if (!this.dDisabled && flagClick == true) {
        let chips = {
          name: this.dName,
          value: this.dValue,
          checked: this.dSelected,
          caption: this.dCaption
        };
        this.$emit("onClick", chips);
      }
    }
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    caption: {
      type: String,
      default: ""
    },
    deleted: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    name(newQ) {
      this.dName = newQ;
    },
    value(newQ) {
      this.dValue = newQ;
    },
    caption(newQ) {
      this.dCaption = newQ;
    }
  }
};
</script>
