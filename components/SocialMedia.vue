<template>
  <div class="social-media">
    <!--    <a href="https://vk.com" target="_blank">-->
    <!--      <svg-icon name="vk" class="social-media__logo social-media__logo_vk" />-->
    <!--    </a>-->
    <a href="https://www.instagram.com/black.square.official/" target="_blank">
      <svg-icon
        name="instagram"
        class="social-media__logo social-media__logo_insta"
      />
    </a>
    <!--    <a href="https://tiktok.com" target="_blank">-->
    <!--      <svg-icon-->
    <!--        name="tiktok"-->
    <!--        class="social-media__logo social-media__logo_tiktok"-->
    <!--      />-->
    <!--    </a>-->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.social-media {
  display: flex;
  justify-content: center; //space-between
  align-items: center;
  width: 9rem;
  height: 2rem;
  &__logo {
    display: block;
    &_vk {
      width: 1.875rem;
      aspect-ratio: 12/7;
    }
    &_insta {
      width: 1.71875rem;
      aspect-ratio: 1/1;
    }
    &_tiktok {
      width: 1.625rem;
      aspect-ratio: 13/15;
    }
  }
}
</style>
