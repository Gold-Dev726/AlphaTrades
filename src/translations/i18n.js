import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_EN } from "./translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      useSuspense: true,
    },
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
    },
  });
if (!sessionStorage.getItem("selectedLanguage")) {
  i18n.changeLanguage("en");
} else {
  switch (sessionStorage.getItem("selectedLanguage")) {
    case "english": {
      i18n.changeLanguage("en");
      break;
    }
  }
}
i18n.on("languageChanged", function (lng) {
  // window.location.reload();
});
export default i18n;
