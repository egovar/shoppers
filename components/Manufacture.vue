<template>
  <div class="manufacture">
    <div class="manufacture__container container">
      <h2 class="h2 manufacture__header">Производство</h2>
      <p class="p manufacture__text">
        Мы не перепродаем чужие товары. Мы шьем их сами, ведь это основа нашей
        компании. Только со своим производством и сотрудниками мы можем
        гарантировать высокое качество нашей продукции.
      </p>

      <p class="p manufacture__text">
        Все изделия выполнены из высококачественного материала с содержанием
        хлопка более 70%.
      </p>

      <p class="p manufacture__text">
        Принты нанесены самым надежным способом - термотрансферным тепловым
        переносом. Каждый принт вырезается на пленке специальным режущим
        инструментом американского производства, после чего переносится на
        ткань. Время переноса - 60 секунд, температура переноса - 155 градусов.
      </p>

      <p class="p manufacture__text">
        Мы используем самую тонкую и качественную пленку корейского и
        французского производства. Испортить её и оторвать от ткани невозможно,
        даже если сильно постараться.
      </p>

      <p class="p manufacture__text">
        Перед отправкой изделия проверяются вручную: качество нанесения принта,
        качество выполненных швов и наличие каких-либо дефектов.
      </p>

    </div>
    <SocialMedia class="manufacture__social-media" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.manufacture {
  background-image: url('/black-shopper-bg.png');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 150%;
  background-position: 30% 100%;
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
  position: relative;

  &__header {
    text-transform: uppercase;
    margin-bottom: 3.125rem;
  }

  &__text {
    width: 28%;
    margin-bottom: 2.25rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    max-height: 31.25rem;
  }

  &__social-media {
    position: absolute;
    bottom: 3.125rem;
    right: 3.125rem;
  }
}
@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .manufacture {
    //background-attachment: unset;
    background-position: 50% 50%;
    background-size: auto 100%;
    background-clip: padding-box;
    padding-top: 1rem;
    padding-bottom: 0;
    &__header {
      margin-bottom: 1.42857142857rem;
    }
    &__container {
      max-height: unset;
      padding-bottom: 2rem;
    }
    &__text {
      width: 100%;
      margin-bottom: 1.28571428571rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__social-media {
      height: calc(2rem + 3.57142857143rem);
      position: unset;
      width: 100%;
      right: unset;
      padding-bottom: 3.57142857143rem;
    }
  }
}
</style>
