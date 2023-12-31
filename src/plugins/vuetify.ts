// src/plugins/vuetify.ts
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md1, md2, md3 } from 'vuetify/blueprints'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    blueprint: md2,
    aliases: {

    },
    defaults: {

    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          // Farben für das dunkle Theme
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          // ...weitere Farben
        },
        light: {
          // Farben für das helle Theme
          primary: '#1976D2',
          secondary: '#EEEEEE',
          accent: '#82B1FF',
          // ...weitere Farben
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})