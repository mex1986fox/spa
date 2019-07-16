<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Мои магазины</div>
        <div class="lt-main-menu__buttons">
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3">
            <i class="far fa-file-excel"></i>
          </div>
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
               @click="isShowFormCreatShop">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <wg-table-myshops v-if="showTableMyshops" />
      <!-- </div> -->

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddShops">Показать еще ...</div>
      </div>-->
      <wg-form-creat-shop :key="keyRand()"
                          :show="showFormCreatShop"
                          @onHide="showFormCreatShop=false" />
      <ui-window :show="showWindow"
                 header="Заголовище окна"
                 @onHide="showWindow=false"
                 position="fixed">
        <ui-window-card v-for="key in 3"
                        :key="key">
          <div class="ui-window-card__header">Заголовок карточки</div>
          <div class="ui-window-card__ef">
            <p>Элементы формы карточки</p>
            <p>
              quia, sequi debitis voluptatibus inventore, officia, vero sapiente ab ducimus! Et itaque officiis quas, iusto a minus iste, error dicta obcaecati vitae, quos ea?
              Amet, non. Facilis sunt delectus modi incidunt atque ipsam numquam repudiandae reiciendis magni, ratione, adipisci accusamus neque voluptatibus quidem maxime, deleniti praesentium voluptate impedit? Quibusdam aspernatur iusto voluptatem quis excepturi!
            </p>
          </div>
          <div class="ui-window-card__buttons">
            <input type="button"
                   class="ui-button ui-button_float_black"
                   value="Готово">
            <input type="button"
                   class="ui-button ui-button_float_black"
                   value="Cancel">
          </div>
        </ui-window-card>
      </ui-window>
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myshops",
  data() {
    return {
      showFormExcel: false,
      showFormCreatShop: false,
      showTableMyshops: false,
      showWindow: false
    };
  },
  watch: {
    profileID(newQ) {
      if (newQ != undefined) {
        this.showTableMyshops = true;
      }
    }
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  mounted() {
    setTimeout(() => {
      this.showWindow = true;
    }, 1000);
    if (this.profileID != undefined) {
      this.showTableMyshops = true;
    }
  },
  methods: {
    keyRand() {
      return Math.floor(Math.random() * (1 - 999999)) + 1;
    },
    isShowFormCreatShop() {
      this.showFormCreatShop = true;
    }
  }
};
</script>