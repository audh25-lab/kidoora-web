import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { appName: "KidooraMV", start: "Start", learn: "Learn", play: "Play", onboardingTitle: "Tell us about you", selectAge: "Select your age", selectLanguage: "Choose language" } },
  dv: { translation: { appName: "KidooraMV", start: "ސްޓާޓް", learn: "ލިޔުން", play: "ޕްލޭ", onboardingTitle: "ކައިރީ އެއްޗެއް", selectAge: "އާންމުން އަސްލުން ހުރިހާ", selectLanguage: "ބައިވަން ބަސް ހަދާންޖެ" } }
};

i18n.use(initReactI18next).init({ resources, lng: "en", fallbackLng: "en", interpolation: { escapeValue: false } });

export default i18n;