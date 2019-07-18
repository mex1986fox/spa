<template>
  <ui-window
    class="wg-form-catalogs-create"
    :show="show"
    @onHide="isHide"
    position="fixed"
    :delayHide="0"
  >
    <ui-window-card animate="opacity" :show="show" :delayShow="0">
      <wg-form-update-photos-entity
        apiPhotoServer="catalogsphoto"
        apiEntityServer="catalogs"
        entityID="catalog_id"
        :entity="catalog"
        @onHide="isHide"
        @onUpdateEntity="isUpdateCatalog"
        statusForm="update"
      />
    </ui-window-card>
  </ui-window>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    catalog: {
      default: undefined,
      type: Object
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    },
    isUpdateCatalog() {
      this.$emit("onUpdateCatalog");
    }
  }
};
</script>
