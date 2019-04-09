<template>
  <div class="ui-ef-text" @click="isClick()">
    <span
      class="ui-ef-text__caption"
      :class="{'ui-ef-text__caption_completed':modCompleted,
        'ui-ef-text__caption_active':modFocus, 
               'ui-ef-text__caption_disabled':dDisabled}"
      @click="isClick()"
    >{{dCaption}}</span>
    <div
      class="ui-ef-text__input"
      :class="{'ui-ef-text__input_active':modFocus,
                   'ui-ef-text__input_disabled':dDisabled}"
      ref="input"
      @focus="isFocus()"
      @blur="isBlur()"
      :disabled="dDisabled"
      :maxlength="maxlength"
      tabindex="0"
    >
      <slot></slot>
    </div>
    <hr
      class="ui-ef-text__border"
      :class="{'ui-ef-text__border_active':modFocus,
                  'ui-ef-text__border_disabled':dDisabled}"
    >
    <span
      class="ui-ef-text__help"
      :class="{'ui-ef-text__help_active':help,
                    'ui-ef-text__help_disabled':dDisabled}"
      @click="isClick()"
    >{{help}}</span>
    <div
      name="icon"
      class="ui-ef-text__icon"
      :class="{'ui-ef-text__icon_active':modFocus, 
               'ui-ef-text__icon_disabled':dDisabled}"
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
      console.dir("focus");
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
    setTimeout(() => {
      if (this.$refs.input.childNodes.length > 0) {
        this.modCompleted = true;
      } else {
        this.modCompleted = false;
      }
    }, 40);
  }
};
</script>
