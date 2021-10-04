<template>
  <fragment>
    <MainScreen />
    <CompilationsMain :compilations="categories" />
    <PromosContainer />
    <Delivery />
    <Manufacture />
    <AppFooter />
  </fragment>
</template>

<script>
import { compilations } from '@/utils/compilations';
import { request } from '@/api/server';

export default {
  layout: 'main',
  async asyncData() {
    const categories = await Promise.all(
      compilations.map(async (category) => {
        const categoryShoppers = await request('/groups', {
          id: category.shoppersCode
        });
        const pictures = categoryShoppers.map(
          (shopper) => shopper.main_picture
        );
        return {
          ...category,
          pictures,
          shoppers: categoryShoppers
        };
      })
    );
    return { categories };
  },
  head() {
    return {
      title: 'Купить хлопковые шопперы с бесплатной доставкой по всей России',
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
