<template>
  <article
    class="shopper-card"
    @click="$router.push('/catalog/shoppers/' + shopperData.id)"
  >
    <img
      :src="'https://bs-bags.ru/' + shopperData.main_picture"
      :alt="shopperData.description"
      class="shopper-card__photo"
    />
    <div class="shopper-card__content">
      <p class="shopper-card__price p">₽ {{ shopperData.price / 100 }}</p>
      <h2 class="shopper-card__title h2">{{ shopperData.name }}</h2>
      <p class="shopper-card__description p">
        {{
          shopperData.description.length <= 250
            ? shopperData.description
            : shopperData.description.slice(0, 200) + '...'
        }}
      </p>
      <ShopperData
        :model-id="shopperData.model_id"
        :similar-colors="shopperData.similar_colors"
        :color-id="shopperData.color_id"
        ref="shopperData"
      />
      <button
        class="shopper-card__add-to-cart-button button"
        @click.stop="addToCart"
      >
        Добавить в корзину
      </button>
    </div>
    <div class="shopper-card__content_mobile">
      <h2 class="shopper-card__title h2">{{ shopperData.name }}</h2>
      <p class="shopper-card__price p">₽ {{ shopperData.price / 100 }}</p>
    </div>
  </article>
</template>

<script>
import { modelToSize } from '@/utils/modelToSize';
import { codeToColor } from '@/utils/codeToColor';
import { isMobile } from '@/mixins/isMobile';
import SocialMedia from './SocialMedia';

export default {
  components: { SocialMedia },
  mixins: [isMobile],
  props: ['shopperData'],
  data() {
    return {
      modelToSize,
      codeToColor,
      quantity: 1
    };
  },
  methods: {
    addToCart() {
      this.$store.commit('pushToCart', {
        id: this.shopperData.id,
        quantity: this.$refs.shopperData.quantity
      });
      this.$refs.shopperData.quantity = 1;
    }
  }
};
</script>

<style scoped lang="scss">
@use "~assets/style/variables";

.shopper-card {
  position: relative;
  background-color: darkgray;
  z-index: 3;
  cursor: pointer;

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(29, 31, 34, 0.9); //variables.$black
    transition: opacity 0.2s ease;

    &_mobile {
      display: none;
    }

    &:hover {
      opacity: 1;
    }

    padding: 1.25rem;
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__price {
    margin-bottom: 1.875rem;
  }

  &__title {
    margin-bottom: 1.25rem;
  }

  &__description {
    margin-bottom: 3.125rem;
  }

  &__add-to-cart-button {
    width: calc(100% - 2.5rem);
    position: absolute;
    bottom: 1.25rem;
  }

  &__title,
  &__price,
  &__description,
  &__info-grid {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .shopper-card {
    background: none;
    &__content {
      &:not(&_mobile) {
        display: none;
      }

      &_mobile {
        padding-top: 0.57142857142rem;
        position: static;
        display: block;
      }
    }

    &__photo {
      width: 100%;
      height: unset;
      aspect-ratio: 1/1;
    }

    &__title {
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 0.35714285714rem;
      text-align: center;
    }

    &__price {
      margin-bottom: 0;
      text-align: center;
    }
  }
}
</style>
