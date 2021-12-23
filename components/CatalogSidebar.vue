<template>
  <aside class="catalog-sidebar">
    <BackwardsArrow to="/" class="catalog-sidebar__link_backwards" />
    <NuxtLink to="/catalog/big-with-pocket" class="catalog-sidebar__link">
      Большие с карманом
    </NuxtLink>
    <NuxtLink to="/catalog/big-no-pocket" class="catalog-sidebar__link">
      Большие без кармана
    </NuxtLink>
    <NuxtLink to="/catalog/medium-with-pocket" class="catalog-sidebar__link">
      Средние с карманом
    </NuxtLink>
    <NuxtLink to="/catalog/medium-no-pocket" class="catalog-sidebar__link">
      Средние без кармана
    </NuxtLink>
  </aside>
</template>

<script>
import BackwardsArrow from '@/components/BackwardsArrow';
export default {
  components: { BackwardsArrow }
};
</script>

<style scoped lang="scss">
.catalog-sidebar {
  padding-left: 3.75rem;
  width: 29%;
  height: calc(100vh - 4.125rem);
  position: fixed;
  top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__link {
    font-weight: 500;
    &:not(&_backwards) {
      margin-bottom: 1.25rem;
      opacity: 0.2;
      font-size: 1.5rem;
      line-height: 117%;
      transition: opacity 0.2s ease;
    }
    &:last-child {
      margin-bottom: 6rem;
    }
    &_backwards {
      position: absolute;
      top: 0;
      left: 3.75rem;
    }
    &.nuxt-link-exact-active {
      opacity: 1;
    }
  }
}
@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .catalog-sidebar {
    display: none;
  }
}
</style>
