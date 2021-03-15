export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  // head: {
  //   title: 'Genshin Impact Artifact Generator',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: 'Generate artifacts from the popular Genshin Impact game, upgrade them, add to your inventory, play with RNG' },
  //     { hid: 'og:title', property: 'og:title', content: 'Genshin Impact Artifact Generator'},
  //     { hid: 'og:url', property: 'og:url', content: 'https://genshin-artifact-generator.netlify.app/'},
  //     { hid: 'og:image', property: 'og:image', content: `https://genshinartifacts.netlify.app/site-icon.png`},
  //     { hid: 'og:type', property: 'og:type', content: 'website'},
  //     { hid: 'og:description', property: 'og:description', content: 'Experience the RNG hell of artifacts.'}
  //   ],
  //   link: [
  //     { rel: 'icon', type: 'image/x-icon', href: '/site-icon.png' }
  //   ]
  // },

  pwa: {
    icon: {
        source: 'https://genshin-artifacts.netlify.app/app-icon.png',
        fileName: 'app-icon.png',
        sizes: [64, 120, 144, 152, 192, 384, 512]
    },
    manifest: {
        name: 'Genshin Impact Artifact Generator',
        short_name: 'Genshin Artifacts',
        description: 'Experience the RNG hell of artifacts.',
        background_color: '#1c1c22',
        theme_color: '#1c1c22'
    },
    workboxOptions: {
        skipWaiting: true
    }
  },

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
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa'
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
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
