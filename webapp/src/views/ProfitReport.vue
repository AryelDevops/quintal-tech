<script>
import ProfitTable from "../components/ProfitTable.vue";

export default {
  name: "ProfitReport",
  components: { ProfitTable },
  data() {
    return {
      filter: {
        startDate: null,
        endDate: null,
      },
      results: {},
      resultsByProduct: [],
    };
  },
  mounted() {
    const today = new Date();
    const oneMonthAgo = new Date(new Date().setDate(today.getDate() - 30));
    oneMonthAgo.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);
    this.setDates(oneMonthAgo, today);
    this.loadResult();
    this.loadResultByProduct();
  },
  methods: {
    setDates(start, end) {
      this.filter.startDate = start.toISOString();
      this.filter.endDate = end.toISOString();
    },
    async loadResult() {
      try {
        const data = await this.$service.load({
          path: "lucros/resultados",
          q: {
            startDate: this.filter.startDate,
            endDate: this.filter.endDate,
          },
        });
        this.results = data;
      } catch (error) {
        console.error(error);
      }
    },
    async loadResultByProduct() {
      try {
        const data = await this.$service.load({
          path: "lucros/produtos",
          q: {
            startDate: this.filter.startDate,
            endDate: this.filter.endDate,
          },
        });
        this.resultsByProduct = data.map((result) => ({
          ...result,
          amount: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(result.amount || 0),
        }));
      } catch (error) {
        console.error(error);
      }
    },
    setManualDate(date, type) {
      if (date.length < 10) return;

      var dia = date.split("/")[0];
      var mes = date.split("/")[1];
      var ano = date.split("/")[2];

      const data = new Date(ano, mes - 1, dia, 0, 0, 0, 0);
      this.$set(
        this.filter,
        type === "start" ? "startDate" : "endDate",
        data.toISOString()
      );
      this.loadResult();
      this.loadResultByProduct();
    },
  },
};
</script>

<template>
  <section class="profit-report">
    <article class="profit-report__result">
      <span class="profit-report__label">Relatório de lucros</span>
      <div class="profit-report__filters">
        <Input
          :value="
            new Intl.DateTimeFormat('pt-BR').format(new Date(filter.startDate))
          "
          placeholder="Data início"
          @input="setManualDate($event, 'start')"
        />
        <Input
          :value="
            new Intl.DateTimeFormat('pt-BR').format(new Date(filter.endDate))
          "
          placeholder="Data fim"
          @input="setManualDate($event, 'end')"
        />
      </div>
      <div class="profit-report__result-info">
        <strong>Resultado:</strong>
        <span
          :class="
            results.result < 0
              ? 'profit-report__result-value--negative'
              : 'profit-report__result-value'
          "
        >
          {{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(results.result || 0)
          }}</span
        >
      </div>
    </article>

    <ProfitTable :data="resultsByProduct" />
  </section>
</template>

<style lang="scss" scoped>
@import "../design/breakpoints";

.profit-report {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  @media screen and (min-width: $breakpoint-768) {
    align-items: center;
  }

  &__result {
    width: 100%;
    max-width: 600px;
  }

  &__label {
    display: flex;
    width: 100%;
    align-self: baseline;
    text-align: start;
    font-size: 12px;
    color: var(--text-color-1);
    padding-bottom: 10px;

    @media screen and (min-width: $breakpoint-768) {
      font-size: 14px;
    }
  }

  &__filters {
    display: flex;
    gap: 16px;
    padding: 16px 0;

    > * {
      width: 100%;
    }
  }

  &__result-info {
    display: flex;
    gap: 24px;
    color: #333333;
    background-color: #f6f6f6;
    padding: 16px 12px;
    border-radius: 4px;
    justify-content: space-between;
  }

  &__result-value {
    color: #02a41c;
    &--negative {
      color: #e03434;
    }
  }
}
</style>
