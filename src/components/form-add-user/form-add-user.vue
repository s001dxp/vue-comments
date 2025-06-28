<template>
  <div class="form-add-user">
    <div class="form-add-user__form" v-if="isShowForm">
      <b>User name* (A-Z, 0-9)</b>
      <div>
        <input class="form-add-user__field" v-model="userName">
      </div>
      <b>Avatar user (jpg, png)</b>
      <div>
        <input
          class="form-add-user__upload-file-input"
          type="file"
          ref="avatar"
          accept=".jpg,.png,.jpeg"
        />
      </div>
      <br>
      <div>
        <button class="form-add-user__btn btn" @click="addUser()">Add user</button>
      </div>
    </div>
    <div class="form-add-user__message">
      <div class="form-add-user__message">{{ message }}</div>
      <div class="form-add-user__error">{{ error }}</div>
      <button class="form-add-user__btn btn exit" @click="exit()" v-if="!isShowForm">Exit</button>
    </div>
  </div>
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
    // Add to site
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
    // Add user to DB
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
        if (!response.ok) throw await response.json();
        let user = await response.json();
        if (user.id) {
          this.error = user.error;
          this.authUser();
        }
      } catch (error) {
        console.log(error)
        this.error = error?.error;
      }
    },
    // Exit
    exit() {
      $cookies.remove("user");
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.form-add-user {
  text-align: center;
  margin-bottom: 20px;
  &__message {
    text-transform: uppercase;
    font-size: 20px;
  }
}
</style>
