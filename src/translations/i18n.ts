import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import csCZ from "./dictionary/csCZ";

const FALLBACK_LANG = "cs-CZ";

i18n.use(initReactI18next).init({
	debug: false,
	detection: {
		order: ["localStorage", "customLangDetector"],
	},
	fallbackLng: FALLBACK_LANG,
	interpolation: {
		escapeValue: false,
	},
	lng: FALLBACK_LANG,
	resources: {
		"cs-CZ": {
			...csCZ,
		},
	},
});

export default i18n;
