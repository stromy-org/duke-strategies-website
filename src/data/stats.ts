import type { Localized } from "../i18n/pickLocale";

export type HomeStat = {
  value: number;
  suffix: string;
  label: Localized<string>;
};

export const homeStats: HomeStat[] = [
  { value: 44, suffix: "+", label: { en: "Years Combined Experience", nl: "Jaar gecombineerde ervaring" } },
  { value: 120, suffix: "+", label: { en: "Stakeholders Engaged", nl: "Stakeholders betrokken" } },
  { value: 500, suffix: "+", label: { en: "Data Points Analyzed", nl: "Datapunten geanalyseerd" } },
  { value: 92, suffix: "%", label: { en: "Employee Retention (M&A)", nl: "Personeelsretentie (M&A)" } },
];
