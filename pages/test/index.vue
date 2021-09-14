<template>
<main class='test'>
  <div class='test__content'>
    <BackwardsArrow to='/' class='test__backwards desktop'/>
    <div class='test__numbers-mobile mobile'>
      <span class='test__number active'>1</span>
      <span class='test__number'>2</span>
      <span class='test__number'>3</span>
      <span class='test__number'>4</span>
      <span class='test__number'>5</span>
    </div>
    <div class='test__question'>
      <p class='test__question-text p'>К какой группе вы себя больше всего относите?</p>
      <form class='test__radio-group'>
        <div class='test__radio-button'>
          <input class='test__input' type='radio' id='1' name='test'>
          <label class='test__input-label p' for='1'>Бизнесмен</label>
        </div>
        <div class='test__radio-button'>
          <input class='test__input' type='radio' id='2' name='test'>
          <label class='test__input-label p' for='2'>Домохозяйка</label>
        </div>
        <div class='test__radio-button'>
          <input class='test__input' type='radio' id='3' name='test'>
          <label class='test__input-label p' for='3'>Студент</label>
        </div>
        <div class='test__radio-button'>
          <input class='test__input' type='radio' id='4' name='test'>
          <label class='test__input-label p' for='4'>Фрилансер</label>
        </div>
      </form>
    </div>
    <button class='button test__button'>Далее</button>
  </div>

  <div class='test__numbers desktop'>
    <span class='test__number active'>1</span>
    <span class='test__number'>2</span>
    <span class='test__number'>3</span>
    <span class='test__number'>4</span>
    <span class='test__number'>5</span>
  </div>

  <SocialMedia class='test__social-media mobile'/>
</main>
</template>

<script>
import BackwardsArrow from '../../components/BackwardsArrow';
import SocialMedia from '../../components/SocialMedia';
export default {
  name: 'index',
  components: { SocialMedia, BackwardsArrow }
};
</script>

<style scoped lang='scss'>
@use '~assets/style/variables';

.mobile{
  display: none;
}

.test{
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 11rem;
  align-items: center;
  position: relative;



  &__backwards{
    position: absolute;
    top: 6.25rem;
    left: 3.75rem;
  }

  &__content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__numbers{
    position: absolute;
    right: 15.4375rem;
    top: 10.5rem;
    display: flex;
    flex-direction: column;
  }

  &__number{
    font-family: Roboto;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.75rem;
    opacity: 0.2;
    &:not(:last-child){
      margin-bottom: 4.375rem;
    }
  }

  &__input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #EBF9F7;
    margin-right: 1.25rem;
    cursor: pointer;

    &:checked{
      background: variables.$white;
    }
  }

  &__radio-group{
    margin-bottom: 6.25rem;
  }
  &__radio-button{
    display: flex;
    align-items: center;
    &:not(:last-child){
      margin-bottom: 1.25rem;
    }
  }

  &__question{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__question-text{
    margin-bottom: 3.125rem;
  }
}

.active{
  opacity: 1;
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px){
  .desktop{
    display: none;
  }

  .mobile{
    display: block;
  }

  .test{
    padding-top: 6rem;

    &__social-media{
      display: flex;
      position: absolute;
      bottom: 1.875rem;
    }



    &__numbers-mobile{
      margin-bottom: 3.75rem;

      .test__number{
        font-family: Roboto;
        font-weight: 300;
        font-size: .875rem;
        line-height: 1rem;
        &:not(:last-child){
          margin-right: 1.25rem;
        }
      }
    }

  }
}

</style>
