<template>
  <ui-tabs class="wg-tabs-catalog">
    <ui-tabs-tab
      v-for="(product, key) in catalogs"
      :key="key"
      :checked="product.checked==true"
      @onFocus="isTabFocus(product)"
    >
      <div class="wg-tabs-catalog__tab">
        <div class="wg-tabs-catalog__img">
          <ui-img :src="product.main_photo" :nofon="product.main_photo==null?true:false"/>
        </div>
        <div class="wg-tabs-catalog__title">{{product.title}}</div>
      </div>
    </ui-tabs-tab>
  </ui-tabs>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    catalogs: {
      default: undefined,
      type: Array
    }
  },
  methods: {
    isTabFocus(product) {
      this.$emit("onFocus", product);
    }
  }
};
</script>

