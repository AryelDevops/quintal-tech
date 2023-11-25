<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<template>
  <div>
    <table class="table">
      <thead>
        <tr class="table__header">
          <th
            v-for="(col, index) in columns"
            :key="`${col}-${index}`"
            :style="`width: ${col.width}px`"
          >
            {{ col.label }}
          </th>
          <th
            class="table__header-actions"
            v-if="$scopedSlots['table-actions']"
          ></th>
        </tr>
      </thead>

      <tbody v-if="data.length">
        <tr v-for="(row, rowIndex) in data" :key="`${row}-${rowIndex}`">
          <td
            v-for="(rowCol, rowColIndex) in columns"
            :key="`${rowCol}-${rowColIndex}`"
          >
            <slot :name="`table-cell-${rowCol.name}`" :row="row">
              {{ row[rowCol.name] }}
            </slot>
          </td>
          <td v-if="$scopedSlots['table-actions']">
            <slot name="table-actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!data.length">Sem registros</p>
  </div>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 0;
  color: var(--text-color-2);

  &__header-actions {
    width: 35px;
  }

  tbody {
    overflow: auto;
  }

  tr {
    th,
    td {
      color: var(--text-color-2);
      text-align: start;
      height: 50px;
      padding: 4px 16px;
    }

    &:not(:first-of-type) {
      th,
      td {
        border-top: 1px solid var(--gray-color-1);
      }
    }
  }

  tr {
    &:hover {
      background-color: var(--bg-color-2);
    }
  }

  th {
    font-weight: normal;
    background-color: var(--bg-color-1);

    &:first-of-type {
      border-radius: 6px 0 0 0;
    }

    &:last-of-type {
      border-radius: 0 6px 0 0;
    }
  }
}
</style>
