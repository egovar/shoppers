export const state = () => {
  return {
    isLoading: false,
    errorMessage: false,
    cart: []
  };
};

export const getters = {
  isLoading: ({ isLoading }) => isLoading,
  errorMessage: ({ errorMessage }) => errorMessage,
  cart: ({ cart }) => cart,
  cartLength: ({ cart }) => {
    if (cart.length > 1)
      return cart.reduce(
        (shopper, newShopper) => shopper.quantity + newShopper.quantity
      );
    if (cart.length === 1) return cart[0].quantity;
    else return 0;
  }
};

export const mutations = {
  setCart: (state, newCart) => {
    state.cart = newCart || [];
  },
  pushToCart: (state, { id, quantity }) => {
    const index = state.cart.findIndex((shopper) => shopper.id === id);
    if (index === -1) state.cart = [...state.cart, { id, quantity }];
    else {
      const _cart = state.cart;
      _cart[index].quantity += quantity;
      state.cart = [..._cart];
    }
  },
  changeColor(state, { newId, index }) {
    const _cart = state.cart;
    const existingIndex = _cart.findIndex(({ id }) => id === newId);
    if (existingIndex === -1) {
      _cart[index].id = newId;
    } else {
      const quantity = _cart[index].quantity;
      _cart[existingIndex].quantity += quantity;
      _cart.splice(index, 1);
    }
    state.cart = [..._cart];
  },
  deleteFromCart(state, index) {
    const _cart = state.cart;
    _cart.splice(index, 1);
    state.cart = [..._cart];
  },
  decrementQuantity(state, index) {
    state.cart[index].quantity--;
  },
  incrementQuantity(state, index) {
    state.cart[index].quantity++;
  }
};
