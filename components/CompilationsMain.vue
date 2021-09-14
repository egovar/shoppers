<template>
  <fragment>
    <div class="compilations container">
      <div class="compilations__controls">
        <span
          v-for="(category, index) in compilations"
          class="h2 compilations__control-item"
          :class="
            index === activeCategoryIndex
              ? 'compilations__control-item_active'
              : null
          "
          @click="activeCategoryIndex = index"
        >
          0{{ index + 1 }} {{ category.name }}
        </span>
      </div>
      <CompilationsCarousel
        class="compilations__carousel"
        :photos="compilations[activeCategoryIndex].pictures"
        :link="compilations[activeCategoryIndex].link"
      />
      <div class="compilations__text">
        <p class="p compilations__start-text">
          Вы можете положить в шопер абсолютно все, что нужно именно вам
        </p>
        <strong class="compilations__strong-text h2">кем бы вы ни были</strong>
        <p class="p compilation__description">
          {{ compilations[activeCategoryIndex].description }}
        </p>
        <NuxtLink
          :to="'/catalog/' + compilations[activeCategoryIndex].link"
          class="button compilations__button"
        >
          Перейти в каталог
        </NuxtLink>
      </div>
    </div>
    <div class="compilations compilations_mobile container">
      <h2 class="h2 compilations__title"></h2>
      <p class="compilations__subtitle"></p>
      <div class="compilations__badges">
        <button
          v-for="(category, index) in compilations"
          class="compilations__badges-item"
          @click="activeCategoryIndex = index"
          :key="category.id"
        >
          {{ category.name }}
        </button>
      </div>
      <div
        class="compilations__shoppers"
        v-for="(category, index) in compilations"
        v-show="activeCategoryIndex === index"
        :key="category.id"
      >
        <ShopperCard
          v-for="shopper in category.shoppers"
          :shopper-data="shopper"
          :key="shopper.id"
        />
      </div>
    </div>
  </fragment>
</template>

<script>
import ShopperCard from '@/components/ShopperCard';
export default {
  components: { ShopperCard },
  props: ['compilations'],
  data() {
    return {
      activeCategoryIndex: 0
    };
  }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';
.compilations {
  height: 100vh;
  padding-top: 3.125rem;
  padding-bottom: 3.125rem;
  display: flex;
  justify-content: space-between;

  &__controls {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 3.125rem;
    width: 26%;
  }

  &__control-item {
    font-weight: 500;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &_active {
      opacity: 1;
    }

    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }

  &__text {
    width: 26%;
    padding-bottom: 3.125rem;
    position: relative;
  }

  &__carousel {
    width: 44%;
    height: 100%;
    background-color: gray;
  }

  &__start-text {
    margin-bottom: 0.625rem;
  }

  &__strong-text {
    font-weight: 500;
    display: block;
    text-transform: uppercase;
    margin-bottom: 3.125rem;
  }

  &__button {
    position: absolute;
    bottom: 3.125rem;
  }

  &__description {
    max-height: 21.5rem;
    overflow: auto;
  }
  &_mobile {
    display: none;
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .compilations {
    &:not(&_mobile) {
      display: none;
    }
    &_mobile {
      display: block;
    }
    &__shoppers {
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 0.35714285714rem;
    }
    &__badges {
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      margin-right: -1.28571428571rem;
      margin-bottom: 1rem;
    }
    &__badges-item {
      display: inline-flex;
      background-color: variables.$white;
      color: variables.$black;
      font-family: variables.$Roboto;
      font-weight: 300;
      line-height: 114%;
      height: 1.42857142857rem;
      border-radius: 0.71428571428rem;
      white-space: nowrap;
      border: none;
      align-items: center;
      justify-content: center;
      padding: 0 0.75rem;
      &:not(:last-child) {
        margin-right: 0.35714285714rem;
      }
    }
  }
}
</style>
