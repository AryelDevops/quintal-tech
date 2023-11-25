<script>
import ArrowLeftSvg from "../assets/ArrowLeft.svg";
import Avatar from "./Avatar.vue";

export default {
  name: "SideMenuHeader",
  components: { ArrowLeftSvg, Avatar },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<template>
  <header class="side-menu-header">
    <Avatar inverted-colors>
      {{ user.name ? user.name.slice(0, 1) : "U" }}
    </Avatar>
    <div class="side-menu-header__info">
      <span>{{
        user.name && user.name.split(" ").length > 1
          ? user.name.split(" ")[0]
          : user.name
      }}</span>
      <span>Administrador</span>
    </div>
    <span class="side-menu-header__close-icon">
      <ArrowLeftSvg @click="$emit('close')" />
    </span>
  </header>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.side-menu-header {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: var(--primary-color);
  height: 70px;
  width: 100%;
  padding: 16px;
  border-bottom-right-radius: 8px;

  @media screen and (min-width: $breakpoint-768) {
    height: 90px;
  }

  &__info {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    gap: 5px;

    span:first-child {
      font-weight: bold;
    }

    span:nth-child(2) {
      font-size: 11px;
    }
  }

  &__close-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    margin-top: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 100%;
    padding: 6px;

    svg {
      margin-top: 3px;
      margin-left: 3px;
    }

    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
      background-color: darken(#9d4edd, 15%);
      transition: all 0.2s ease;
    }
  }
}
</style>
