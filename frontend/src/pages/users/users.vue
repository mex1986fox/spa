<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Люди</div>
        <div class="lt-main-menu__buttons">
          <ui-badge>
            <div v-if="countFilterUsers>0"
                 class="ui-badge__icon">{{countFilterUsers}}</div>
            <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
                 @click="isShowFilter">
              <i class="fas fa-sliders-h"></i>
            </div>
          </ui-badge>
        </div>
      </lt-main-menu>
      <wg-card-user v-for="(user) in users"
                    :key="user.user_id"
                    :user="user"
                    @onUpdateProfile="isShowUsers" />
      <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2"
             @click="isAddUsers">Показать еще ...</div>
      </div>

      <wg-filter-users :show="showFilter"
                       @onHide="showFilter=false" />
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-users",
  data() {
    return {
      showFilter: false,
      countFilterUsers: 0
    };
  },
  computed: {
    ...mapGetters({
      users: "users/getUsers"
    })
  },
  watch: {
    showFilter(newQ) {
      if (newQ == false) {
        this.checkFilterUsers();
      }
    }
  },
  methods: {
    isShowFilter() {
      this.showFilter = true;
    },

    isShowUsers() {
      let filterUsers = JSON.parse(this.$cookie.get("filter_users"));
      let body = new FormData();
      for (const key in filterUsers) {
        body.set(key, filterUsers[key]);
      }
      body.set("page", 1);
      this.$api("user")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("users/updateUsers", response.body.data.users);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isAddUsers() {
      let filterUsers = JSON.parse(this.$cookie.get("filter_users"));
      let body = new FormData();
      let step_id = this.users[this.users.length - 1]["user_id"];
      body.set("step_from", step_id);
      for (const key in filterUsers) {
        body.set(key, filterUsers[key]);
      }
      this.$api("user")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("users/updateUsers", [
              ...this.users,
              ...response.body.data.users
            ]);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    checkFilterUsers() {
      this.countFilterUsers = 0;

      if (this.$cookie.get("filter_users")) {
        let filterUsers = JSON.parse(this.$cookie.get("filter_users"));
        for (const key in filterUsers) {
          if (filterUsers[key] != undefined && filterUsers[key] != "") {
            this.countFilterUsers++;
          }
        }
      }
    }
  },
  mounted() {
    this.isShowUsers();
    this.checkFilterUsers();
  }
};
</script>