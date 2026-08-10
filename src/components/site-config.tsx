import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_CONTENT, DEFAULT_SETTINGS, type Content, type Settings } from "@/server/schema";

export type SiteConfig = { settings: Settings; content: Content };

const FALLBACK: SiteConfig = { settings: DEFAULT_SETTINGS, content: DEFAULT_CONTENT };

const SiteConfigContext = createContext<SiteConfig>(FALLBACK);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig;
  children: ReactNode;
}) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}
