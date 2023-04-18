<template lang="pug">
include /src/assets/pug/index.pug
+b.form-add-user
  +e.form(v-if="isShowForm")
    b User name* (A-Z, 0-9)
    div
      +e.INPUT.field(v-model="userName")
    b Avatar user (jpg, png)
    div
      +e.INPUT.upload-file-input(type="file", ref="avatar", accept=".jpg,.png,.jpeg")
    br
    div
      +e.BUTTON.btn(@click="addUser()") Add user
  +e.message
    +e.message {{ message }}
    +e.error {{ error }}
    +e.BUTTON.btn.exit(@click="exit()", v-if="!isShowForm") Exit
</template>

<script>
import $cookies from "vue-cookies";

export default {
  name: "FormAddUser",
  data() {
    return {
      isShowForm: false,
      userName: "",
      message: "",
      error: "",
    };
  },
  mounted() {
    this.authUser();
  },
  methods: {
    // Добавить на сайте
    authUser() {
      let user = $cookies.get("user");
      if (user) {
        this.isShowForm = false;
        this.userName = user.name;
        this.message = `You are logged in as: ${this.userName}`;
        user.auth = true;
        this.$emit("user-auth", user);
      } else {
        this.isShowForm = true;
      }
    },
    // Добавить пользователя в БД
    async addUser() {
      this.userName = this.userName.trim();
      if (!/[A-Za-z-0-9]/.test(this.userName)) {
        this.error = "The name can contain only Latin letters and numbers";
        return;
      }

      if (!this.userName) {
        this.error = "Enter your username";
        return;
      }
      let { files } = this.$refs.avatar;

      let formData = new FormData();
      formData.append("name", this.userName);
      if (files[0]) {
        formData.append("avatar", files[0]);
      }

      try {
        let response = await fetch("/api/user", {
          method: "POST",
          body: formData,
        });
        let user = await response.json();
        if (user.id) {
          this.error = user.error;
          this.authUser();
        }
      } catch (error) {
        this.error = error.error;
      }
    },
    // Выход
    exit() {
      $cookies.remove("user");
      // this.isShowForm = true;
      // this.userName = "";
      // this.error = "";
      // this.message = "";
      // this.$emit("user-auth", {
      //   auth: false,
      // });
      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href;
    },
  },
};
</script>

<style lang="sass">
.form-add-user
  text-align: center
  margin-bottom: 20px
  &__message
    text-transform: uppercase
    font-size: 20px
</style>
