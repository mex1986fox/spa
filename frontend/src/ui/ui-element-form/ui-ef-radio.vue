<template>
  <div class="ui-ef-radio" @click="isClick()">
    <transition name="ui-ef-radio__radio-point">
      <span
        class="ui-ef-radio__radio-point"
        :class="{'ui-ef-radio__radio-point_disabled':dDisabled}"
        v-if="dChecked"
      ></span>
    </transition>
    <span
      class="ui-ef-radio__radio"
      :class="{'ui-ef-radio__radio_active':dChecked,
                     'ui-ef-radio__radio_disabled':dDisabled}"
    ></span>
    <input
      ref="input"
      :checked="dChecked"
      class="ui-ef-radio__input"
      type="radio"
      :name="dName"
      :value="dValue"
    >
    <span class="ui-ef-radio__caption" :class="{'ui-ef-radio__caption_disabled': dDisabled}">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "ui-ef-radio",
  data() {
    return {
      dValue: this.value,
      dName: this.name,
      dChecked: this.checked,
      dDisabled: this.disabled
    };
  },
  methods: {
    isClick() {
      if (this.dDisabled == false) {
        let checked = this.dChecked;
        let brath = this.$parent.$children;
        for (let br in brath) {
          if (brath[br].dName == this.dName) brath[br].dChecked = false;
        }
        this.dChecked = !checked;
        this.$emit("onClick", this.dChecked);
      }
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.dChecked == true) {
      let brath = this.$parent.$children;
      for (let br in brath) {
        if (brath[br].dName == this.dName) brath[br].dChecked = false;
      }
      this.dChecked = true;
    }
  }
};
</script>
