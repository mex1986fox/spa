<template>
  <ui-table-tr>
    <ui-table-td class="wg-table__td_opacity" colspan="100%">
      <wg-table-exces
        v-if="dAd.document_id!=null"
        name="Документы:"
      >{{dAd.document_id|filter_document_id}}</wg-table-exces>
      <wg-table-exces v-if="dAd.state_id!=null" name="Состояние:">{{dAd.state_id|filter_state_id}}</wg-table-exces>
      <wg-table-exces
        v-if="dAd.exchange_id!=null"
        name="Обмен:"
      >{{dAd.exchange_id|filter_exchange_id}}</wg-table-exces>
      <wg-table-exces v-if="dAd.mileage!=null" name="Пробег:">{{dAd.mileage|filter_price}}{{" км."}}</wg-table-exces>
      <wg-table-exces v-if="dAd.transmission!=null" name="Коробка передач:">{{dAd.transmission}}</wg-table-exces>
      <wg-table-exces v-if="dAd.wheel_id!=null" name="Руль:">{{dAd.wheel_id|filter_wheel_id}}</wg-table-exces>
      <wg-table-exces v-if="dAd.fuel!=null" name="Топливо:">{{dAd.fuel}}</wg-table-exces>
      <wg-table-exces v-if="dAd.power!=null" name="Мощность:">{{dAd.power}}</wg-table-exces>
      <wg-table-exces v-if="dAd.volume!=null" name="Объем:">{{dAd.volume}}</wg-table-exces>
      <wg-table-exces v-if="dAd.drive!=null" name="Привод:">{{dAd.drive}}</wg-table-exces>
      <wg-table-exces v-if="dAd.body!=null" name="Кузов:">{{dAd.body}}</wg-table-exces>
      <wg-table-exces
        v-if="dAd.description!=null && dAd.description!=' '"
        name="Описание:"
      >{{dAd.description}}</wg-table-exces>
    </ui-table-td>
  </ui-table-tr>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-myad-desc",
  data() {
    return {
      dAd: this.ad
    };
  },
  props: {
    ad: {
      default: undefined
    }
  },
  watch: {
    ad(newQ) {
      this.dAd = newQ;
    }
  }
};
</script>
