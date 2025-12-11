import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const deviceLanguage = getLocales()[0]?.languageCode || "en";

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: deviceLanguage,
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;