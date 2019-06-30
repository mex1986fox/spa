<template>
  <fragment>
    <ui-table-tr>
      <ui-table-td class="wg-table__td_left col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
                   colspan="3">
        <div class="wg-table__td_dete">{{dAd.date_create|filter_date}}</div>
        <div>{{dAd.subject+" "+dAd.city}}</div>
        <div>{{dAd.brand+" "+dAd.model}}</div>
        <div>{{dAd.year+" г.в."}}</div>
        <div>{{dAd.price|filter_price}}{{" руб."}}</div>
      </ui-table-td>
      <ui-table-td class="wg-table__td_dete wg-table__td_left col-phone_clean">{{dAd.date_create|filter_date}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dAd.subject+" "+dAd.city}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dAd.brand+" "+dAd.model}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dAd.year}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dAd.price|filter_price}}</ui-table-td>
      <ui-table-td>
        <div class="wg-table__buttons">
          <div @click="isShowExcess"
               class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1">
            <i v-if="showExcess==false"
               class="fas fa-angle-down"></i>
            <i v-if="showExcess==true"
               class="fas fa-angle-up"></i>
          </div>
          <div @click="showMenu=true"
               class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1">
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <wg-form-update-ad :show="showUpdatePost"
                           @onHide="isHideUpdatePost"
                           @onUpdatePost="isUpdatePost"
                           :ad="dAd" />
        <ui-menu :show="showMenu"
                 @onHide="isHideMenu">
          <ul class="ui-menu__ul">
            <li class="ui-menu__li"
                @click="isShowUpdatePost">Редактировать</li>
            <li class="ui-menu__li"
                @click="isDeletePostAlbumAndAd">Удалить</li>
          </ul>
        </ui-menu>
      </ui-table-td>
    </ui-table-tr>
    <template v-if="showExcess==true">
      <ui-table-span v-if="dAd.document_id!=null" />
      <wg-table-exces v-if="dAd.document_id!=null"
                      name="Документы:">{{dAd.document_id|filter_document_id}}</wg-table-exces>
      <ui-table-span v-if="dAd.state_id!=null" />
      <wg-table-exces v-if="dAd.state_id!=null"
                      name="Состояние:">{{dAd.state_id|filter_state_id}}</wg-table-exces>
      <ui-table-span v-if="dAd.exchange_id!=null" />
      <wg-table-exces v-if="dAd.exchange_id!=null"
                      name="Обмен:">{{dAd.exchange_id|filter_exchange_id}}</wg-table-exces>
      <ui-table-span v-if="dAd.mileage!=null" />
      <wg-table-exces v-if="dAd.mileage!=null"
                      name="Пробег:">{{dAd.mileage|filter_price}}{{" км."}}</wg-table-exces>
      <ui-table-span v-if="dAd.transmission!=null" />
      <wg-table-exces v-if="dAd.transmission!=null"
                      name="Коробка передач:">{{dAd.transmission}}</wg-table-exces>
      <ui-table-span v-if="dAd.wheel_id!=null" />
      <wg-table-exces v-if="dAd.wheel_id!=null"
                      name="Руль:">{{dAd.wheel_id|filter_wheel_id}}</wg-table-exces>
      <ui-table-span v-if="dAd.fuel!=null" />
      <wg-table-exces v-if="dAd.fuel!=null"
                      name="Топливо:">{{dAd.fuel}}</wg-table-exces>
      <ui-table-span v-if="dAd.power!=null" />
      <wg-table-exces v-if="dAd.power!=null"
                      name="Мощность:">{{dAd.power}}</wg-table-exces>
      <ui-table-span v-if="dAd.fuel!=null" />
      <wg-table-exces v-if="dAd.fuel!=null"
                      name="Топливо:">{{dAd.fuel}}</wg-table-exces>
      <ui-table-span v-if="dAd.volume!=null" />
      <wg-table-exces v-if="dAd.volume!=null"
                      name="Объем:">{{dAd.volume}}</wg-table-exces>
      <ui-table-span v-if="dAd.drive!=null" />
      <wg-table-exces v-if="dAd.drive!=null"
                      name="Привод:">{{dAd.drive}}</wg-table-exces>
      <ui-table-span v-if="dAd.body!=null" />
      <wg-table-exces v-if="dAd.body!=null"
                      name="Кузов:">{{dAd.body}}</wg-table-exces>
      <ui-table-span v-if="dAd.description!=null" />
      <wg-table-exces v-if="dAd.description!=null"
                      name="Описание:">{{dAd.description}}</wg-table-exces>
    </template>
  </fragment>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableExces from "./wg-table-exces.vue";
export default {
  name: "wg-table-myads",
  components: { WgTableExces },
  data() {
    return {
      showExcess: false,
      showMenu: false,
      showUpdatePost: false,
      dAd: this.ad
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
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
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
    },
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdatePost() {
      this.showMenu = false;
      this.showUpdatePost = true;
    },
    isHideUpdatePost() {
      this.showUpdatePost = false;
    },
    isUpdatePost(ad) {
      this.dAd = ad;
      this.$emit("onUpdatePost", ad);
    },
    isDeletePostAlbumAndAd() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeletePost();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePost() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("ad")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.$emit("onDeletePost", this.ad);
            this.$store.commit("myads/deletePost", this.dAd);
            this.$store.commit("ads/deletePost", this.dAd);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePostAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("ad_id", this.dAd.ad_id);
      //отправляем запрос
      this.$api("adphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.isDeletePost();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>
