<template>
  <div class="ui-ef-checkbox" @click="isClick()">
    <span
      class="ui-ef-checkbox__check"
      :class="{'ui-ef-checkbox__check_disabled': dDisabled,
                    'ui-ef-checkbox__check_disabled_checked': dChecked && dDisabled,
                    'ui-ef-checkbox__check_checked': dChecked && !dDisabled}"
    >
      <i class="fa fa-check" aria-hidden="true"></i>
    </span>
    <input
      class="ui-ef-checkbox__input"
      type="checkbox"
      :name="dName"
      :disabled="dDisabled"
      :checked="dChecked"
      :value="dValue"
    >
    <span class="ui-ef-checkbox__caption" :class="{'ui-ef-checkbox__caption_disabled': dDisabled}">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "uiCheckBox",
  data() {
    return {
      dChecked: this.checked,
      dName: this.name,
      dValue: this.value,
      dDisabled: this.disabled,
      dCaption: this.caption
    };
  },
  methods: {
    isClick() {
      if (this.dDisabled == false) {
        this.dChecked = !this.dChecked;
      }
      let chekBox = {
        name: this.dName,
        value: this.dValue,
        checked: this.dChecked,
        caption: this.dCaption
      };
      this.$emit("onClick", chekBox);
    }
  },

  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    checked: {
      type: Boolean,
      default: false
    },
    caption: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    checked(newQ, oldQ) {
      this.dChecked = newQ;
      // console.log(newQ);
    },
    value(newQ) {
      this.dValue = newQ;
    }
  }
};
</script>
