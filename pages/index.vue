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
  }
};
</script>
