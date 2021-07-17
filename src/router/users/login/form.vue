<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    on_submit() {
      this.login({
        email: this.email,
        password: this.password,
      })
        .then((path) => {
          this.$router.push(path).catch((error) => {
            alert(error.message);
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        v-model.lazy="email"
        type="text"
        class="form-control"
        id="email"
        placeholder="Enter email"
      />
    </div>

    <div class="form-group">
      <label for="userpassword">Password</label>
      <input
        v-model.lazy="password"
        type="password"
        class="form-control"
        id="userpassword"
        placeholder="Enter password"
      />
    </div>

    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="customControlInline" />
      <label class="custom-control-label" for="customControlInline">Remember me</label>
    </div>

    <div class="mt-3">
      <button class="btn btn-primary btn-block" type="button" @click="on_submit">
        Log In
      </button>
    </div>
    <p v-if="$store.state.auth.error" class="text-danger mt-3">
      * {{ $store.state.auth.error }}
    </p>
    <div class="mt-4 text-center">
      <router-link tag="a" to="/auth/recoverpwd" class="text-muted">
        <i class="mdi mdi-lock mr-1"></i> Forgot your password?
      </router-link>
    </div>
  </form>
</template>
