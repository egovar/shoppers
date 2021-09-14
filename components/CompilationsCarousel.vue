<template>
  <div class="carousel" @click="$router.push('/catalog/' + link)">
    <transition v-for="(photo, index) in photos" :key="photo" name="fade">
      <img
        v-show="index === currentPhotoIndex"
        :src="'https://bs-bags.ru/' + photo"
        alt="Изображение шопера"
        class="carousel__photo"
      />
    </transition>
    <div class="carousel__controls">
      <div
        v-for="(photo, index) in photos"
        class="carousel__control-item-wrapper"
        @click.stop="changePhoto(index)"
      >
        <div
          class="carousel__control-item"
          :class="
            index === currentPhotoIndex ? 'carousel__control-item_active' : null
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['photos', 'link'],
  data() {
    return {
      currentPhotoIndex: 0,
      photoTimer: null
    };
  },
  methods: {
    changePhoto(index) {
      clearInterval(this.photoTimer);
      this.currentPhotoIndex = index;
      this.photoTimer = setInterval(
        () => (this.currentPhotoIndex = (this.currentPhotoIndex + 1) % 4),
        3000
      );
    }
  },
  watch: {
    link() {
      this.currentPhotoIndex = 0;
      clearInterval(this.photoTimer);
      this.photoTimer = setInterval(
        () => (this.currentPhotoIndex = (this.currentPhotoIndex + 1) % 4),
        3000
      );
    }
  },
  mounted() {
    this.photoTimer = setInterval(
      () => (this.currentPhotoIndex = (this.currentPhotoIndex + 1) % 4),
      3000
    );
  }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';
.carousel {
  cursor: pointer;
  position: relative;
  &__photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 1.5625rem;
    position: absolute;
    bottom: -1.5625rem;
  }
  &__control-item {
    content: '';
    height: 100%;
    max-height: 40%;
    background-color: variables.$white;
    opacity: 0.2;
    transition: max-height 0.2s ease;
    width: 100%;
    &_active {
      max-height: 100%;
    }
  }
  &__control-item-wrapper {
    padding: 0.625rem 0;
    width: 18%;
    height: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
