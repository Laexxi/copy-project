// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls} from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src',
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    async (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true}))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
