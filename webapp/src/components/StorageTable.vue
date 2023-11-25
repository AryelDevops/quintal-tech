<script>
import PencilIcon from "../assets/PencilIcon.svg";
export default {
  name: "StorageTable",
  components: { PencilIcon },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        { name: "productCode", label: "Código", width: 100 },
        { name: "productDescription", label: "Descrição" },
        { name: "value", label: "Estoque", width: 120 },
      ],
    };
  },
};
</script>
<template>
  <Table :columns="columns" :data="data">
    <template v-slot:table-actions="{ row }">
      <span class="storage-table__icon" @click="$emit('edit', row)">
        <PencilIcon />
      </span>
    </template>
  </Table>
</template>

<style lang="scss" scoped>
.storage-table {
  &__icon {
    cursor: pointer;
    svg {
      stroke: #838383;
      width: 26px;
    }
  }
}
</style>
