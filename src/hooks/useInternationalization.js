import { vue } from "vue";
import { VueI18n } from "vue-i18n";

vue.use(VueI18n);

export function useInternationalization() {
  const { locale, t } = VueI18n();

  const setLanguage = (lang) => {
    locale.value = lang;
  };

  const translate = (key) => {
    return t(key);
  };

  return { setLanguage, translate };
}
