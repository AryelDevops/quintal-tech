<script>
export default {
  name: "SideMenuItems",
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<template>
  <nav class="side-menu-items">
    <router-link :to="{ name: 'SalesForm' }" @click.native="$emit('navigate')">
      Venda
    </router-link>
    <router-link :to="{ name: 'BuyForm' }" @click.native="$emit('navigate')">
      Compra
    </router-link>
    <router-link
      :to="{ name: 'StorageList' }"
      @click.native="$emit('navigate')"
    >
      Estoque
    </router-link>
    <router-link
      :to="{ name: 'ProfitReport' }"
      @click.native="$emit('navigate')"
    >
      Relatórios
    </router-link>
    <router-link
      :to="{ name: 'UserForm', params: { id: user._id } }"
      @click.native="$emit('navigate')"
    >
      Editar meu perfil
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.side-menu-items {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 30px;

  a {
    color: var(-text-color-3);
    text-align: start;
    border-bottom: 1px solid var(--gray-color-1);
    text-decoration: none;
    padding: 15px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--bg-color-1);
      transition: all 0.2s ease;
    }

    &:active {
      color: var(--primary-color);
    }
  }
}
</style>
