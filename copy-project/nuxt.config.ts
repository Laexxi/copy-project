// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src',
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  components: true,

  modules: [
    async (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true}))
      })
    },
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

  i18n: {
    strategy: "no_prefix",
    langDir: "./locales",
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "de", iso: "de-DE", file: "de.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json"}
    ],
    
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  plugins: [
    '~/plugins/context-menu.js'
  ],
})
