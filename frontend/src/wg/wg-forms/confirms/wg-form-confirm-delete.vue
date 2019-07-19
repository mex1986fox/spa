<template>
  <ui-window :show="show" @onHide="isHide" position="fixed" :delayHide="0">
    <ui-window-card animate="opacity" :show="show" :delayShow="0">
      <div class="ui-window-card__header">Вы действитель хотите произвести удаление?</div>
      <div class="ui-window-card__ef">
        <ui-ef-checkbox ref="checkBox">больше не спрашивать.</ui-ef-checkbox>
      </div>
      <div class="ui-window-card__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black"
          value="Удалить"
          @click="isDelete"
        >
        <input type="button" class="ui-button ui-button_float_black" value="Отмена" @click="isHide">
      </div>
    </ui-window-card>
  </ui-window>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    },
    isDelete() {
      if (this.$refs.checkBox.dChecked == true) {
        this.$emit("onChecked");
      }
      this.$emit("onDelete");
      this.$emit("onHide");
    }
  }
};
</script>
