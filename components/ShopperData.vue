<template>
  <div class="shopper-data">
    <span class="shopper-data__label p">Размер:</span>
    <div>
      <span class="shopper-data__size">
        {{ modelToSize[modelId][0] }}см Х {{ modelToSize[modelId][1] }}см
        {{ !mobileCart ? 'Х ' + modelToSize[modelId][2] + 'см' : null }}
      </span>
    </div>
    <span class="shopper-data__label p">Цвет:</span>
    <div class="shopper-data__colors">
      <div
        class="shopper-data__color shopper-data__color_active"
        :style="{
          backgroundColor: codeToColor[colorId],
          boxShadow: `0 0 0 1px ${codeToColor[colorId]}`
        }"
      ></div>
      <div
        v-for="color in similarColors.filter(
          ({ color_id }) => color_id !== colorId
        )"
        @click.stop="
          !mobileCart
            ? $router.push('/catalog/shoppers/' + color.shopper_id)
            : $emit('color-change', color.shopper_id)
        "
        class="shopper-data__color"
        :style="{
          backgroundColor: codeToColor[color.color_id]
        }"
      ></div>
    </div>
    <span class="shopper-data__label p">Количество:</span>
    <div class="shopper-data__quantity-cell">
      <button
        class="
          shopper-data__change-quantity-button
          shopper-data__change-quantity-button_minus
        "
        @click.stop="
          quantity > 1 ? quantity-- : null;
          mobileCart ? $emit('quantity-decremented') : null;
        "
      >
        -
      </button>
      <span class="shopper-data__quantity">{{ quantity }}</span>
      <button
        class="
          shopper-data__change-quantity-button
          shopper-data__change-quantity-button_plus
        "
        @click.stop="
          quantity++;
          mobileCart ? $emit('quantity-incremented') : null;
        "
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { modelToSize } from '@/utils/modelToSize';
import { codeToColor } from '@/utils/codeToColor';

export default {
  props: [
    'modelId',
    'similarColors',
    'colorId',
    'initialQuantity',
    'mobileCart'
  ],
  data() {
    return {
      quantity: this.initialQuantity || 1,
      modelToSize,
      codeToColor
    };
  },
  watch: {
    initialQuantity(newVal) {
      this.quantity = newVal;
    }
  }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';
.shopper-data {
  display: grid;
  grid-template-columns: 7.625rem 1fr;
  grid-gap: 0.75rem 0;
  &__size {
    border-bottom: 1px solid variables.$white;
  }
  &__colors {
    display: flex;
  }
  &__color {
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
  &__quantity-cell {
    flex-wrap: nowrap;
  }
  &__change-quantity-button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: variables.$white;
    font-family: variables.$Roboto;
    font-size: 1.125rem;
    line-height: 139%;
    font-weight: 300;
    padding: 0;
  }
  &__quantity {
    border-bottom: 1px solid variables.$white;
  }
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .shopper-data {
    grid-template-columns: 1fr 1fr;
    grid-gap: calc(10rem / 14) 1.57142857143rem;
  }
}
</style>
