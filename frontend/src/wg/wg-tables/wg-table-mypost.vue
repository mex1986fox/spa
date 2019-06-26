<template>
  <ui-table>
    <ui-table-header>
      <ui-table-tr>
        <ui-table-th>Дата</ui-table-th>
        <ui-table-th class="col-phone_clean">Марка, модель</ui-table-th>
        <ui-table-th class="col-phone_clean">Город</ui-table-th>
        <ui-table-th>Заголовок</ui-table-th>
        <ui-table-th></ui-table-th>
      </ui-table-tr>
    </ui-table-header>
    <ui-table-body>
      <ui-table-tr>
        <ui-table-td>21/06/2019 21:15</ui-table-td>
        <ui-table-td class="col-phone_clean">Mazda Capella fixprice-234f</ui-table-td>
        <ui-table-td class="col-phone_clean">Петропавловск-Комчатский Павлиха</ui-table-td>
        <ui-table-td>Заголовок поста от хитрица мальца</ui-table-td>
        <ui-table-td dclass="wg-table__td_right">
          <div
            @click="isShowExcess"
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
          >
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1">
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </ui-table-td>
      </ui-table-tr>
      <template v-if="showExcess">
        <ui-table-tr
          class="wg-table__tr_auto col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
        >
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left wg-table__td_opac-5"
          >Марка, модель</ui-table-td>
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left"
            colspan="100%"
          >Mazda Capella fixprice-234f</ui-table-td>
        </ui-table-tr>
        <ui-table-tr
          class="wg-table__tr_auto col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
        >
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left wg-table__td_opac-5"
          >Город</ui-table-td>
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left"
            colspan="100%"
          >Петропавловск-Комчатский Павлиха</ui-table-td>
        </ui-table-tr>
        <ui-table-tr class="wg-table__tr_auto">
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left wg-table__td_opac-5"
          >Описание</ui-table-td>
          <ui-table-td
            class="wg-table__tr_auto"
            dclass="wg-table__td_auto wg-table__td_left"
            colspan="100%"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet ipsam molestias explicabo natus excepturi asperiores eius! Maxime voluptas explicabo, libero quae quasi sapiente, quidem odio aspernatur voluptate obcaecati a fugit.
            Facilis suscipit doloribus quibusdam debitis velit cum incidunt voluptatum tenetur error, perspiciatis illum voluptatibus porro similique excepturi placeat fuga dolorem laborum. Aliquid consectetur voluptatibus porro error eaque perspiciatis quos quod!
            Recusandae minima fuga in rem aut dolorem culpa omnis nihil iusto pariatur! Ad quod asperiores ea delectus sed ab, corrupti laborum commodi tenetur veritatis dolorem assumenda aut ducimus atque tempore. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, maiores illum asperiores amet eveniet libero hic autem placeat iusto at recusandae veritatis? Sit dolore hic cumque sunt fuga, neque veritatis.
          </ui-table-td>
        </ui-table-tr>
      </template>
    </ui-table-body>
  </ui-table>
</template>
<script>
export default {
  data() {
    return {
      dPosts: undefined,
      showExcess: false
    };
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
    }
  }
};
</script>
