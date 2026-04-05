import { navItems } from "./nav";

export const site = {
  name: "Duke Strategies",
  legalName: "Duke Strategy & Corporate Affairs B.V.",
  url: "https://dukestrategies.com",
  title: "Corporate Strategy, Corporate Affairs and Stakeholder Advisory",
  tagline: "Bridging Strategy and Impact",
  description:
    "Duke Strategies is a strategic communications and public affairs consultancy operating at the intersection of corporate strategy, corporate affairs, and stakeholder advisory.",
  footerDescription:
    "We build bridges between business leaders and their stakeholders, combining corporate strategy with stakeholder advisory to create lasting impact.",
  navItems,
  office: {
    street: "Hambakenwetering 1",
    postalCode: "5231 DD",
    city: "'s-Hertogenbosch",
    country: "The Netherlands",
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
