import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "react-native-localize";

import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const deviceLanguageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,

  detect: (callback) => {
    const systemLocales = Localization.getLocales();
    const phoneLanguage = systemLocales[0]?.languageCode || "en";

    callback(phoneLanguage);
  },

  init: () => {},

  cacheUserLanguage: () => {},
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(deviceLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: "en",
    compatibilityJSON: "v4",
  });

export default i18n;