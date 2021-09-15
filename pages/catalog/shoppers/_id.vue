<template>
  <main class="shopper container">
    <SocialMedia class='shopper__social-media mobile'/>
    <div class="shopper__info">
      <BackwardsArrow
        to="/catalog/big-with-pocket"
        class="shopper__backwards-arrow"
      />
      <p class="shopper__price p">₽ {{ shopperData.price / 100 }}</p>
      <h2 class="shopper__title h2">{{ shopperData.name }}</h2>
      <p class="shopper__description p">{{ shopperData.description }}</p>
      <ShopperData
        :color-id="shopperData.color_id"
        :model-id="shopperData.model_id"
        :similar-colors="shopperData.similar_colors"
        ref="data"
        class="shopper__info-grid"
      />
      <button class="button shopper__add-to-cart-button" @click="addToCart">
        Добавить в корзину
      </button>

    </div>
    <ShopperCarousel
      :photos="shopperData.pictures"
      :style="{ background: codeToColor[shopperData.color_id] }"
    />

  </main>
</template>

<script>
import { request } from '@/api/server';
import { codeToColor } from '@/utils/codeToColor';
import ShopperData from '@/components/ShopperData';
import SocialMedia from '../../../components/SocialMedia';

async function getShopper(parameters) {
  return {
    shopperData: await request('/get', { id: parseInt(parameters.id) })
  };
}
export default {
  components: { SocialMedia },
  data() {
    return {
      codeToColor
    };
  },
  async asyncData({ params }) {
    return await getShopper(params);
  },
  watch: {
    async '$route.params.id'(newValue) {
      console.log(newValue);
      this.shopperData = await getShopper(newValue);
    }
  },
  methods: {
    addToCart() {
      this.$store.commit('pushToCart', {
        id: this.shopperData.id,
        quantity: this.$refs.data.quantity
      });
      this.$refs.data.quantity = 1;
    }
  }
};
</script>

<style scoped lang="scss">
.mobile{
  display: none;
}

.shopper {
  height: 100vh;
  padding-top: calc(6rem + 0.875rem * 1.21);
  padding-bottom: 1.875rem;
  display: flex;
  justify-content: space-between;
  &__info {
    width: 30%;
    padding-right: 3.125rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 1.75rem;
    position: relative;
  }
  &__info-grid {
    margin-bottom: 3.125rem;
  }
  &__description {
    overflow: auto;
    margin-bottom: 1.25rem;
    margin-right: -0.5rem;
    padding-right: 0.5rem;
  }
  &__title {
    margin-bottom: 1.25rem;
  }
  &__price {
    margin-top: calc(0.875rem * 1.21 + 1.25rem);
    margin-bottom: 3.125rem;
  }
  &__backwards-arrow {
    position: absolute;
    top: 0;
  }
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .mobile{
    display: flex;
  }
  .shopper {
    flex-direction: column-reverse;
    height: unset;
    &__info {
      width: 100%;
    }
    &__backwards-arrow {
      display: none;
    }
    &__social-media{
      margin: 3.57142857143rem auto 0;
    }
  }
}
</style>
