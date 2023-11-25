<script>
import VueNumeric from "vue-numeric";

export default {
  name: "Input",
  components: { VueNumeric },
  props: {
    value: {
      type: [String, Number],
      default: () => "",
    },
    inputType: {
      type: String,
      default: () => "input",
      validator: (val) => {
        return ["input", "textarea", "money"].includes(val);
      },
    },
    type: {
      type: String,
      default: () => "text",
    },
    placeholder: {
      type: String,
      default: () => "Input",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
    };
  },
};
</script>

<template>
  <input
    v-bind="$attrs"
    v-if="inputType === 'input'"
    class="input"
    :class="{ 'input--error': error }"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @input="({ target }) => $emit('input', target.value)"
    @blur="$emit('blur')"
  />
  <vue-numeric
    v-else-if="inputType === 'money'"
    class="input"
    :value="value"
    currency="R$"
    separator="."
    :minus="false"
    :precision="2"
    :placeholder="placeholder"
    @input="$emit('input', $event)"
  ></vue-numeric>
  <textarea
    v-bind="$attrs"
    v-else-if="inputType === 'textarea'"
    class="textarea"
    :class="{ 'input--error': error }"
    :value="value"
    :placeholder="placeholder"
    spellcheck="false"
    @input="({ target }) => $emit('input', target.value)"
    @blur="$emit('blur')"
  />
</template>

<style lang="scss" scoped>
input[type="number"] {
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
  }
}

.input,
.textarea {
  will-change: color;
  outline: none;
  padding: 12px 10px;
  border-radius: 6px;
  border: none;
  background-color: #f3f3f3;
  color: #666;
  transition:
    color 0.2s ease,
    border 0.2s ease;

  &::placeholder {
    color: #999;
  }

  &:hover {
    color: #666;
    border-color: #d0d0d0;
  }

  &:focus {
    color: #333;
    border-color: #d0d0d0;
  }

  &--error {
    border-color: red;
  }
}

textarea {
  resize: none;
}
</style>
