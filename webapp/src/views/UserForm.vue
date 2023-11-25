<script>
import storageManager from "../utils/storage-manager";

export default {
  name: "UserForm",
  data() {
    return {
      form: {
        nome: "",
        email: "",
        senha: null,
      },
      confirmPass: "",
      loading: false,
      user: null,
    };
  },
  computed: {
    saveAllowed() {
      const { nome, email, senha } = this.form;

      const passNotRequired = !senha;
      const validPass = passNotRequired || senha === this.confirmPass;

      if (this.loading || !nome || !email || !validPass) return false;
      return true;
    },
  },
  mounted() {
    let user = storageManager.loadStorage("_qtc.user");
    if (typeof user === "string") user = JSON.parse(user);

    if (user) {
      this.form = { ...this.form, ...user };
      return;
    }
  },
  methods: {
    async saveUser() {
      if (!this.saveAllowed) return;
      try {
        this.loading = true;

        let data = { ...this.form };

        if (!data.senha) delete data.senha;

        await this.$service.update({
          data,
          path: "/usuarios",
          id: this.$route.params.id,
        });

        this.storeUserAndNavigate(this.form);

        this.form = {
          nome: "",
          email: "",
          senha: null,
        };
        this.confirmPass = "";
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    storeUserAndNavigate(user) {
      storageManager.setStorage("_qtc.user", JSON.stringify(user));

      this.$nextTick(() => {
        this.$router.push({ name: "PasswordsList" });
      });
    },
  },
};
</script>

<template>
  <div class="user-form">
    <form class="user-form__form" @submit.prevent="saveUser">
      <div class="user-form__fields">
        <span class="user-form__label">Editar meu perfil</span>
        <Input
          v-model="form.nome"
          class="user-form__form-input"
          placeholder="Nome"
          @keydown.enter="saveUser"
        />
        <Input
          v-model="form.email"
          class="user-form__form-input"
          autocomplete="email"
          placeholder="Email"
          @keydown.enter="saveUser"
        />
        <Input
          v-model="form.senha"
          class="user-form__form-input"
          autocomplete="new-password"
          type="password"
          placeholder="Senha"
          @keydown.enter="saveUser"
        />
        <Input
          v-model="confirmPass"
          class="user-form__form-input"
          autocomplete="new-password"
          type="password"
          placeholder="Confirmar senha"
          @keydown.enter="saveUser"
        />
      </div>
      <Button
        :disabled="!saveAllowed"
        class="user-form__form-button"
        type="submit"
      >
        {{ "Salvar" }}
      </Button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.user-form {
  height: 100%;
  display: flex;
  justify-content: center;

  @media screen and (min-width: $breakpoint-768) {
    align-items: center;
  }

  &__label {
    width: 100%;
    text-align: start;
    font-size: 12px;
    color: var(--text-color-1);
    padding-bottom: 10px;

    @media screen and (min-width: $breakpoint-768) {
      font-size: 14px;
    }
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    border-radius: 6px;
    height: 100%;
    width: 80%;
    max-width: 350px;
    min-width: 200px;

    @media screen and (min-width: $breakpoint-768) {
      height: fit-content;
    }
  }

  &__fields {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    width: 100%;
    height: 100%;
  }

  &__form-input {
    width: 100%;
  }

  &__form-button {
    width: 100%;
    min-width: unset;
    margin-bottom: 16px;

    @media screen and (min-width: $breakpoint-768) {
      margin: 15px 0 0;
    }
  }
}
</style>
