export default {
  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/keen-ui.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-lazyload.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-notification.js',
      mode: 'client'
    },
    {
      src: '~/plugins/bootstrap-vue.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vue2-transitions.js',
      mode: 'client'
    },
    {
      src: '~/plugins/v-tooltip.js',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
        source: '/app-icon.png',
        fileName: 'app-icon.png',
        // sizes: [64, 120, 144, 152, 192, 384, 512]
    },
    manifest: {
        name: 'Genshin Impact Artifact Generator',
        short_name: 'Genshin Artifacts',
        description: 'Experience the RNG hell of artifacts.',
        background_color: '#000000',
        theme_color: '#1c1c22'
    },
    workboxOptions: {
        skipWaiting: true
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
