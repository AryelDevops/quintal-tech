<script>
export default {
  name: "ProfitTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        { name: "productDescription", label: "Descrição" },
        { name: "amount", label: "Resultado" },
      ],
    };
  },
};
</script>
<template>
  <Table class="profit-table" :columns="columns" :data="data">
    <template v-slot:table-cell-amount="{ row }">
      <span
        :class="
          row.amount >= 0
            ? 'profit-table__amount'
            : 'profit-table__amount--negative'
        "
      >
        {{ row.amount }}
      </span>
    </template>
  </Table>
</template>

<style lang="scss" scoped>
.profit-table {
  width: 100%;
  max-width: 600px;

  &__amount {
    color: #02a41c;

    &--negative {
      color: #e03434;
    }
  }
}
</style>
