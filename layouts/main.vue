<template>
  <fragment>
    <AppHeader :img-logo="true" />
    <Nuxt />
  </fragment>
</template>

<script>
import { cartWatcher } from '@/mixins/cartWatcher';

export default {
  mixins: [cartWatcher]
};
</script>

<style scoped lang="scss"></style>
