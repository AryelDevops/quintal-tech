<script>
import VaultSvg from "@/assets/Vault.svg";

export default {
  name: "Home",
  components: { VaultSvg },
};
</script>

<template>
  <section class="home">
    <article class="home__illustration">
      <VaultSvg />
    </article>
    <article class="home__options">
      <article class="home__texts">
        <h1 class="home__texts-title">Quintal Tech</h1>
        <p class="home__texts-subtitle">
          Gerenciamento do seu negócio na palma da mão
        </p>
      </article>
      <div class="home__buttons">
        <Button
          type="submit"
          rounded
          button-type="outline"
          @click="$router.push({ name: 'Login' })"
        >
          Entrar
        </Button>
      </div>
    </article>
  </section>
</template>
<style lang="scss" scoped>
@import "../design/breakpoints";

.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $breakpoint-1024;

  &__illustration {
    display: flex;
    align-items: center;
    height: 60%;
    width: 70%;
    max-width: 400px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__texts {
    margin-bottom: 35px;
  }

  &__texts-title {
    color: var(--text-color-2);
    font-weight: normal;
    font-size: 22px;
    margin: 0;
    margin-bottom: 6px;
  }

  &__texts-subtitle {
    color: var(--text-color-1);
    font-size: 11px;
    margin: 0;
  }

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    max-width: 120px;

    button {
      min-width: 120px;
    }
  }

  @media screen and (min-width: $breakpoint-1024) {
    flex-direction: row-reverse;
    justify-content: space-around;

    &__illustration {
      width: 50%;
      max-width: 600px;
    }

    &__texts-title {
      font-size: 28px;
    }

    &__texts-subtitle {
      font-size: 14px;
    }

    &__buttons {
      max-width: 150px;

      button {
        min-width: 150px;
      }
    }
  }
}
</style>
