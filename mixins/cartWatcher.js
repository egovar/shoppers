function rewriteCart(cart) {
  console.log('I am cart now:', cart);
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export const cartWatcher = {
  computed: {
    cart() {
      return this.$store.getters.cart;
    }
  },
  watch: {
    cart(newVal, oldVal) {
      if (newVal !== oldVal) {
        rewriteCart(newVal);
      }
    }
  },
  mounted() {
    this.$store.commit(
      'setCart',
      JSON.parse(window.localStorage.getItem('cart'))
    );
  }
};
