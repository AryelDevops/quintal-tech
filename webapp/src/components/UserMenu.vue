<script>
import storageManager from "../utils/storage-manager";
import Avatar from "./Avatar.vue";
import CaretDownSvg from "../assets/CaretDown.svg";
import UserMenuPopup from "./UserMenuPopup.vue";

export default {
  name: "UserMenu",
  components: { Avatar, CaretDownSvg, UserMenuPopup },
  data() {
    return {
      user: {},
      opened: false,
    };
  },
  mounted() {
    let user = storageManager.loadStorage("_qtc.user");
    if (typeof user === "string") user = JSON.parse(user);

    if (user) this.user = user;
  },
  methods: {
    logOut() {
      storageManager.setStorage("_qtc.user", null);

      this.$nextTick(() => {
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>

<template>
  <div class="user-menu" @click="opened = !opened">
    <Avatar>{{ user.name ? user.name.slice(0, 1) : "U" }}</Avatar>
    <span class="user-menu__name">
      {{
        user.name && user.name.split(" ").length > 1
          ? user.name.split(" ")[0]
          : user.name
      }}
      <CaretDownSvg />
    </span>
    <UserMenuPopup
      :opened="opened"
      @click.native.stop
      @logout="logOut"
      @close="opened = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  cursor: pointer;

  &__name {
    display: none;
    align-items: center;
    gap: 5px;
    color: var(--text-color-2);

    svg {
      margin-top: 2px;
      width: 10px;
    }

    @media screen and (min-width: $breakpoint-480) {
      display: flex;
    }
  }
}
</style>
