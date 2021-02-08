import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import nl from "locales/nl";

const resources = {
  nl,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "nl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
