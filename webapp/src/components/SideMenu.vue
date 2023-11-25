<script>
import HamburgerIcon from "../assets/HamburgerIcon.svg";
import SideMenuHeader from "./SideMenuHeader.vue";
import SideMenuItems from "./SideMenuItems.vue";
import storageManager from "../utils/storage-manager";

export default {
  name: "SideMenu",
  components: { HamburgerIcon, SideMenuHeader, SideMenuItems },
  data() {
    return {
      opened: false,
      user: {},
      windowWidth: 0,
    };
  },
  created() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth > 1200) this.opened = true;
  },
  mounted() {
    let user = storageManager.loadStorage("_qtc.user");
    if (typeof user === "string") user = JSON.parse(user);

    if (user) this.user = user;
  },
  watch: {
    opened(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<template>
  <div class="side-menu">
    <HamburgerIcon class="side-menu__drawer-icon" @click="opened = true" />

    <Drawer
      :opened="opened"
      :apply-backdrop="windowWidth <= 1200"
      @close="opened = false"
    >
      <SideMenuHeader :user="user" @close="opened = false" />
      <SideMenuItems
        :user="user"
        @navigate="windowWidth <= 1200 ? (opened = false) : ''"
      />
    </Drawer>
  </div>
</template>

<style lang="scss" scoped>
.side-menu {
  &__drawer-icon {
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.15);
      transition: all 0.2s ease;
    }
  }
}
</style>
