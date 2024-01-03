import { useI18n } from "vue-i18n";

export function useInternationalization() {
  const { locale, t } = useI18n();

  const setLanguage = (lang) => {
    locale.value = lang;
  };

  const translate = (key) => {
    return t(key);
  };

  return { setLanguage, translate };
}
