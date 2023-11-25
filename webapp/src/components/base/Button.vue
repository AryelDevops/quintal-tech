<script>
export default {
  name: "Button",
  props: {
    bgColor: {
      type: String,
      default: () => "",
    },
    textColor: {
      type: String,
      default: () => "",
    },
    size: {
      type: String,
      default: () => "md",
      validator: (value) => {
        return ["md", "lg"].includes(value);
      },
    },
    buttonType: {
      type: String,
      default: () => "primary",
      validator: (value) => {
        return ["primary", "outline"].includes(value);
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <button
    class="button"
    :style="`background-color: ${bgColor}; color: ${textColor}`"
    :class="{
      'button--lg': size === 'lg',
      'button--outline': buttonType === 'outline',
      'button--rounded': rounded,
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import "../../design/breakpoints";

.button {
  will-change: background-color, color;
  background-color: var(--primary-color);
  color: white;
  outline: none;
  border: none;
  min-width: 150px;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover,
  &:focus-within {
    &:not([disabled]) {
      background-color: darken(#9d4edd, 10%);
      box-shadow: 3px 3px 6px #00000029;
      transition: all 0.2s ease;
    }
  }

  &--rounded {
    border-radius: 24px;
  }

  &--lg {
    padding: 18px 24px;
    font-size: 20px;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--outline {
    background-color: transparent;
    color: var(--primary-color);
    padding: 8px 15px;
    border: 1px solid var(--primary-color);

    &:hover,
    &:focus-within {
      &:not([disabled]) {
        background-color: transparent;
        color: white;
        background-color: var(--primary-color);
        box-shadow: none;
      }
    }
  }

  @media screen and (min-width: $breakpoint-1024) {
    font-size: 16px;
  }
}
</style>
