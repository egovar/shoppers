<template>
  <main class="test container">
    <BackwardsArrow
      to="#"
      @click.native="backwards()"
      v-if="currentQuestion < test.length"
      class="test__backwards-arrow"
    />
    <transition name="fade" mode="out-in">
      <div
        :key="index"
        class="test__item"
        v-for="(item, index) in test"
        v-if="currentQuestion === index"
      >
        <p class="test__question p">{{ item.question }}</p>
        <div
          class="test__answers"
          :class="item.type === 'img' ? 'test__answers_photo' : null"
        >
          <div
            class="test__answer"
            v-for="(answer, answerIndex) in item.answers"
            :key="index + '_' + answerIndex"
          >
            <input
              type="radio"
              :name="'radio_' + (index + 1)"
              :value="answer.value"
              v-model="userAnswers[index]"
              :id="'radio_input_' + index + '_' + answerIndex"
            />
            <label :for="'radio_input_' + index + '_' + answerIndex">
              <img :src="'/' + answer.src" v-if="item.type === 'img'" />
              <span class="p" v-else>{{ answer.text }}</span>
            </label>
          </div>
        </div>
        <button
          class="button test__next-button"
          @click="currentQuestion += 1"
          :disabled="!userAnswers[index]"
        >
          Далее
        </button>
      </div>
      <div v-if="currentQuestion >= test.length" class="test__results">
        <NuxtLink
          to="/catalog/big-with-pocket"
          class="button results__button results__button_mobile"
        >
          Перейти в каталог
        </NuxtLink>
        <div class="test__shoppers">
          <ShopperCard
            v-for="shopper in shoppers"
            :shopper-data="shopper"
            :key="shopper.id"
            class="card"
          />
        </div>
        <div class="test__results-text">
          <h2 class="h2">Ваши результаты:</h2>
          <p class="p">{{ resultText }}</p>
          <NuxtLink
            to="/catalog/big-with-pocket"
            class="button results__button results__button_desktop"
          >
            Перейти в каталог
          </NuxtLink>
        </div>
      </div>
    </transition>
    <div class="test__numbers" v-if="currentQuestion < test.length">
      <span
        v-for="(question, index) in test"
        class="test__number h2"
        :class="currentQuestion === index ? 'test__number_active' : null"
      >
        {{ index + 1 }}
      </span>
    </div>
    <SocialMedia class="test__social-media" />
  </main>
</template>

<script>
import { test, results } from '@/utils/test';
import BackwardsArrow from '@/components/BackwardsArrow';
import { request } from '@/api/server';
import ShopperCard from '@/components/ShopperCard';

export default {
  components: { ShopperCard, BackwardsArrow },
  data() {
    return {
      test,
      results,
      userAnswers: [],
      currentQuestion: 0,
      shoppers: [],
      resultText: ''
    };
  },
  methods: {
    backwards() {
      if (this.currentQuestion === 0) {
        this.$router.push('/');
      } else {
        this.currentQuestion -= 1;
      }
    },
    async getResults() {
      const resultData = results[this.userAnswers[2]][this.userAnswers[3]];
      this.resultText = resultData.text;
      const shoppersId = await request('/groups', { id: resultData.id });
      this.shoppers = await Promise.all(
        shoppersId.map((shopper) => {
          return request('/get', { id: shopper.id });
        })
      );
    }
  },
  watch: {
    currentQuestion(newVal) {
      if (newVal >= test.length) this.getResults();
    }
  },
  head() {
    return {
      title: 'Тест',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    };
  }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';

.test {
  display: flex;
  flex-direction: column;
  padding-top: 14.5rem;
  align-items: center;
  position: relative;
  min-height: 100vh;

  &__item {
    width: 36rem;
    position: relative;
    min-height: calc(100vh - 14.5rem - 3.125rem);
  }

  &__question {
    margin-bottom: 3.125rem;
    text-align: center;
  }

  &__answers {
    &:not(&_photo) {
      padding-left: 5.625rem;
      > div:not(:last-child) {
        margin-bottom: 1.25rem;
      }
      input {
        + label {
          display: flex;
          align-items: center;
          cursor: pointer;
          &::before {
            content: '';
            flex-shrink: 0;
            display: block;
            border-radius: 50%;
            border: 1px solid variables.$white;
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 1.25rem;
            transition: background-color 0.2s ease;
          }
        }
        &:checked + label::before {
          background-color: variables.$white;
        }
      }
    }
    &_photo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      img {
        border: 1px solid transparent;
        transition: border-color 0.2s ease;
        display: block;
        cursor: pointer;
      }
      input:checked + label > img {
        border-color: variables.$white;
      }
    }
  }

  &__answer {
    position: relative;
    input {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
    img {
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }

  &__next-button {
    margin: 6.25rem auto 0;
  }

  &__numbers {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 26.25rem;
    position: absolute;
    left: calc(50% + 18rem + 1.75rem);
  }

  &__number {
    opacity: 0.5;
    transition: opacity 0.2s ease;
    &_active {
      opacity: 1;
    }
  }

  &__backwards-arrow {
    position: absolute;
    left: 3.125rem;
    top: 6rem;
  }

  &__social-media {
    margin: 3.125rem auto;
  }
  &__results {
    display: flex;
    margin-top: -8rem;
  }
  &__results-text {
    width: 35%;
    padding-left: 1rem;
    .h2 {
      margin-bottom: 1rem;
    }
  }
  &__shoppers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 64.7%;
    gap: 1rem;
  }
  .results__button {
    margin: 1rem auto;
    &_mobile {
      display: none;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .test {
    padding-top: 11rem;
    &__backwards-arrow {
      display: none;
    }
    &__numbers {
      flex-direction: row;
      height: unset;
      width: 8.57142857143rem;
      top: 6rem;
      left: calc(50vw - (8.57142857143rem / 2));
    }
    &__item {
      width: 100%;
    }

    &__results {
      flex-direction: column-reverse;
      margin-top: -4rem;
    }
    &__shoppers {
      width: 100%;
    }
    &__results-text {
      width: 100%;
      padding-left: 0;
      margin-bottom: 2rem;
    }
    .results__button {
      &_desktop {
        display: none;
      }
      &_mobile {
        display: flex;
      }
    }
  }
}
</style>
