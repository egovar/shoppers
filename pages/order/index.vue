<template>
  <main class="order container">
    <div class="order__inputs">
      <BackwardsArrow to="/cart" class="order__backwards" />
      <input class="order__input input" placeholder="ФИО" />
      <input class="order__input input" placeholder="Телефон" />
      <div class="input-with-text-wrapper">
        <input
          class="order__input order__input_with-text input"
          placeholder="Email"
        />
        <span class="order__is-place-ok h2 desktop">
          Ваш город находится в зоне доставки
        </span>
      </div>
      <input
        class="order__input order__input_address input"
        placeholder="Введите адрес"
      />
      <div class="order__map" id="order__map"></div>
      <span class="order__is-place-ok h2">
          Ваш город находится в зоне доставки
        </span>
    </div>
    <div class="order__summary">
      <p class="p order__sum-label">Сумма заказа:</p>
      <p class="h2 order__sum">₽ {{ orderSum }}</p>
      <p class="order__payment-methods-label p">Оплата:</p>
      <div class="order__payment-methods">
        <div class="payment-method payment-method_card payment-method_selected">
          <svg-icon name="credit-card" class="icon" />
        </div>
      </div>
      <a :href="link" class="order__payment-button button">
        Перейти к оплате
      </a>
    </div>
    <div class='order__social-media'>
      <SocialMedia class='order__media-buttons'/>
    </div>
  </main>

</template>

<script>
import { request } from '@/api/server';
import { modelToSize } from '@/utils/modelToSize';

export default {
  data() {
    return {
      link: undefined,
      cart: []
    };
  },
  computed: {
    orderSum() {
      let sum = 0;
      this.cart.forEach(({ price, quantity }) => (sum += price * quantity));
      return sum / 100;
    }
  },
  async mounted() {
    ymaps.ready(() =>
      b2cMapper({
        containerId: 'order__map',
        searchControl: true
        // containerHeight: '100%'
      })
    );
    this.cart = await Promise.all(
      this.$store.getters.cart.map(async (shopper) => {
        const shopperData = await request('/get', {
          id: shopper.id
        });
        return {
          id: shopper.id,
          price: shopperData.price,
          quantity: shopper.quantity
        };
      })
    );
    this.link = 'https://alfabank.ru/';
  },
  head() {
    return {
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js'
        },
        {
          src: 'https://api.b2cpl.ru/files/outside/b2c-map-pvz.min.js',
          'data-pvz-array': '2074fbe6-e033-4402-a9e1-696d82b7d50d.json'
        },
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=e0be6269-d3de-4a7c-a771-207574ce012c&lang=ru_RU&ver=4.9.7'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.b2cpl.ru/files/outside/b2c-map-pvz.min.css'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';

.order {
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 6rem;
  padding-bottom: 3.875rem;

  &__social-media{
    display: none
  }

  &__inputs {
    width: 73%;
    display: flex;
    flex-direction: column;
  }

  &__backwards {
    margin-bottom: 1.875rem;
  }

  &__input {
    width: 40%;
    margin-bottom: 1.25rem;

    &_address {
      width: 100%;
    }

    &_with-text {
      margin-right: 0;
    }
  }

  &__is-place-ok {
    color: white;
    text-transform: uppercase;
    opacity: 0;
  }

  &__map {
    width: 100%;
    background-color: steelblue;
    flex-grow: 10;
  }

  .input-with-text-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__summary {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }

  &__sum {
    font-weight: 500;
    margin-top: 0.625rem;
  }

  &__payment-button {
    margin-top: 6.25rem;
  }

  &__payment-methods {
    display: flex;
    margin-top: 0.625rem;
  }

  &__payment-methods-label {
    margin-top: 3.125rem;
  }

  .payment-method {
    width: 3.125rem;
    height: 3.125rem;
    border: 1px solid variables.$white;
    padding: 0.25rem;
    cursor: pointer;

    .icon {
      width: 2.5rem;
      height: 2.5rem;
    }

    &_selected {
      background-color: rgba(70, 75, 77, 1);
    }
  }
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px){
  .desktop{
    display: none;
  }

  .order{
    display: block;
    padding-top: 6.5rem;
    height: unset;
    &__payment-methods{
      margin-bottom: 2.85714285714rem;
    }

    &__media-buttons{
      margin: auto;
    }

    &__social-media{
      display: block;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 1.5rem;
    }

    &__payment-button {
      margin: 0 auto 3.57142857143rem;
    }

    &__backwards{
      display: none;
    }
    &__is-place-ok{
      text-align: center;
      margin-top: 1.42857142857rem;
      margin-bottom: 2.85714285714rem;
    }
    &__inputs{
      width: 100%;
    }
    &__input{
      width: 100%;
    }
    &__payment-methods-label {
      margin-top: 1.42857142857rem;
    }
  }
}
</style>
