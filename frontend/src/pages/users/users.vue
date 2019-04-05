<template>
  <lt-main @onShowRegistration="isShowRegistration">
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Люди</div>
        <div class="lt-main-menu__buttons">
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isShowFilter"
          >
            <i class="fas fa-sliders-h"></i>
          </div>
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
export default {
  name: "pg-users",
  data() {
    return {
      showRegistration: false,
      showFilter: false,
      users: []
    };
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
      this.$http.post(this.$hosts.services + "/api/user/show").then(
        response => {
          if (response.body.status == "ok") {
            this.users = response.body.data;
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