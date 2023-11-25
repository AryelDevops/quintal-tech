<script>
export default {
  name: "UpdateStorageValue",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    storageId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      form: {
        amount: 0,
        productCode: null,
      },
    };
  },
  methods: {
    async saveUpdate() {
      try {
        await this.$service.patch({
          path: "estoque",
          id: this.form.productCode,
          data: { value: Number(this.form.amount) },
        });
        this.closeModal();
        this.$emit("update-data");
      } catch (error) {
        console.error(error);
      }
    },
    closeModal() {
      this.$emit("close");
      this.form = {
        amount: 0,
        productCode: null,
      };
    },
  },
};
</script>

<template>
  <transition name="fade">
    <div v-if="active" class="update-storage">
      <div class="update-storage__content">
        <div class="update-storage__title">Atualizar quantidade em estoque</div>
        <div class="update-storage__form">
          <Input
            v-model="form.productCode"
            type="number"
            placeholder="Código do produto"
          />

          <div class="update-storage__amount">
            <span class="update-storage__label update-storage__label-chars">
              Quantidade a adicionar/remover
            </span>
            <div class="update-storage__amount-counter">
              <Button
                button-type="outline"
                class="update-storage__amount-button"
                @click="form.amount--"
              >
                -
              </Button>
              <Input
                v-model="form.amount"
                placeholder="0"
                type="number"
                @keydown.native.enter="saveSale"
              />
              <Button
                button-type="outline"
                class="update-storage__amount-button"
                @click="form.amount++"
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <div class="update-storage__actions">
          <Button button-type="outline" @click="closeModal"> Cancelar </Button>
          <Button
            :disabled="!form.productCode || !form.amount"
            @click="saveUpdate"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.update-storage {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 7998;
  background: rgba(0, 0, 0, 0.25);

  &__title {
    text-align: start;
    font-size: 14px;
    color: #838383;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: white;
    padding: 16px;
    border-radius: 4px;
    width: 100%;
    max-width: 450px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__amount {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
  }

  &__amount-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    button {
      width: 40px;
      min-width: unset;
    }

    input {
      max-width: 100px;
    }
  }

  &__label {
    width: 100%;
    text-align: start;
    color: #333;
    padding-bottom: 10px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
  }
}
</style>
