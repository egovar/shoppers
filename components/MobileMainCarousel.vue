<template>
  <div class="carousel" ref="carousel">
    <div class="carousel__photos" :style="carouselTranslate">
      <div class="carousel__item">
        <img src="~static/mobile-carousel-1.jpg" class="carousel__item-photo" />
        <p class="carousel__item-content h2">Два шопера со скидкой 25%</p>
      </div>
      <div class="carousel__item">
        <img src="~static/mobile-carousel-2.png" class="carousel__item-photo" />
        <p class="carousel__item-content h2">
          Скидка 8% на следующий заказ,<br />
          если вы отметите нас в инстаграмме
        </p>
      </div>
      <div class="carousel__item">
        <img src="~static/mobile-carousel-3.png" class="carousel__item-photo" />
        <div class="carousel__item-content">
          <p class="h2 carousel__we-can-help">Мы можем помочь вам с выбором</p>
          <NuxtLink to="/test" class="button">Пройти тест</NuxtLink>
        </div>
      </div>
    </div>
    <div class="carousel__controls">
      <div
        class="carousel__control-item"
        :class="currentPhoto === 0 ? 'carousel__control-item_active' : null"
        @click="changeCurrentPhoto(0)"
      ></div>
      <div
        class="carousel__control-item"
        :class="currentPhoto === 1 ? 'carousel__control-item_active' : null"
        @click="changeCurrentPhoto(1)"
      ></div>
      <div
        class="carousel__control-item"
        :class="currentPhoto === 2 ? 'carousel__control-item_active' : null"
        @click="changeCurrentPhoto(2)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPhoto: 0,
      carouselTimer: null,
      photoWidth: null
    };
  },
  computed: {
    carouselTranslate() {
      return {
        transform:
          'translateX(' + -1 * this.photoWidth * this.currentPhoto + 'px)'
      };
    }
  },
  methods: {
    changeCurrentPhoto(index) {
      clearInterval(this.carouselTimer);
      this.currentPhoto = index;
      this.carouselTimer = setInterval(() => {
        this.currentPhoto = (this.currentPhoto + 1) % 3;
      }, 2000);
    }
  },
  mounted() {
    this.photoWidth = this.$refs.carousel.clientWidth;
    this.carouselTimer = setInterval(() => {
      this.currentPhoto = (this.currentPhoto + 1) % 3;
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.carouselTimer);
  }
};
</script>

<style scoped lang="scss">
@use "~assets/style/variables";
.carousel {
  position: relative;
  overflow: hidden;
  &__photos {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    transition: transform 0.2s ease;
  }
  &__item {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    &-photo {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &-content {
      z-index: 5;
      text-align: center;
    }
  }
  &__controls {
    position: absolute;
    width: 100%;
    bottom: 1.42857142857rem;
    display: flex;
    justify-content: center;
  }
  &__control-item {
    width: 1.78571428571rem;
    max-width: 0.71428571428rem;
    height: 0.71428571428rem;
    border-radius: calc(0.71428571428rem / 2);
    border: 1px solid variables.$white;
    background: variables.$white;
    transition: all 0.2s ease;
    &_active {
      max-width: 1.78571428571rem;
      background: none;
    }
    &:not(:last-child) {
      margin-right: calc(0.71428571428rem / 2);
    }
  }
  &__we-can-help {
    margin-bottom: 1.42857142857rem;
  }
}
</style>
