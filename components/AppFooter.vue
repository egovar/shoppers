<template>
  <footer class="app-footer container p">
    <div class="app-footer__links">
      <NuxtLink to="/payment_rules" class="app-footer__link">
        Правила оплаты и безопасность платежей, конфиденциальность информации
      </NuxtLink>
      <NuxtLink to="/refund_policy" class="app-footer__link">
        Правила возврата товара
      </NuxtLink>
      <NuxtLink to="/delivery_rules" class="app-footer__link">
        Правила доставки товара
      </NuxtLink>
      <NuxtLink to="/contacts" class="app-footer__link">
        Контактная информация
      </NuxtLink>
    </div>
    <p>2021 Москва</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.app-footer {
  padding-top: 6.25rem;
  padding-bottom: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
  color: white;
  &__links {
    display: flex;
    flex-wrap: wrap;
    max-width: 44rem;
    justify-content: space-between;
  }
  &__link {
    border-bottom: 1px solid white;
    &:first-child {
      margin-bottom: 0.625rem;
    }
  }
}

@media (max-width: 1024px) and (orientation: portrait), (max-width: 720px){
  .app-footer{
    display: none;
  }
}
</style>
