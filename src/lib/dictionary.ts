import "server-only";
import type { Dictionary, Locale } from "@/types/dictionary";

const dictionaries = {
  es: () => import("@/content/es.json").then((module) => module.default),
  en: () => import("@/content/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => 
  dictionaries[locale]?.() ?? dictionaries.es();
