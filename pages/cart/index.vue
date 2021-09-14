<template>
  <main class="cart container">
    <div class="cart__grid">
      <span class="cart__cell cart__cell_main cart__cell_header h2"
        >Продукт</span
      >
      <span class="cart__cell cart__cell_header h2">Цена</span>
      <span class="cart__cell cart__cell_header h2">Размер</span>
      <span class="cart__cell cart__cell_header h2">Цвет</span>
      <span class="cart__cell cart__cell_header h2">Количество</span>
      <template v-for="(shopper, index) in cart">
        <div class="cart__cell cart__cell_main">
          <div class="cart__photo-wrapper">
            <img
              :src="'https://bs-bags.ru/' + shopper.mainPhoto"
              alt="Изображение шопера"
              class="cart__photo"
              @click="$router.push('/catalog/shoppers/' + shopper.id)"
            />
            <svg-icon
              name="trash-bin"
              class="icon"
              @click="deleteFromCart(index)"
            />
          </div>
          <NuxtLink
            :to="'/catalog/shoppers/' + shopper.id"
            class="cart__shopper-name h2"
          >
            {{ shopper.title }}
          </NuxtLink>
          <div class="cart__info cart__info_mobile">
            <span class="cart__info-price p">
              ₽ {{ shopper.price / 100 }}
            </span>
            <NuxtLink
              :to="'/catalog/shoppers/' + shopper.id"
              class="cart__shopper-name cart__shopper-name_mobile h2"
            >
              {{ shopper.title }}
            </NuxtLink>
            <ShopperData
              :modelId="shopper.model_id"
              :similarColors="shopper.similarColors"
              :colorId="shopper.color"
              :initial-quantity="shopper.quantity"
              mobile-cart="true"
              @color-change="changeColor($event, index)"
              @quantity-incremented="incrementQuantity(index)"
              @quantity-decremented="decrementQuantity(index)"
            />
          </div>
        </div>
        <span class="cart__cell cart__cell_price p">
          ₽ {{ shopper.price / 100 }}
        </span>
        <div class="cart__cell cart__cell_size p">
          <span class="cart__shopper-size">
            {{ shopper.size[0] }}см Х {{ shopper.size[1] }}см Х
            {{ shopper.size[2] }}см
          </span>
        </div>
        <div class="cart__cell cart__cell_color">
          <div
            class="cart__shopper-color cart__shopper-color_active"
            :style="{
              backgroundColor: codeToColor[shopper.color],
              boxShadow: `0 0 0 1px ${codeToColor[shopper.color]}`
            }"
          ></div>
          <div
            v-for="color in shopper.similarColors.filter(
              ({ color_id }) => color_id !== shopper.color
            )"
            @click="changeColor(color.shopper_id, index)"
            class="cart__shopper-color"
            :style="{
              backgroundColor: codeToColor[color.color_id]
            }"
          ></div>
        </div>
        <div class="cart__cell cart__cell_quantity">
          <button
            class="cart__button cart__button_minus"
            @click="decrementQuantity(index)"
          >
            -
          </button>
          <span class="cart__quantity p">{{ shopper.quantity }}</span>
          <button
            class="cart__button cart__button_plus"
            @click="incrementQuantity(index)"
          >
            +
          </button>
        </div>
        <div class="cart__info cart__info_mobile"></div>
      </template>
    </div>
    <p class="cart__empty p" v-if="cart.length < 1">Ваша корзина пуста</p>
    <div v-else class="cart__summary">
      <p class="p cart__sum-label">Сумма заказа:</p>
      <strong class="h2 cart__sum">₽ {{ cartSum }}</strong>
      <NuxtLink to="/order" class="button cart__buy-button">
        Перейти к оформлению
      </NuxtLink>
    </div>
  </main>
</template>

<script>
import { modelToSize } from '@/utils/modelToSize';
import { codeToColor } from '@/utils/codeToColor';
import { request } from '@/api/server';
import ShopperData from '@/components/ShopperData';

export default {
  components: { ShopperData },
  data() {
    return {
      cart: [],
      codeToColor
    };
  },
  methods: {
    async getShoppers() {
      this.cart = await Promise.all(
        this.$store.getters.cart.map(async (shopper) => {
          const shopperData = await request('/get', {
            id: shopper.id
          });
          return {
            id: shopper.id,
            title: shopperData.name,
            color: shopperData.color_id,
            similarColors: shopperData.similar_colors,
            price: shopperData.price,
            quantity: shopper.quantity,
            mainPhoto: shopperData.main_picture,
            size: modelToSize[shopperData.model_id],
            model_id: shopperData.model_id
          };
        })
      );
    },
    deleteFromCart(index) {
      this.$store.commit('deleteFromCart', index);
      this.cart.splice(index, 1);
    },
    async changeColor(shopper_id, index) {
      this.$store.commit('changeColor', { newId: shopper_id, index });
      await this.getShoppers();
    },
    decrementQuantity(index) {
      if (this.$store.getters.cart[index].quantity > 1) {
        this.$store.commit('decrementQuantity', index);
        this.cart[index].quantity--;
      }
    },
    incrementQuantity(index) {
      this.$store.commit('incrementQuantity', index);
      this.cart[index].quantity++;
    }
  },
  computed: {
    cartSum() {
      let sum = 0;
      this.cart.forEach((shopper) => (sum += shopper.price * shopper.quantity));
      return sum / 100;
    }
  },
  async mounted() {
    this.$store.commit(
      'setCart',
      JSON.parse(window.localStorage.getItem('cart'))
    );
    await this.getShoppers();
  },
  fetchOnServer: false
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';

.cart {
  margin-top: 6rem;

  &__grid {
    display: grid;
    grid-template-columns: 30% 1fr 1fr 1fr 1fr;
    place-items: stretch;
    margin-bottom: 3.125rem;
  }

  &__empty {
    text-align: center;
  }

  &__cell {
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    width: 100%;

    &:not(&_main) {
      justify-content: center;
    }

    &_main {
      margin-right: 1.25rem;
    }
  }

  &__shopper-size,
  &__quantity {
    border-bottom: 1px solid;
  }

  &__quantity {
    margin-right: 1.25rem;
  }

  &__button {
    border: none;
    background: none;
    color: variables.$white;
    cursor: pointer;
    font-family: variables.$Roboto;
    font-weight: 300;
    font-size: 18px;
    line-height: 139%;

    &_minus {
      margin-right: 1.25rem;
    }
  }

  &__photo-wrapper {
    width: calc(7.6% / 0.3);
    cursor: pointer;
    aspect-ratio: 1/1;
    position: relative;
    margin-right: 1.25rem;

    .icon {
      position: absolute;
      width: 20%;
      height: 20%;
      top: 10%;
      right: 10%;
      filter: drop-shadow(1px 1px 4px lightgray);
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__shopper-color {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    cursor: pointer;

    &_active {
      border: 1px solid variables.$black;
      margin-right: calc(11rem / 16);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__summary {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__sum-label {
    margin-bottom: 0.625rem;
  }

  &__sum {
    margin-bottom: 3.125rem;
  }

  &__info {
    display: none;
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .cart {
    &__grid {
      display: block;
    }
    &__photo-wrapper {
      width: 39%;
    }
    &__cell {
      &_header,
      &:not(&_main) {
        display: none;
      }
    }

    &__shopper-name {
      &:not(&_mobile) {
        display: none;
      }
    }
    &__info {
      &_mobile {
        display: unset;
      }
    }
  }
}
</style>
