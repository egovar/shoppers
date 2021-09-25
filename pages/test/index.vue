<template>
  <main class="test">
    <div class="test__content">
      <BackwardsArrow to="/" class="test__backwards desktop" />
      <div class="test__numbers-mobile mobile">
        <span class="test__number" :class="">1</span>
        <span class="test__number">2</span>
        <span class="test__number">3</span>
        <span class="test__number">4</span>
        <span class="test__number">5</span>
      </div>
      <transition>
        <div class="test__question" v-if="question_number === 1">
          <p class="test__question-text p">
            К какой группе вы себя больше всего относите?
          </p>
          <form class="test__radio-group" key="question1">
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-one__1"
                name="test"
              />
              <label class="test__input-label p" for="question-one__1"
                >Бизнесмен</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-one__2"
                name="test"
              />
              <label class="test__input-label p" for="question-one__2"
                >Домохозяйка</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-one__3"
                name="test"
              />
              <label class="test__input-label p" for="question-one__3"
                >Студент</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-one__4"
                name="test"
              />
              <label class="test__input-label p" for="question-one__4"
                >Фрилансер</label
              >
            </div>
          </form>
        </div>

        <div class="test__question" v-if="question_number === 2">
          <p class="test__question-text p">
            Вы хотите, чтобы шоппер был акцентом в Вашем образе или чтобы он
            лишь дополнял Вас?
          </p>
          <form class="test__radio-group" key="question2">
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-two__1"
                name="test"
              />
              <label class="test__input-label p" for="question-two__1"
                >Хочу акцент к образу</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-two__2"
                name="test"
              />
              <label class="test__input-label p" for="question-two__2"
                >Хочу дополнение к себе красивому</label
              >
            </div>
          </form>
        </div>

        <div class="test__question" v-if="question_number === 3">
          <p class="test__question-text p">
            Какой шопер кажется вам наиболле привлекательным?
          </p>
          <form class="test__radio-image-group" key="question3">
            <div class="test__radio-button">
              <input
                class="test__input test__input_photo"
                type="radio"
                id="question-three__1"
                name="test"
              />
              <label class="test__input-label p" for="question-three__1">
                <img src="~static/test-photo.jpg" class="test__input-image" />
              </label>
            </div>
            <div class="test__radio-button">
              <input
                class="test__input test__input_photo"
                type="radio"
                id="question-three__2"
                name="test"
              />
              <label class="test__input-label p" for="question-three__2">
                <img src="~static/test-photo.jpg" class="test__input-image" />
              </label>
            </div>
            <div class="test__radio-button">
              <input
                class="test__input test__input_photo"
                type="radio"
                id="question-three__3"
                name="test"
              />
              <label class="test__input-label p" for="question-three__3">
                <img src="~static/test-photo.jpg" class="test__input-image" />
              </label>
            </div>
            <div class="test__radio-button">
              <input
                class="test__input test__input_photo"
                type="radio"
                id="question-three__4"
                name="test"
              />
              <label class="test__input-label p" for="question-three__4">
                <img src="~static/test-photo.jpg" class="test__input-image" />
              </label>
            </div>
          </form>
        </div>

        <div class="test__question" v-if="question_number === 4">
          <p class="test__question-text p">
            Вы привыкли брать с собой только минимальный набор вещей или же
            любите взять все, что Вам может понадобиться в течение дня?
          </p>
          <form class="test__radio-group" key="question4">
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-four__1"
                name="test"
              />
              <label class="test__input-label p" for="question-four__1"
                >Минимализм - мое все</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-four__2"
                name="test"
              />
              <label class="test__input-label p" for="question-four__2"
                >Всегда ношу с собой нобор вещей для переезда</label
              >
            </div>
          </form>
        </div>

        <div class="test__question" v-if="question_number === 5">
          <p class="test__question-text p">
            Вы привыкли убирать телефон и картхолдер, в рюкзак или же носите эти
            предметы в кармане ваших брюк?
          </p>
          <form class="test__radio-group" key="question5">
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-five__1"
                name="test"
              />
              <label class="test__input-label p" for="question-five__1"
                >Привык хранить все на своих местах</label
              >
            </div>
            <div class="test__radio-button">
              <input
                class="test__input"
                type="radio"
                id="question-five__2"
                name="test"
              />
              <label class="test__input-label p" for="question-five__2"
                >Привык кидать все в карманы</label
              >
            </div>
          </form>
        </div>

        <div v-if="results">
          <div></div>
        </div>
      </transition>

      <button
        class="button test__button"
        id="next_button"
        v-on:click="next_question"
      >
        Далее
      </button>
    </div>

    <div class="test__numbers desktop" id="question_numbers">
      <span class="test__number active" id="1">1</span>
      <span class="test__number" id="2">2</span>
      <span class="test__number" id="3">3</span>
      <span class="test__number" id="4">4</span>
      <span class="test__number" id="5">5</span>
    </div>

    <SocialMedia class="test__social-media mobile" />
  </main>
</template>

<script>
import BackwardsArrow from '../../components/BackwardsArrow';
import SocialMedia from '../../components/SocialMedia';

export default {
  data() {
    return {
      question_number: 1,
      results: false
    };
  },
  methods: {
    next_question: function () {
      const previous_number = document.getElementById(this.question_number);
      if (this.question_number === 5) {
        this.results = true;
        this.question_number = 0;
        const next_button = document.getElementById('next_button');
        const question_numbers = document.getElementById('question_numbers');
        next_button.classList.add('hidden');
        question_numbers.classList.add('hidden');
      } else {
        this.question_number += 1;
        const next_number = document.getElementById(this.question_number);
        previous_number.classList.remove('active');
        next_number.classList.add('active');
      }
    }
  },
  name: 'index',
  components: { SocialMedia, BackwardsArrow }
};
</script>

<style scoped lang="scss">
@use '~assets/style/variables';

.mobile {
  display: none;
}

.hidden {
  display: none !important;
}

.test {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 11rem;
  align-items: center;
  position: relative;

  &__backwards {
    position: absolute;
    top: 6.25rem;
    left: 3.75rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__numbers {
    position: absolute;
    right: 15.4375rem;
    top: 10.5rem;
    display: flex;
    flex-direction: column;
  }

  &__number {
    font-family: Roboto;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.75rem;
    opacity: 0.2;

    &:not(:last-child) {
      margin-bottom: 4.375rem;
    }
  }

  &__radio-image-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9375rem;
    margin-bottom: 5rem;
    > .test__radio-button {
      margin: 0 !important;

      > .test__input {
        display: none;
      }
    }
  }

  &__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #ebf9f7;
    margin-right: 1.25rem;
    cursor: pointer;

    &_photo {
      &:checked {
        + .test__input-label {
          border: 1px solid whitesmoke;
        }
      }
    }

    &:checked {
      background: variables.$white;
    }
  }

  &__input-image {
    height: 20vh;
    &:hover {
      border: 1px solid whitesmoke;
    }
  }

  &__radio-group {
    margin-bottom: 6.25rem;
  }

  &__radio-button {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }

  &__question {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    max-width: 35.75rem;
  }

  &__question-text {
    margin-bottom: 3.125rem;
  }
}

.active {
  opacity: 1;
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .test {
    padding-top: 6rem;

    &__social-media {
      display: flex;
      position: absolute;
      bottom: 1.875rem;
    }

    &__numbers-mobile {
      margin-bottom: 3.75rem;

      .test__number {
        font-family: Roboto;
        font-weight: 300;
        font-size: 0.875rem;
        line-height: 1rem;

        &:not(:last-child) {
          margin-right: 1.25rem;
        }
      }
    }
  }
}
</style>
