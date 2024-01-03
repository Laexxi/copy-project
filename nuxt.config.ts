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
    '@nuxtjs/i18n'
  ],

  i18n: {
    legacy: false,
    strategy: 'no_prefix',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'de', iso: 'de-DE', file: 'de.json' },
    ],
    defaultLocale: 'en',
    langDir: './locales',
    fallbackLocale: 'en',
    
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
