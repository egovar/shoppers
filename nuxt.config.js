import fetch from 'node-fetch';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'shoppers',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-fragment.js', '~/plugins/vue-rellax.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  svgSprite: {
    input: '~/assets/svg',
    output: '~/static/icons' //May not work properly
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    async routes() {
      const shoppers_stream = await fetch(
        'https://bs-bags.ru/api/shoppers/get_all',
        {
          method: 'POST'
        }
      );
      const shoppers = await shoppers_stream.json();
      return shoppers.map((shopper) => {
        return {
          route: '/catalog/shoppers/' + shopper.id,
          payload: shopper
        };
      });
    }
  }
};
