<script>
import StorageTable from "../components/StorageTable.vue";
import UpdateStorageValue from "../components/UpdateStorageValue.vue";

export default {
  name: "StorageList",
  components: { StorageTable, UpdateStorageValue },
  data() {
    return {
      data: [],
      updateStorageVisible: false,
      storageOnUpdate: null,
    };
  },
  mounted() {
    this.loadStorages();
  },
  methods: {
    async loadStorages() {
      try {
        const data = await this.$service.load({
          path: "estoque",
          limit: 10,
        });
        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
    editStorage(row) {
      this.updateStorageVisible = true;
      this.storageOnUpdate = row._id;
    },
  },
};
</script>

<template>
  <div class="storage-list">
    <StorageTable :data="data" @edit="editStorage" />
    <UpdateStorageValue
      :active="updateStorageVisible"
      :storage-id="storageOnUpdate"
      @close="
        updateStorageVisible = false;
        storageOnUpdate = null;
      "
      @update-data="loadStorages"
    />
  </div>
</template>

<style scoped lang="scss">
.storage-list {
  height: calc(100% - 60px);
  margin-top: 60px;
  overflow: auto;
}
</style>
