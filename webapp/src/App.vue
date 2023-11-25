<script>
import AppHeader from "./components/AppHeader.vue";
import SideMenu from "./components/SideMenu.vue";
export default {
  name: "App",
  components: { AppHeader, SideMenu },
  data() {
    return {
      sideMenuOpened: false,
      windowWidth: 0,
    };
  },
  computed: {
    applyReducedWidth() {
      if (
        this.$route.name === "Home" ||
        this.$route.name === "Login" ||
        (this.$route.name === "UserForm" && !this.$route.params.id)
      )
        return false;

      return this.windowWidth > 1200 && this.sideMenuOpened;
    },
  },
  created() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth > 1200) this.sideMenuOpened = true;
  },
};
</script>

<template>
  <div class="app" id="app">
    <header
      v-if="
        ($route.name !== 'Home' &&
          $route.name !== 'Login' &&
          $route.name !== 'UserForm') ||
        ($route.name === 'UserForm' && $route.params.id)
      "
      class="app__header"
      :class="{ 'app--reduced-width': applyReducedWidth }"
    >
      <SideMenu class="app__sidemenu" @change="sideMenuOpened = $event" />
      <AppHeader />
    </header>
    <main
      class="app__main"
      :class="{ 'app--reduced-width': applyReducedWidth }"
    >
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    transition: all 0.4s ease;
  }

  &__sidemenu {
    position: absolute;
    left: 16px;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: auto;
    max-width: 1024px;
    transition: all 0.4s ease;
  }

  &--reduced-width {
    margin-left: 350px;
    width: calc(100% - 350px);
    transition: all 0.4s ease;
  }
}
</style>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;

  * {
    box-sizing: inherit;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
