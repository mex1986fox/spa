<template>
  <div class="ui-ef-password">
    <ui-ef-text
      ref="text"
      :type="dType"
      :name="name"
      :value="dValue"
      :caption="caption"
      :readonly="readonly"
      :disabled="disabled"
      :help="help"
      :maxlength="maxlength"
    >
      <i v-if="dType=='password'" @click="isClickIcon()" slot="icon" class="far fa-eye-slash"></i>
      <i v-if="dType=='text'" @click="isClickIcon()" slot="icon" class="far fa-eye"></i>
    </ui-ef-text>
  </div>
</template>

<script>
export default {
  name: "ui-ef-password",
  data() {
    return {
      dValue: this.value,
      dType: "password"
    };
  },
  props: {
    name: {
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
    value: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number,
      default: 17
    }
  },
  methods: {
    isClickIcon() {
      if (this.disabled == false && this.dType == "password") {
        this.dType = "text";
        return;
      }
      if (this.disabled == false && this.dType == "text") {
        this.dType = "password";
        return;
      }
    }
  }
};
</script>
