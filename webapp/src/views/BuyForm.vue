<script>
export default {
  name: "BuyForm",
  data() {
    return {
      form: {
        productId: null,
        amount: 1,
        code: null,
        description: null,
        unitValue: "",
      },
      errorMessage: null,
    };
  },

  methods: {
    async createProduct() {
      try {
        const { data } = await this.$service.create({
          path: "produtos",
          data: {
            code: this.form.code,
            description: this.form.description,
          },
        });
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveBuy() {
      try {
        let product = null;
        if (!this.form.productId) {
          product = await this.createProduct();
        }

        await this.$service.create({
          path: "compras",
          data: {
            ...this.form,
            productDescription: this.form.description || product.description,
            productId: this.form.productId || product._id,
          },
        });
        this.clearForm();
      } catch (error) {
        console.error(error);
      }
    },
    onCodeEnter(code) {
      this.errorMessage = null;
      if (!code) {
        this.clearForm();

        return;
      }

      this.form.code = code;
      setTimeout(() => {
        if (code === this.form.code) {
          this.getProduct();
        }
      }, 300);
    },
    async getProduct() {
      try {
        if (!this.form.code) return;
        const product = await this.$service.load({
          path: "produtos",
          id: this.form.code,
        });

        if (product) {
          this.form.productId = product._id;
          this.form.description = product.description;
        } else {
          this.clearForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
    clearForm() {
      this.form = {
        productId: null,
        amount: 1,
        code: null,
        description: null,
        unitValue: "",
      };
    },
  },
};
</script>

<template>
  <section class="buy-form">
    <div class="buy-form__form">
      <div class="buy-form__fields">
        <span class="buy-form__label">Compra</span>
        <div class="buy-form__secondary-labels">
          <span class="buy-form__label-secondary">
            Qual produto foi comprado?
          </span>
          <span class="buy-form__label-secondary">
            Busque o produto comprado pelo código ou insira um código não
            existente para adicionar novo produto.
          </span>
        </div>
        <div class="buy-form__product">
          <Input
            :value="form.code"
            type="number"
            class="buy-form__form-input"
            placeholder="Código do produto"
            @input="onCodeEnter"
          />
          <span v-if="errorMessage" class="buy-form__error">
            {{ errorMessage }}
          </span>
          <Input
            v-if="form.code"
            v-model="form.description"
            class="buy-form__form-input"
            placeholder="Descrição do produto"
            :readonly="!!form.productId"
          />
          <Input
            v-if="form.code"
            input-type="money"
            v-model="form.unitValue"
            class="buy-form__form-input"
            placeholder="Valor unitário (R$)"
          />
        </div>

        <div class="buy-form__amount">
          <span class="buy-form__label buy-form__label-chars">
            Quantidade comprada
          </span>
          <div class="buy-form__amount-counter">
            <Button
              button-type="outline"
              class="buy-form__amount-button"
              @click="form.amount > 1 ? form.amount-- : ''"
            >
              -
            </Button>
            <Input
              v-model="form.amount"
              placeholder="0"
              type="number"
              @keydown.native.enter="saveBuy"
            />
            <Button
              button-type="outline"
              class="buy-form__amount-button"
              @click="form.amount++"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Button
        :disabled="!form.code || !form.unitValue"
        class="buy-form__form-button"
        button-type="primary"
        @click="saveBuy"
      >
        Salvar compra
      </Button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.buy-form {
  height: 100%;
  display: flex;
  justify-content: center;

  @media screen and (min-width: $breakpoint-768) {
    align-items: center;
  }

  &__label,
  &__label-secondary {
    width: 100%;
    text-align: start;
    font-size: 12px;
    color: var(--text-color-1);
    padding-bottom: 10px;

    @media screen and (min-width: $breakpoint-768) {
      font-size: 14px;
    }
  }

  &__secondary-labels {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label-secondary {
    padding-bottom: 0;

    &:first-of-type {
      color: #666;
    }

    &:last-of-type {
      font-size: 11px;
    }
  }

  &__error {
    color: red;
    text-align: start;
    font-size: 11px;
  }

  &__label-chars {
    padding-top: 5px;
    padding-bottom: 0;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 6px;
    height: 100%;
    width: 80%;
    max-width: 350px;
    min-width: 200px;

    @media screen and (min-width: $breakpoint-768) {
      height: fit-content;
    }
  }

  &__fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    width: 100%;
    height: 100%;
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__form-input {
    width: 100%;
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
    justify-content: space-evenly;
    gap: 15px;

    button {
      width: 40px;
      min-width: unset;
    }

    input {
      max-width: 100px;
    }
  }

  &__form-button {
    width: 100%;
    min-width: unset;
    margin-bottom: 16px;

    @media screen and (min-width: $breakpoint-768) {
      margin: 0;
    }
  }
}
</style>
