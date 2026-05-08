import "server-only";

const dictionaries = {
  es: () => import("@/content/es.json").then((module) => module.default),
  en: () => import("@/content/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "es" | "en") => 
  dictionaries[locale]?.() ?? dictionaries.es();
