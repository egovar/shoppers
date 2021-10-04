<template>
  <main class="order container">
    <div class="order__inputs">
      <BackwardsArrow to="/cart" class="order__backwards" />
      <input
        class="order__input input"
        placeholder="ФИО"
        v-model="customerName"
      />
      <input
        class="order__input input"
        placeholder="Телефон"
        v-model="customerPhone"
      />
      <input
        class="order__input input order__input_email"
        placeholder="Email"
        v-model="customerEmail"
      />
      <div class="order__delivery-type" ref="radios">
        <p class="h2 order__delivery-header">Доставка</p>
        <input
          type="radio"
          name="delivery_type"
          v-model="deliveryType"
          value="courier"
          id="courier_delivery"
        />
        <label for="courier_delivery" class="p">Курьер</label>
        <input
          type="radio"
          name="delivery_type"
          v-model="deliveryType"
          value="pvz"
          id="pvz_delivery"
        />
        <label for="pvz_delivery" class="p">Пункт самовывоза</label>
      </div>
      <template v-if="deliveryType === 'courier'">
        <input
          class="order__input input"
          placeholder="Индекс"
          v-model="customerZip"
        />
        <input
          class="order__input order__input_address input"
          placeholder="Введите адрес"
          v-model="customerAddress"
        />
        <p class="h2 order__warning">
          В доставку включены только города из
          <span class="order__list-link" @click="toList()">списка</span>
        </p>
      </template>
      <p class="h2 order__choose-pvz" v-show="deliveryType === 'pvz'">
        {{
          pvzId
            ? `Выбран пункт выдачи по адресу ${pvzAddress}, ${pvzZip}`
            : 'Выберите пункт выдачи'
        }}
      </p>
      <div
        v-show="deliveryType === 'pvz'"
        class="order__map"
        id="order__map"
      ></div>
    </div>
    <div class="order__summary">
      <div class="order__promo-block">
        <input
          class="input promo__input"
          v-model="promo"
          placeholder="Промокод"
          @input="badPromo = false"
        />
        <button class="promo__button button" @click="checkPromo">ОК</button>
        <span v-if="badPromo" class="promo__fail">Неверный промокод</span>
      </div>
      <p class="p order__sum-label">Сумма заказа:</p>
      <p class="h2 order__sum">₽ {{ orderSum }}</p>
      <p class="order__payment-methods-label p">Оплата:</p>
      <div class="order__payment-methods">
        <div class="payment-method payment-method_card payment-method_selected">
          <svg-icon name="credit-card" class="icon" />
        </div>
      </div>
      <button
        class="order__payment-button button"
        ref="order_button"
        @click="makeAnOrder"
        :disabled="orderButtonDisabled"
      >
        Перейти к оплате
      </button>
    </div>
    <div class="order__social-media">
      <SocialMedia class="order__media-buttons" />
    </div>
  </main>
</template>

<script>
import { request } from '@/api/server';
import { isMobile } from '@/mixins/isMobile';

function scrollToList() {
  window.scrollTo(
    0,
    document.getElementById('cities').getBoundingClientRect().top
  );
}

