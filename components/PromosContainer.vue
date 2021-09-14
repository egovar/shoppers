<template>
  <div class="promos-container parallax" id="promos">
    <img
      v-rellax="rellax"
      src="/red-shopper-bg.jpg"
      alt=""
      class="promos-container__background parallax__background"
    />
    <div class="promos-container__content parallax__content container">
      <p class="promos-container__text">Мы можем помочь вам с выбором</p>
      <NuxtLink
        to="/catalog/compilation-freelancer"
        class="button promos-container__button"
      >
        Наши подборки
      </NuxtLink>
      <p class="promos-container__text">
        Два шопера со скидкой
        <strong class="promos-container__text_strong">25%</strong>
      </p>
      <p class="promos-container__text">
        Скидка
        <strong class="promos-container__text_strong">8%</strong>
        на последующий заказ, если вы отметите нас в инстаграмме
      </p>
    </div>
  </div>
</template>

<script>
import { rellaxConfig } from '@/utils/rellaxConfig';

export default {
  data() {
    return {
      rellax: rellaxConfig
    };
  }
};
</script>

<style scoped lang="scss">
.promos-container {
  &__text {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 117%;
    font-variant: small-caps;
    &_strong {
      font-size: 2.75rem;
      font-weight: 500;
    }
    &:first-child {
      margin-bottom: 1.25rem;
    }
  }
  &__button {
    margin-bottom: 13.125rem;
  }
}
@media (max-width: 1024px) and (orientation: portrait) {
  .promos-container {
    display: none;
  }
}
</style>
