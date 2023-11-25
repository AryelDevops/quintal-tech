<script>
export default {
  name: "UserMenuPopup",
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    window.addEventListener("click", this.handleClick);
  },
  destroyed() {
    window.addEventListener("click", this.handleClick);
  },
  methods: {
    handleClick(e) {
      if (!this.opened) return;
      if (
        e &&
        e.composedPath() &&
        (e.composedPath().includes(this.$el) ||
          e.composedPath().includes(this.$el.parentNode))
      )
        return;

      this.$emit("close");
    },
  },
};
</script>

<template>
  <transition name="fade">
    <div v-if="opened" class="user-menu-popup" @click="$emit('logout')">
      Deslogar
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.user-menu-popup {
  will-change: background-color, opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -50px;
  width: 150px;
  height: 40px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 6px #00000029;
  color: var(--text-color-2);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-color-1);
    transition: all 0.2s ease;
  }
}
</style>
