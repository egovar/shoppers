<template>
  <div class="container delivery">
    <div class="delivery__for-customers">
      <h2 class="h2 delivery__header">Доставка</h2>
      <p class="p delivery__text">
        Не переживайте о доставке. Вы можете заказать наше изделие в
        <strong class="delivery__strong">любую точку России</strong> бесплатно и
        забрать его в удобном для Вас пункте самовывоза . Мы ценим Ваше время,
        поэтому в 38 городах России доставка будет курьерской - прямо до двери
        Вашей квартиры.
      </p>
    </div>
    <p class="delivery__cities p" id="cities">
      <span v-for="city in cities1">{{ city }}</span>
    </p>
    <p class="delivery__cities p">
      <span v-for="city in cities2">{{ city }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities1: [
        'Москва',
        'Санкт-Петербург',
        'Казань',
        'Нижний Новгород',
        'Самара',
        'Ростов-на-дону',
        'Уфа',
        'Воронеж',
        'Пермь',
        'Волгоград',
        'Краснодар',
        'Саратов',
        'Тюмень',
        'Ижевск',
        'Ульяновск',
        'Ярославль',
        'Рязань',
        'Кострома',
        'Великий Новгород'
      ],
      cities2: [
        'Астрахань',
        'Пенза',
        'Липецк',
        'Чебоксары',
        'Тула',
        'Ставрополь',
        'Курск',
        'Сочи',
        'Тверь',
        'Иваново',
        'Брянск',
        'Белгород',
        'Владимир',
        'Калуга',
        'Саранск',
        'Череповец',
        'Вологда',
        'Орел',
        'Тамбов'
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.delivery {
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
  display: flex;
  &__for-customers {
    width: 28%;
    margin-right: 6.25rem;
  }

  &__text {
    width: 100%;
  }

  &__strong {
    font-size: 1.5rem;
    line-height: 117%;
    font-weight: 500;
  }

  &__header {
    text-transform: uppercase;
    margin-bottom: 3.125rem;
  }
  &__cities {
    display: flex;
    flex-direction: column;
    width: 13rem;
  }
}
@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .delivery {
    flex-wrap: wrap;
    padding-top: 0;
    padding-bottom: 2.14285714286rem;
    &__header {
      margin-bottom: 1.42857142857rem;
    }
    &__text {
      margin-bottom: 1.42857142857rem;
    }
    &__for-customers {
      width: 100%;
      margin-right: 0;
    }
    &__cities {
      width: 50%;
    }
  }
}
</style>
