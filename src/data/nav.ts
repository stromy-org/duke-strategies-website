import type { UIKey } from "../i18n/ui.en";

export type NavItem = {
  labelKey: UIKey;
  href: string;
};

/** Navigation items — hrefs are locale-relative (no prefix). */
export const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.who-we-are", href: "/who-we-are" },
  { labelKey: "nav.what-we-do", href: "/what-we-do" },
  { labelKey: "nav.duke-academy", href: "/duke-academy" },
  { labelKey: "nav.insights", href: "/insights" },
  { labelKey: "nav.contact", href: "/contact" },
];
