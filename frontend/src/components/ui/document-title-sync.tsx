"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const APP_NAME = "Oynx Interactive";

const ROUTE_TITLES: Record<string, string> = {
  "/": APP_NAME,
  "/about": "About",
  "/careers": "Careers",
  "/contact": "Contact",
  "/services": "Services",
  "/work": "Work",
  "/legal/privacy": "Privacy Policy",
  "/legal/terms": "Terms of Service",
};

function formatSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getTitleFromPath(pathname: string) {
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return APP_NAME;

  const last = parts[parts.length - 1];
  const parent = parts[parts.length - 2];

  if (last === "page") return APP_NAME;
  if (last === "slug" || last.startsWith("[") || last === "index") {
    return parent ? formatSegment(parent) : APP_NAME;
  }

  return formatSegment(last);
}

export function DocumentTitleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const pageTitle = getTitleFromPath(pathname);
    document.title = pageTitle === APP_NAME ? APP_NAME : `${pageTitle} - ${APP_NAME}`;
  }, [pathname]);

  return null;
}
