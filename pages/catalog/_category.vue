<template>
  <main class="catalog__content shoppers">
    <div class="shoppers__top compilations">
      <h2 class="h2 compilations__header">
        Шоперы из нашей персональной подборки
      </h2>
      <p class="compilations__subheader p">Специально для вас</p>
      <div class="compilations__grid">
        <NuxtLink
          v-for="category in compilations"
          class="compilations__grid-link h2"
          :to="'/catalog/' + category.link"
          :key="category.link"
        >
          {{ category.name }}
        </NuxtLink>
      </div>
    </div>
    <h2 class="h2 compilations__header mobile" v-if="isMobile">
      {{ categoryName }}
    </h2>
    <ShopperCard
      v-for="shopper in shoppers"
      :shopper-data="shopper"
      class="shoppers__card"
      :key="shopper.id"
    />
    <SocialMedia class="compilations__social-media mobile" />
  </main>
</template>

<script>
import { compilations } from '@/utils/compilations';
import { request } from '@/api/server';
import { routeToModel } from '@/utils/routeToCode';
import { isMobile } from '../../mixins/isMobile';
import SocialMedia from '../../components/SocialMedia';

async function getShoppers(parameters) {
  let shoppers;
  let categoryName;
  if (!parameters.category) {
    shoppers = await request('/get_all');
    categoryName = 'Все шоперы';
  } else if (parameters.category.startsWith('compilation')) {
    const categoryData = compilations.find(
      ({ link }) => link === parameters.category
    );
    const id = categoryData.shoppersCode;
    shoppers = await request('/groups', {
      id
    });
    categoryName = categoryData.name; // Используй только это слово, название подборки с цифрой не пиши
  } else {
    shoppers = await request('/get_by_model', {
      id: routeToModel[parameters.category]
    });
    switch (parameters.category) {
      case 'big-no-pocket':
        categoryName = 'Большие без кармана';
        break;
      case 'big-with-pocket':
        categoryName = 'Большие с карманом';
        break;
      case 'medium-no-pocket':
        categoryName = 'Средние без кармана';
        break;
      default:
        categoryName = 'Средние с карманом';
    } // Используй только это слово, какой это шопер потом определю
  }
  return { shoppers, categoryName };
}

export default {
  components: { SocialMedia },
  layout: 'catalog',
  mixins: [isMobile],
  data() {
    return {
      compilations
    };
  },
  async asyncData({ params }) {
    return await getShoppers(params);
  },
  watch: {
    async '$route.params.category'(newValue) {
      this.shoppers = await getShoppers(newValue);
    }
  },
  head() {
    return {
      title: 'Хлопковые шопперы с бесплатной доставкой по всей России',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Купить шопперы от производителя! В наличии с принтом и без, разные цвета и модели. Высокая плотность ткани! Экологичные, удобные сумки легко располагаются на плече, на сгибе руки в локте или простой в руках. Идеально подходит для шоппинга, похода на пляж, в тренажерный зал и для прогулок с детьми'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.mobile {
  display: none;
}

.shoppers {
  top: 6rem;
  margin-left: 29%;
  width: 71%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 6rem;
  padding-right: 3.75rem;

  &__card {
    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      width: 43.82%;
      aspect-ratio: 415/519;
    }

    &:nth-child(4n + 3),
    &:nth-child(4n) {
      width: 54.59%;
      aspect-ratio: 1/1;
    }

    &:not(:nth-last-child(-n + 2)) {
      margin-bottom: 1rem;
    }
  }
}
.compilations {
  width: 100%;
  padding: 5.75rem 6.625rem;
  height: 22.5rem;
  background: linear-gradient(rgba(29, 31, 34, 0.9), rgba(29, 31, 34, 0.9)),
    url('~/static/compilations-bg.png');
  margin-bottom: 1rem;
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
    gap: 1.25rem 12.5rem;
  }
  &__grid-link {
    opacity: 0.2;
    &.nuxt-link-exact-active {
      opacity: 1;
    }
  }
  &__header,
  &__subheader {
    text-align: center;
  }

  &__header {
    margin-bottom: 0.625rem;
  }
  &__subheader {
    margin-bottom: 3.125rem;
  }
}
@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .mobile {
    display: block;
  }

  .shoppers {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 0.35714285714rem;
    width: auto;
    margin-left: 0;
    padding-right: 1.28571428571rem;
    padding-left: 1.28571428571rem;
    &__card {
      width: 100% !important;
    }
  }
  .compilations {
    display: none;
    &__header {
      grid-column-start: 1;
      grid-column-end: 3;
      margin-bottom: 1.78571428571rem;
    }
    &__social-media {
      display: flex;
      margin: 2rem auto 3.57142857143rem;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
}
</style>
