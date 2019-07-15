<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__buttons_left">
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isRedirMyShops"
          >
            <i class="fas fa-angle-left"></i>
          </div>
        </div>
        <div class="lt-main-menu__header">{{dShop!=undefined?dShop.title:''}}</div>
      </lt-main-menu>

      <div class="pg-myshop__content">
        <h2 class="ui-header ui-header_2 ui-header_white">Каталог</h2>
        <wg-tabs-catalog :catalog="dCatalog"/>
      </div>

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddShops">Показать еще ...</div>
      </div>-->
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myshop",
  data() {
    return {
      dShop: undefined,
      dCatalog: [
        {
          title: "Двигатели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/53/mini/5d2597bb4831c.jpg"
        },
        {
          title: "Кресла",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/49/mini/5d244a1a1f6c4.jpg"
        },
        {
          title: "Фотомодели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/48/mini/5d24453928d67.jpg"
        },
        {
          title: "Экипировка",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/50/mini/5d259671eb137.jpg"
        },
        {
          title: "Двигатели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/53/mini/5d2597bb4831c.jpg"
        },
        {
          title: "Кресла",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/49/mini/5d244a1a1f6c4.jpg"
        },
        {
          title: "Фотомодели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/48/mini/5d24453928d67.jpg"
        },
        {
          title: "Экипировка",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/50/mini/5d259671eb137.jpg"
        },
        {
          title: "Двигатели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/53/mini/5d2597bb4831c.jpg"
        },
        {
          title: "Кресла",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/49/mini/5d244a1a1f6c4.jpg"
        },
        {
          title: "Фотомодели",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/48/mini/5d24453928d67.jpg"
        },
        {
          title: "Экипировка",
          main_photo:
            "http://postphoto.ru:8088/public/photos/1/50/mini/5d259671eb137.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  methods: {
    isRedirMyShops() {
      this.$router.push({ path: `/my_shops` });
    },
    isShowShop() {
      let body = new FormData();
      body.set("page", 1);
      body.set("shop_id", this.$route.params.id);
      body.set("user_id", this.profileID);
      this.$api("shops")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.dShop = response.body.data.shops[0];
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  },
  mounted() {
    this.isShowShop();
  }
};
</script>