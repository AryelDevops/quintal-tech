<script>
export default {
  name: "SalesForm",
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
    async saveSale() {
      try {
        await this.$service.create({
          path: "vendas",
          data: {
            ...this.form,
            productDescription: this.form.description,
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
          this.errorMessage = "Produto não encontrado";
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
  <section class="sales-form">
    <div class="sales-form__form">
      <div class="sales-form__fields">
        <span class="sales-form__label">Venda</span>
        <div class="sales-form__secondary-labels">
          <span class="sales-form__label-secondary">
            Para qual produto a venda foi registrada?
          </span>
          <span class="sales-form__label-secondary">
            Insira o produto vendido pelo código.
          </span>
        </div>
        <div class="sales-form__product">
          <Input
            :value="form.code"
            type="number"
            class="sales-form__form-input"
            placeholder="Código do produto"
            @input="onCodeEnter"
          />
          <span v-if="errorMessage" class="sales-form__error">
            {{ errorMessage }}
          </span>
          <Input
            v-if="form.description"
            :value="form.description"
            class="sales-form__form-input"
            placeholder="Descrição do produto"
            readonly
          />
          <Input
            v-if="form.description"
            input-type="money"
            v-model="form.unitValue"
            class="sales-form__form-input"
            placeholder="Valor unitário (R$)"
          />
        </div>

        <div class="sales-form__amount">
          <span class="sales-form__label sales-form__label-chars">
            Quantidade vendida
          </span>
          <div class="sales-form__amount-counter">
            <Button
              button-type="outline"
              class="sales-form__amount-button"
              @click="form.amount > 1 ? form.amount-- : ''"
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
              class="sales-form__amount-button"
              @click="form.amount++"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Button
        :disabled="!form.code || !form.unitValue"
        class="sales-form__form-button"
        button-type="primary"
        @click="saveSale"
      >
        Salvar venda
      </Button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.sales-form {
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
