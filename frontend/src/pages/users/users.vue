<template>
  <lt-main @onShowRegistration="isShowRegistration">
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Люди</div>
        <div class="lt-main-menu__buttons">
          <ui-badge>
            <div class="ui-badge__icon">1</div>
            <div
              class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
              @click="isShowFilter"
            >
              <i class="fas fa-sliders-h"></i>
            </div>
          </ui-badge>
        </div>
      </lt-main-menu>
      <wg-card-user v-for="(user, key) in users" :key="key" :user="user"/>
      <wg-form-registration
        :key="keyRegistration()"
        :show="showRegistration"
        @onHide="showRegistration = false"
      />
      <wg-filter-users :show="showFilter" @onHide="showFilter=false"/>
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-users",
  data() {
    return {
      showRegistration: false,
      showFilter: false
    };
  },
  computed: {
    ...mapGetters({
      users: "users/getUsers"
    })
  },
  methods: {
    isShowRegistration() {
      this.showRegistration = true;
    },
    isShowFilter() {
      this.showFilter = true;
    },
    keyRegistration() {
      return Math.floor(Math.random() * (1 - 999999)) + 1;
    },
    isShowUsers() {
      let filterUsers = JSON.parse(this.$cookie.get("filter_users"));
      let body = new FormData();
      for (const key in filterUsers) {
        body.set(key, filterUsers[key]);
      }
      this.$http.post(this.$hosts.services + "/api/user/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.$store.commit("users/updateUsers", response.body.data);
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    }
  },
  mounted() {
    this.isShowUsers();
  }
};
</script>