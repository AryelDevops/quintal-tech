<script>
import UserMenu from "./UserMenu.vue";
export default {
  name: "AppHeader",
  components: { UserMenu },
};
</script>

<template>
  <section class="header">
    <h1 class="header__title">Quintal Tech</h1>
    <UserMenu />
  </section>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.header {
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;

  &__title {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    grid-column-start: 2;
    color: var(--text-color-2);

    @media screen and (min-width: $breakpoint-768) {
      font-size: 16px;
    }

    @media screen and (min-width: $breakpoint-1024) {
      font-size: 18px;
    }
  }
}
</style>
