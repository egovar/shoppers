<template>
  <div class="carousel">
    <div
      class="carousel__photos"
      ref="photos"
      :style="{ transform: `translateX(${photosShift}px)` }"
    >
      <img
        v-for="photo in photos"
        :src="'https://bs-bags.ru/' + photo"
        alt="Фотография шопера"
        class="carousel__photo"
      />
    </div>
    <div class="carousel__controls">
      <button
        @click="currentPhoto > 1 ? currentPhoto-- : null"
        class="carousel__control-arrow carousel__control-arrow_left"
      >
        <svg-icon name="carousel-arrow" class="icon" />
      </button>
      <p class="carousel__counter p">
        {{ currentPhoto }} / {{ photos.length }}
      </p>
      <button
        @click="currentPhoto < photos.length ? currentPhoto++ : null"
        class="carousel__control-arrow carousel__control-arrow_right"
      >
        <svg-icon name="carousel-arrow" class="icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['photos'],
  data() {
    return {
      isMounted: false,
      currentPhoto: 1
    };
  },
  mounted() {
    this.isMounted = true;
  },
  computed: {
    photosShift() {
      if (this.isMounted) {
        return -1 * (this.$refs.photos.clientWidth * (this.currentPhoto - 1));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.carousel {
  width: calc(69.31% + 1.875rem);
  margin-right: -1.875rem;
  height: 100%;
  position: relative;
  overflow: hidden;
  &__photos {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    transition: transform 0.2s ease;
  }
  &__photo {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &__controls {
    width: 100%;
    height: 2.75rem;
    background-color: rgba(29, 31, 34, 0.9);
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.625rem;
  }
  &__control-arrow {
    cursor: pointer;
    width: 4.5rem;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;
    height: 100%;
    .icon {
      height: 0.5rem;
      width: 100%;
    }
    &_left {
      transform: scaleX(-1);
    }
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .carousel {
    width: 100%;
    aspect-ratio: 113/103;
    margin: 0;
  }
}
</style>
