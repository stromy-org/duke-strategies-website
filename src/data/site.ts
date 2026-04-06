import type { Localized } from "../i18n/pickLocale";

export const site = {
  name: "Duke Strategies",
  legalName: "Duke Strategy & Corporate Affairs B.V.",
  url: "https://dukestrategies.com",
  title: { en: "Corporate Strategy, Corporate Affairs and Stakeholder Advisory", nl: "Bedrijfsstrategie, corporate affairs en stakeholder advisory" } as Localized<string>,
  tagline: "Bridging Strategy and Impact",
  description: {
    en: "Duke Strategies is a strategic communications and public affairs consultancy operating at the intersection of corporate strategy, corporate affairs, and stakeholder advisory.",
    nl: "Duke Strategies is een adviesbureau voor strategische communicatie en public affairs dat opereert op het snijvlak van bedrijfsstrategie, corporate affairs en stakeholderadvies.",
  } as Localized<string>,
  footerDescription: {
    en: "We build bridges between business leaders and their stakeholders, combining corporate strategy with stakeholder advisory to create lasting impact.",
    nl: "Wij bouwen bruggen tussen bedrijfsleiders en hun stakeholders en combineren bedrijfsstrategie met stakeholderadvies om blijvende impact te creëren.",
  } as Localized<string>,
  office: {
    street: "Hambakenwetering 1",
    postalCode: "5231 DD",
    city: "'s-Hertogenbosch",
    country: "The Netherlands",
    lat: 51.7095,
    lon: 5.2827,
    bbox: [5.2747, 51.7055, 5.2907, 51.7135] as [number, number, number, number],
  },
  contact: {
    email: "mail@dukestrategies.eu",
    phoneDisplay: "+31 85 212 94 14",
    phoneHref: "tel:+31852129414",
    linkedin: "https://www.linkedin.com/company/duke-strategies/",
  },
  analytics: {
    provider: "plausible",
    domain: "dukestrategies.com",
  },
  marqueeItems: [
    "Strategic Advisory",
    "Crisis Communications",
    "Stakeholder Mapping",
    "M&A Communications",
    "Media Training",
    "Issue Management",
    "Change Management",
    "Data & Insights",
  ],
};

export type SiteData = typeof site;
