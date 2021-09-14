<template>
  <main class="contacts container p">
    <h2 class="h2 contacts__header">Контактная информация</h2>
    Название компании ИП Артамонов Артемий Вадимович<br />
    ИНН / КПП 773571249619 <br />
    ОГРН 30101810200000000593 <br />
    Фактический адрес 124460. д. 802, кв./оф. 263, г. Зеленоград, г. Москва.
    <br />
    Телефон 8 (901) 504 05 11 <br />
    Факс 8 (901) 504 05 11 <br />
    e-mail: bs-shop@gmail.com <br />

    <AppFooter />
  </main>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.contacts {
  padding-top: 6rem;
  text-align: center;
  &__header {
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.625rem;
  }
}
</style>
