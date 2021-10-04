<template>
  <fragment>
    <header
      class="header container"
      :class="imgLogo ? 'header_absolute' : null"
    >
      <NuxtLink to="/">
        <svg-icon v-if="imgLogo" name="logo" class="logo" />
        <h1 v-else class="h1 title">Black square</h1>
      </NuxtLink>
      <nav class="navigation">
        <NuxtLink
          to="/catalog/big-no-pocket"
          class="header__link header__link_catalog"
        >
          Каталог
        </NuxtLink>
        <span class="header__link" @click="toPromos()"> Акции </span>
        <!-- Костыль -->
      </nav>
      <div class="cart">
        <NuxtLink to="/cart" class="header__link">
          <span class="cart-label">Корзина</span>
          ({{ this.$store.getters.cartLength }})
        </NuxtLink>
      </div>
    </header>
    <header class="header header_mobile container">
      <button
        class="header__burger-button"
        :class="menuOpened ? 'header__burger-button_active' : null"
        @click="menuOpened = !menuOpened"
      >
        <svg-icon name="burger-menu" class="icon" />
      </button>
      <NuxtLink to="/">
        <h1 class="h1">Black square</h1>
      </NuxtLink>
      <div class="cart__wrapper">
        <NuxtLink to="/cart" class="header__cart-link">
          <svg-icon name="cart" class="icon" />
        </NuxtLink>
      </div>
    </header>
    <div
      class="header__menu container"
      :class="menuOpened ? 'header__menu_active' : null"
    >
      <NuxtLink
        to="/catalog/"
        class="header__menu-link header__menu-link_primary"
      >
        Все шоперы
      </NuxtLink>
      <NuxtLink
        to="/catalog/compilation-lady"
        class="header__menu-link header__menu-link_primary"
      >
        Домашняя леди
      </NuxtLink>
      <NuxtLink
        to="/catalog/compilation-student"
        class="header__menu-link header__menu-link_primary"
      >
        Занятой студент
      </NuxtLink>
      <NuxtLink
        to="/catalog/compilation-businessman"
        class="header__menu-link header__menu-link_primary"
      >
        Крутой бизнесмен
      </NuxtLink>
      <NuxtLink
        to="/catalog/compilation-freelancer"
        class="header__menu-link header__menu-link_primary"
      >
        Деятельный фрилансер
      </NuxtLink>
      <NuxtLink
        to="/catalog/big-with-pocket"
        class="header__menu-link header__menu-link_primary"
      >
        Большие с карманом
      </NuxtLink>
      <NuxtLink
        to="/catalog/big-no-pocket"
        class="header__menu-link header__menu-link_primary"
      >
        Большие без кармана
      </NuxtLink>
      <NuxtLink
        to="/catalog/medium-with-pocket"
        class="header__menu-link header__menu-link_primary"
      >
        Средние с карманом
      </NuxtLink>
      <NuxtLink
        to="/catalog/medium-no-pocket"
        class="header__menu-link header__menu-link_primary"
      >
        Средние без кармана
      </NuxtLink>
      <NuxtLink
        to="/"
        class="
          header__menu-link header__menu-link_primary header__menu-link_about-us
        "
      >
        О нас
      </NuxtLink>
      <NuxtLink
        to="/test/"
        class="
          header__menu-link header__menu-link_primary header__menu-link_test
        "
      >
        Тест
      </NuxtLink>
      <NuxtLink to="/delivery_rules" class="header__menu-link">
        Правила доставки товара
      </NuxtLink>
      <NuxtLink to="/refund_policy" class="header__menu-link">
        Правила возврата товара
      </NuxtLink>
      <NuxtLink to="/contacts" class="header__menu-link">
        Контактная информация
      </NuxtLink>
      <NuxtLink to="/payment_rules" class="header__menu-link">
        Правила оплаты
      </NuxtLink>
    </div>
  </fragment>
</template>

<script>
function scrollToPromos() {
  window.scrollTo(
    0,
    document.getElementById('promos').getBoundingClientRect().top
  );
}

export default {
  props: ['imgLogo'],
  data() {
    return {
      menuOpened: false
    };
  },
  methods: {
    async toPromos() {
      await this.$router.push('/');
      const promos = document.getElementById('promos');
      if (promos) scrollToPromos();
      else setTimeout(() => scrollToPromos(), 500);
    }
  },
  watch: {
    $route() {
      this.menuOpened = false;
    }
  }
};
</script>

<style scoped lang="scss">
@use "~assets/style/variables";

.header {
  z-index: 15;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 0.625rem;
  padding-bottom: 1.875rem;

  &__menu {
    display: none;
  }

  &__link {
    font-family: variables.$Montserrat;
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: uppercase;
    display: block;
    white-space: nowrap;
    cursor: pointer;

    &_catalog {
      margin-right: 1.25rem;
    }
  }

  .logo {
    width: 7.5rem;
    height: 4.875rem;
  }

  .title {
    white-space: nowrap;
    padding-top: 1.25rem;
  }

  .navigation {
    padding-top: 2.0625rem;
    margin: 0 6.25rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .cart {
    padding-top: 2.0625rem;
  }

  &_absolute {
    position: absolute;
  }

  &:not(&_absolute) {
    background-color: variables.$black;
  }

  &_mobile {
    display: none;
  }
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .header {
    &:not(&_mobile) {
      display: none;
    }

    &_mobile {
      height: 6rem !important;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.78571428571rem;
      padding-top: 2.14285714286rem;
      background-color: variables.$black;
    }

    &__burger-button {
      background: none;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
      height: 1.42857142857rem !important;
      padding: 0;
      width: 2rem;
      &_active {
        transform: rotate(90deg);
      }

      > .icon {
        width: 2rem;
        height: 1.42857142857rem !important;
        aspect-ratio: 1/1;
      }
    }

    &__cart-link {
      > .icon {
        width: 1.71428571429rem;
        height: 2rem;
        aspect-ratio: 8/9 !important;
      }
      height: 2rem !important;
    }

    &__menu {
      height: 100vh;
      width: 100vw;
      overflow: auto;
      padding-top: 6.36rem;
      background-color: variables.$black;
      z-index: 5;
      position: fixed;
      top: 0;
      left: -100vw;
      transition: transform 0.2s ease;
      display: flex;
      flex-direction: column;

      &_active {
        transform: translateX(100vw);
      }
    }

    &__menu-link {
      margin-bottom: 0.71428571428rem;
      font-weight: 300;
      &_primary {
        margin-bottom: 1.42857142857rem;
        font-variant: small-caps;
        font-weight: 500;
      }
      &_about-us {
        margin-top: 3.57142857143rem;
      }
      &_test {
        margin-bottom: 3.57142857143rem;
      }
    }
  }

  .cart-wrapper {
    height: 2rem;
  }
}
</style>
