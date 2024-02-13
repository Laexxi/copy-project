import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { md2 } from 'vuetify/blueprints';

const fonts = {
  Roboto: {
    fontFamily: 'Roboto',

  },
  Poppy: {
    fontFamily: 'Poppins',

  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    blueprint: md2,
    aliases: {},
    defaults: {},
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          // Farben für das dunkle Theme
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          // ...weitere Farben
          
          // Schriftarten
          typography: {
            fontFamily: 'Roboto',
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: {
              regular: 400,
              medium: 500,
              bold: 700,
            },
          },
        },
        light: {
          // Farben für das helle Theme
          primary: '#1976D2',
          secondary: '#F7F7F7',
          accent: '#82B1FF',
          background: '#FFFFFF',
          text: '#424242',
          // ...weitere Farben
          
          // Schriftarten
          typography: {
            fontFamily: 'Roboto',
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: {
              regular: 400,
              medium: 500,
              bold: 700,
            },
          },
        },
      },
    },
    // Registrierung der benutzerdefinierten Schriftarten
    icons: {
      iconfont: 'mdi',
      fonts,
    },
  });

  app.vueApp.use(vuetify);
});
