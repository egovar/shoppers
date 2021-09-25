<template>
  <div>
    <AppHeader />
    <Nuxt />
  </div>
</template>

<script>
import { cartWatcher } from '@/mixins/cartWatcher';

export default {
  mixins: [cartWatcher],
  head() {
    return {
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=e0be6269-d3de-4a7c-a771-207574ce012c&lang=ru_RU&ver=4.9.7'
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js'
        },
        {
          src: 'https://api.b2cpl.ru/files/outside/b2c-map-pvz.min.js',
          'data-pvz-array': '2074fbe6-e033-4402-a9e1-696d82b7d50d.json'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss"></style>
