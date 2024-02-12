import { en, de } from 'vuetify/locale';

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: "en",
  fallbackLocale: "en",
  messages: {
    en: {
      $vuetify: {
        dataIterator: {
          rowsPerPageText: "Dudes per page:",
        },
      },
    },
    de: {
      $vuetify: {
        dataIterator: {
          rowsPerPageText: "Elemente pro Seite:",
        },
      },
    },
  },
}));
