<template>
  <ui-tabs class="wg-tabs-catalog">
    <ui-tabs-tab v-for="(elem, key) in catalog" :key="key">
      <div class="wg-tabs-catalog__img">
        <ui-img :src="elem.main_photo" :alt="'/public/img/drovito.png'" :nofon="true"/>
      </div>

      <div class="wg-tabs-catalog__title">{{elem.title}}</div>
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
      type: Object
    }
  }
};
</script>

