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
    cart: {
      handler(newVal) {
        rewriteCart(newVal);
      },
      deep: true
    }
  },
  mounted() {
    this.$store.commit(
      'setCart',
      JSON.parse(window.localStorage.getItem('cart'))
    );
  }
};
