<script>
export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    applyBackdrop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <transition name="slide">
    <div v-if="opened" class="drawer">
      <div
        v-if="applyBackdrop"
        class="drawer__backdrop"
        @click="$emit('close')"
      />
      <section class="drawer__content">
        <slot />
      </section>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "../../design/breakpoints";

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter,
.slide-leave-to {
  .drawer__backdrop {
    opacity: 0;
  }

  .drawer__content {
    transform: translateX(-100%);
  }
}

.drawer {
  &__content {
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    height: 100%;
    background-color: white;
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.15);
    transition: all 0.4s ease;
    z-index: 9998;

    @media screen and (min-width: $breakpoint-768) {
      width: 300px;
    }

    @media screen and (min-width: $breakpoint-1024) {
      width: 350px;
    }
  }

  &__backdrop {
    position: fixed;
    background: #000;
    opacity: 0.25;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9997;
    transition: all 0.4s ease;
  }
}
</style>
