<script>
import storageManager from "../utils/storage-manager";
import VaultSvg from "@/assets/Vault.svg";

export default {
  name: "Login",
  components: { VaultSvg },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      user: null,
    };
  },
  methods: {
    async tryToLogIn() {
      try {
        this.loading = true;
        const { email, password } = this.form;
        if (!email || !password) return;

        let { data } = await this.$service.create({
          path: "autenticar",
          data: { email, password },
        });

        this.user = data;

        this.storeUserAndNavigate();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    storeUserAndNavigate(user = this.user) {
      storageManager.setStorage("_qtc.user", user);

      this.$nextTick(() => {
        this.$router.push({ name: "PasswordsList" });
      });
    },
  },
};
</script>

<template>
  <div class="login">
    <section class="login__illustration">
      <VaultSvg />
    </section>
    <form class="login__form" @submit.prevent="tryToLogIn">
      <Input
        v-model="form.email"
        class="login__form-input"
        autocomplete="email"
        placeholder="Email"
      />
      <Input
        v-model="form.password"
        class="login__form-input"
        autocomplete="current-password"
        type="password"
        placeholder="password"
        @keydown.enter="tryToLogIn"
      />
      <Button
        :disabled="!form.email || !form.password || loading"
        class="login__form-button"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
@import "../design/breakpoints";

.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__illustration {
    width: 30%;
    min-width: 200px;

    @media screen and (min-width: $breakpoint-1024) {
      width: 40%;
    }
  }

  &__form {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 400px;
    min-width: 200px;
  }

  &__form-input {
    width: 100%;
  }

  &__form-button {
    width: 100%;
    min-width: unset;
    margin-top: 10px;
  }
}
</style>
