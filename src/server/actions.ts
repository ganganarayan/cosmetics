import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import { contentSchema, settingsSchema } from "./schema";
import * as store from "./store";
import { clearSession, requireAdmin, setSession, verifyPassword } from "./session";

// Known AI assistants / search + AI crawlers, matched case-insensitively against
// the User-Agent. Extend as new crawlers appear.
const BOT_UA: Array<[RegExp, string]> = [
  [/GPTBot/i, "GPTBot"],
  [/OAI-SearchBot/i, "OAI-SearchBot"],
  [/ChatGPT-User/i, "ChatGPT-User"],
  [/ClaudeBot/i, "ClaudeBot"],
  [/Claude-Web/i, "Claude-Web"],
  [/anthropic-ai/i, "anthropic-ai"],
  [/PerplexityBot/i, "PerplexityBot"],
  [/Perplexity-User/i, "Perplexity-User"],
  [/Google-Extended/i, "Google-Extended"],
  [/Googlebot/i, "Googlebot"],
  [/bingbot/i, "Bingbot"],
  [/Applebot/i, "Applebot"],
  [/Amazonbot/i, "Amazonbot"],
  [/meta-externalagent/i, "meta-externalagent"],
  [/Bytespider/i, "Bytespider"],
  [/CCBot/i, "CCBot"],
  [/DuckDuckBot/i, "DuckDuckBot"],
  [/YandexBot/i, "YandexBot"],
];

function classifyBot(ua: string): string | null {
  for (const [re, name] of BOT_UA) {
    if (re.test(ua)) return name;
  }
  return null;
}

// --- Public ---------------------------------------------------------------

// Settings + content injected into the public site at request time.
export const getPublicConfig = createServerFn({ method: "GET" }).handler(async () => {
  const [settings, content] = await Promise.all([store.getSettings(), store.getContent()]);
  return { settings, content };
});

export const trackView = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ path: z.string() }).parse(d))
  .handler(async ({ data }) => {
    await store.incrementPageView(data.path);
    const ua = getRequestHeader("user-agent") ?? "";
    const bot = classifyBot(ua);
    if (bot) await store.incrementBotHit(bot);
    return { ok: true as const };
  });

export const trackCta = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ location: z.string() }).parse(d))
  .handler(async ({ data }) => {
    await store.incrementCta(data.location);
    return { ok: true as const };
  });

// --- Auth -----------------------------------------------------------------

export const login = createServerFn({ method: "POST" })
  .validator((d: unknown) => z.object({ password: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (!verifyPassword(data.password)) {
      return { ok: false as const, error: "Incorrect password." };
    }
    setSession();
    return { ok: true as const };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  clearSession();
  return { ok: true as const };
});

// Used by the guarded admin layout's beforeLoad. Runs on the server, so cookie
// access works; throws a redirect to /admin/login when unauthenticated.
export const ensureAdmin = createServerFn({ method: "GET" }).handler(async () => {
  requireAdmin();
  return { ok: true as const };
});

// --- Admin (guarded) ------------------------------------------------------

export const adminGetSettings = createServerFn({ method: "GET" }).handler(async () => {
  requireAdmin();
  return store.getSettings();
});

export const adminSaveSettings = createServerFn({ method: "POST" })
  .validator((d: unknown) => settingsSchema.parse(d))
  .handler(async ({ data }) => {
    requireAdmin();
    await store.saveSettings(data);
    return { ok: true as const };
  });

export const adminGetContent = createServerFn({ method: "GET" }).handler(async () => {
  requireAdmin();
  return store.getContent();
});

export const adminSaveContent = createServerFn({ method: "POST" })
  .validator((d: unknown) => contentSchema.parse(d))
  .handler(async ({ data }) => {
    requireAdmin();
    await store.saveContent(data);
    return { ok: true as const };
  });

export const adminGetAnalytics = createServerFn({ method: "GET" }).handler(async () => {
  requireAdmin();
  return store.getAnalytics();
});
