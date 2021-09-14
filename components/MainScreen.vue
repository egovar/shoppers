<template>
  <fragment>
    <div class="main-screen parallax">
      <img
        v-rellax="rellax"
        src="/blue-shopper-bg.jpg"
        alt=""
        class="main-screen__background parallax__background"
      />
      <div class="main-screen__content container parallax__content">
        <h1 class="h1 main-screen__header">Black square</h1>
        <div class="main-screen__subheader subheader">
          <span class="subheader__item">Экологичная замена пакетам</span>
          <span class="subheader__item">Ручной пошив высокого качества</span>
          <span class="subheader__item"
            >Премиальная ткань высокой плотности</span
          >
          <span class="subheader__item">Уникальные дизайнерские принты</span>
        </div>
        <SocialMedia class="main-screen__social-media" />
      </div>
    </div>
    <div class="main-screen main-screen_mobile">Мобильная карусель</div>
  </fragment>
</template>

<script>
import { rellaxConfig } from '~/utils/rellaxConfig';

export default {
  data() {
    return {
      rellax: rellaxConfig
    };
  }
};
</script>

<style scoped lang="scss">
.main-screen {
  &__header {
    width: 100%;
    text-align: center;
    margin-bottom: 1.25rem;
  }

  &__subheader {
    display: flex;
    justify-content: center;

    .subheader__item {
      font-size: 0.875rem;

      &:not(:last-child) {
        margin-right: 3.125rem;
      }
    }
  }

  &__social-media {
    position: absolute;
    bottom: 3.125rem;
    left: 3.75rem;
  }

  &_mobile {
    display: none;
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .main-screen {
    &:not(&_mobile) {
      display: none;
    }

    &_mobile {
      margin-top: 6.36rem; //header height
      display: block;
      width: 100%;
      aspect-ratio: 15/11;
    }
  }
}
</style>
