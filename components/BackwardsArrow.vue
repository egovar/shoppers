<template>
  <NuxtLink :to="to" class="backwards-arrow">
    <svg-icon name="nav-backwards" class="icon" />
    Назад
  </NuxtLink>
</template>

<script>
export default {
  props: ['to']
};
</script>

<style scoped lang="scss">
.backwards-arrow {
  font-size: 0.875rem;
  line-height: 121%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  .icon {
    height: 0.5rem;
    width: 1.25rem;
    margin-right: 0.625rem;
  }
}
</style>