export default {
  name: 'orderPage',
  mixins: [isMobile],
  data() {
    return {
      cart: [],
      deliveryType: undefined,
      pvzId: null,
      pvzAddress: null,
      pvzZip: null,
      mapIsLoaded: false,
      customerName: undefined,
      customerPhone: undefined,
      customerEmail: undefined,
      customerZip: undefined,
      customerAddress: undefined,
      promoMultiplier: 1,
      promo: undefined,
      badPromo: false,
      appliedPromo: null
    };
  },
  computed: {
    orderSum() {
      let sum = 0;
      this.cart.forEach(({ price, quantity }) => (sum += price * quantity));
      return ((sum * this.promoMultiplier) / 100).toFixed(2);
    },
    orderButtonDisabled() {
      return !(
        this.customerName &&
        this.customerPhone &&
        this.customerEmail &&
        ((this.deliveryType === 'pvz' && this.pvzId) ||
          (this.deliveryType === 'courier' &&
            this.customerZip &&
            this.customerAddress))
      );
    }
  },
  watch: {
    deliveryType(newVal) {
      if (!this.mapIsLoaded && newVal === 'pvz') {
        let mapTimer;
        if (ymaps.Map) this.createMap();
        else {
          mapTimer = setInterval(() => {
            if (ymaps.Map) {
              this.createMap();
              clearInterval(mapTimer);
            }
          }, 1000);
        }

        this.mapIsLoaded = true;
      }
    },
    async pvzId(newVal) {
      const pvzData = await request('/get_pvz_data', { id: newVal });
      this.pvzAddress = pvzData.addr;
      this.pvzZip = pvzData.zip;
    }
  },
  methods: {
    async toList() {
      await this.$router.push('/');
      const list = document.getElementById('promos');
      if (list) scrollToList();
      else setTimeout(() => scrollToList(), 500);
    },
    async checkPromo() {
      const res = await request('/check_promo', { promo_code: this.promo });
      if (res === 0) {
        this.badPromo = true;
        this.promoMultiplier = 1;
        this.appliedPromo = null;
      } else {
        this.promoMultiplier = 1 - res / 10000;
        this.badPromo = false;
        this.appliedPromo = this.promo;
      }
    },
    async makeAnOrder() {
      const link = await request('/new_order', {
        promo_code: this.appliedPromo || undefined,
        items: this.$store.getters.cart,
        client: {
          email: this.customerEmail,
          phone: this.customerPhone,
          address:
            this.deliveryType === 'pvz'
              ? this.pvzAddress
              : this.customerAddress,
          zip: this.deliveryType === 'pvz' ? this.pvzZip : this.customerZip,
          fio: this.customerName,
          comment: '',
          delivery: this.deliveryType === 'courier'
        }
      });
      if (typeof link.location === 'string') window.location = link.location;
    },
    async createMap() {
      await b2cMapper({
        containerId: 'order__map',
        searchControl: true,
        callBack: (pvz) => {
          const pvzData = JSON.parse(pvz);
          this.pvzId = pvzData.id;
          this.pvzZip = pvzData.zip;
        },
        containerHeight: !this.isMobile ? '28.5rem' : '40rem'
      });
    }
  },
  async mounted() {
    setTimeout(async () => {
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
    }, 500);
  },
  head() {
    return {
      title: 'Оформление заказа',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.b2cpl.ru/files/outside/b2c-map-pvz.min.css'
        }
      ],
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
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

<style scoped lang="scss">
@use '~assets/style/variables';

.order {
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 6rem;
  padding-bottom: 3.875rem;

  &__social-media {
    display: none;
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
      margin-bottom: 0.375rem;
    }

    &_email {
      margin-bottom: 2.5rem;
    }
  }

  &__map {
    width: 100%;
    flex-grow: 10;
  }

  .input-with-text-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__promo-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    .promo__input {
      width: 75%;
    }
    .promo__button {
      width: 22%;
      height: 2.125rem;
    }
    .promo__fail {
      position: absolute;
      top: 2.25rem;
    }
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

  &__sum-label {
    margin-top: 1.25rem;
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

  &__delivery-type {
    display: flex;
    //align-items: center;
    margin-bottom: 1.5rem;

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid #ebf9f7;
      margin: 0 1.25rem 0 0;
      cursor: pointer;

      &:checked {
        background: variables.$white;
      }

      & + label {
        margin-right: 1.875rem;
        cursor: pointer;
      }
    }
  }

  &__delivery-header {
    text-transform: uppercase;
    margin-right: 4.75rem;
  }

  &__list-link {
    border-bottom: 1px solid variables.$white;
    cursor: pointer;
  }

  &__choose-pvz {
    margin-bottom: 1.5rem;
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

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .desktop {
    display: none;
  }

  .order {
    display: block;
    padding-top: 6.5rem;
    height: unset;

    &__payment-methods {
      margin-bottom: 2.85714285714rem;
    }

    &__media-buttons {
      margin: auto;
    }

    &__social-media {
      display: block;
      position: absolute;
      bottom: 3.57142857143rem;
      width: 100%;
      left: 0;
    }

    &__payment-button {
      margin: 0 auto 3.57142857143rem;
    }

    &__backwards {
      display: none;
    }

    &__inputs {
      width: 100%;
    }

    &__input {
      width: 100%;
    }

    &__payment-methods-label {
      margin-top: 1.42857142857rem;
    }

    &__delivery-type {
      flex-wrap: wrap;
      > p {
        margin-right: 100%;
        margin-bottom: 0.5rem;
      }
    }
    &__map {
      margin-bottom: 1rem;
    }
    &__warning {
      margin-bottom: 1rem;
    }
  }
}
</style>
<style lang="scss">
.order {
  &__map {
    & > div {
      &:not(.b2c-map-container) {
        display: none;
      }
    }
  }
}
</style>
