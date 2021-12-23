<template>
  <div class="promos-container parallax" id="promos">
    <img
      v-rellax="rellax"
      src="/red-shopper-bg.jpg"
      ref="parallax"
      alt=""
      class="promos-container__background parallax__background"
    />
    <div class="promos-container__content parallax__content container">
      <p class="promos-container__text">Мы можем помочь вам с выбором</p>
      <NuxtLink to="/test" class="button promos-container__button">
        Пройти тест
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
      rellax: undefined
    };
  },
  mounted() {
    if (this.$refs.parallax.complete) this.rellax = rellaxConfig;
    else this.$refs.parallax.onload = () => (this.rellax = rellaxConfig);
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
@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .promos-container {
    display: none;
  }
}
</style>
