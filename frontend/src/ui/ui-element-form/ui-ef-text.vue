<template>
  <div class="ui-ef-text" @click="isClick()">
    <span
      class="ui-ef-text__caption"
      :class="{'ui-ef-text__caption_completed':modCompleted,
            'ui-ef-text__caption_active':modFocus, 
                   
                   'ui-ef-text__caption_disabled':dDisabled}"
      @click="isClick()"
    >{{dCaption}}</span>
    <input
      :type="dType"
      class="ui-ef-text__input"
      :class="{'ui-ef-text__input_active':modFocus,
                   'ui-ef-text__input_disabled':dDisabled}"
      ref="input"
      @focus="isFocus()"
      @blur="isBlur()"
      @input="isInputText()"
      @paste="isInputText()"
      @change="isInputText()"
      :name="dName"
      :value="dValue"
      :readonly="dReadonly"
      :disabled="dDisabled"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
    >
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
  name: "ui-ef-text",
  data() {
    return {
      modFocus: false,
      //modCompleted: false,
      dType: this.type,
      dName: this.name,
      dValue: this.value,
      dCaption: this.caption,
      dDisabled: this.disabled,
      dReadonly: this.readonly,
      dCaretStart: this.caretStart,
      dCaretEnd: this.caretEnd
    };
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    caption: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    caretStart: {
      type: Number,
      default: undefined
    },
    caretEnd: {
      type: Number,
      default: undefined
    },
    maxlength: {
      type: Number,
      default: undefined
    },
    masc: {
      type: [Object, String],
      default: undefined
    },
    focus: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    }
  },
  methods: {
    setCaret() {
      if (this.dCaretStart != undefined && this.dCaretEnd != undefined) {
        let ctrl = this.$refs.input;
        ctrl.focus();
        ctrl.setSelectionRange(this.dCaretStart, this.dCaretEnd);
      }
    },
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
      this.setCaret();
    },
    isInputText() {
      this.dValue = this.$refs.input.value;
      this.$emit("onInput", this.dValue);
    },
    mascNumber(val) {
      let newQ = val.replace(/[^0-9]/gim, "");
      if (newQ[0] == 0) {
        newQ = newQ.substr(1);
      }
      if (newQ.length > 4) {
        let spl = newQ.split("");
        spl.splice(-3, 0, " ");
        newQ = spl.join("");
      }
      if (newQ.length > 7) {
        let spl = newQ.split("");
        spl.splice(-7, 0, " ");
        newQ = spl.join("");
      }
      return newQ;
    }
  },
  computed: {
    modCompleted() {
      if (this.dValue == "") {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    value(newQ, oldQ) {
      if (newQ == undefined) {
        this.dValue = "";
      } else {
        this.dValue = newQ;
      }
    },
    dValue(newV) {
      if (this.masc != undefined) {
        switch (this.masc) {
          case "mascNumber":
            this.dValue = this.mascNumber(newV);
            break;
          default:
            this.dValue = this.masc.use(newV);
        }
      }
    },
    caretStart(newQ) {
      this.dCaretStart = newQ;
    },
    caretEnd(newQ) {
      this.dCaretEnd = newQ;
    },
    disabled(newQ) {
      this.dDisabled = newQ;
    },
    type(newQ) {
      this.dType = newQ;
    }
  },
  mounted() {
    if (this.focus == true) {
      this.modFocus == true;
      let ctrl = this.$refs.input;
      ctrl.focus();
    }
    setTimeout(() => {
      if (this.$el.querySelectorAll("input:-webkit-autofill").length > 0) {
        this.modFocus=true;
      }
    }, 1000);
  },
  updated() {
    if (this.modFocus == true) {
      this.setCaret();
    }
  }
};
</script>
