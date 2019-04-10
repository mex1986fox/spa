<template>
  <div class="ui-ef-container" @click="isClick">
    <span
      class="ui-ef-container__caption"
      :class="{'ui-ef-container__caption_completed':modCompleted,
        'ui-ef-container__caption_active':modFocus, 
               'ui-ef-container__caption_disabled':dDisabled}"
      @click="isClick"
    >{{dCaption}}</span>
    <div
      class="ui-ef-container__input"
      :class="{'ui-ef-container__input_active':modFocus,
                   'ui-ef-container__input_disabled':dDisabled}"
      ref="input"
      @focus="isFocus()"
      @blur="isBlur()"
      :disabled="dDisabled"
      tabindex="0"
    >
      <slot></slot>
    </div>
    <hr
      class="ui-ef-container__border"
      :class="{'ui-ef-container__border_active':modFocus,
                  'ui-ef-container__border_disabled':dDisabled}"
    >
    <span
      class="ui-ef-container__help"
      :class="{'ui-ef-container__help_active':help,
                    'ui-ef-container__help_disabled':dDisabled}"
      @click="isClick"
    >{{help}}</span>
    <div
      name="icon"
      class="ui-ef-container__icon"
      :class="{'ui-ef-container__icon_active':modFocus, 
               'ui-ef-container__icon_disabled':dDisabled}"
    >
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-ef-container",
  data() {
    return {
      modFocus: false,
      dCaption: this.caption,
      dDisabled: this.disabled,
      modCompleted: false
    };
  },
  props: {
    caption: {
      type: String,
      default: ""
    },
    help: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    isFocus() {
      this.modFocus = true;
      this.$emit("onFocus");
    },
    isBlur() {
      this.modFocus = false;
      this.$emit("onBlur");
    },
    isClick() {
      this.$emit("onClick");
      this.$refs.input.focus();
    }
  },

  watch: {
    disabled(newQ) {
      this.dDisabled = newQ;
    }
  },
  mounted() {
    if (this.focus == true) {
      this.modFocus == true;
      this.$refs.input.focus();
    }
    if (this.maxlength != undefined) {
      this.$refs.input.style.maxHeight = this.maxlength + "px";
    }
    setTimeout(() => {
      if (this.$refs.input.childNodes.length > 0) {
        this.modCompleted = true;
      } else {
        this.modCompleted = false;
      }
    }, 40);
  },
  updated() {
    if (this.$refs.input.childNodes.length > 0) {
      this.modCompleted = true;
    } else {
      this.modCompleted = false;
    }
  }
};
</script>
