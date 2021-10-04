<template>
  <div>
    <AppHeader />
    <Nuxt />
  </div>
</template>

<script>
import { cartWatcher } from '@/mixins/cartWatcher';

export default {
  mixins: [cartWatcher]
};
</script>

<style scoped lang="scss"></style>
