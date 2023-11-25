<script>
export default {
  name: "Avatar",
  props: {
    invertedColors: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div class="avatar" :class="{ 'avatar--inverted': invertedColors }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary-color);
  border-radius: 100%;
  color: var(--primary-color);

  &--inverted {
    border: 2px solid white;
    color: white;
  }
}
</style>
