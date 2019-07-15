<template>
  <ui-tabs class="wg-tabs-catalog">
    <ui-tabs-tab v-for="(elem, key) in catalog"
                 :key="key"
                 :checked="key==8?true:false">
      <div class="wg-tabs-catalog__tab">
        <div class="wg-tabs-catalog__img">
          <ui-img :src="elem.main_photo"
                  :nofon="true" />
        </div>
        <div class="wg-tabs-catalog__title">{{elem.title}}</div>
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
    catalog: {
      default: undefined,
      type: Array
    }
  }
};
</script>

