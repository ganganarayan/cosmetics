// Server-only JSON data layer. Persists under DATA_DIR (a Railway volume in
// production). Kept deliberately small and swappable — moving to SQLite/Postgres
// later means reimplementing only this module.
import "@tanstack/react-start/server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { randomUUID } from "node:crypto";

import {
  analyticsSchema,
  contentSchema,
  DEFAULT_ANALYTICS,
  DEFAULT_CONTENT,
  DEFAULT_SETTINGS,
  settingsSchema,
  type Analytics,
  type Content,
  type Settings,
} from "./schema";
import { z } from "zod";

const DATA_DIR = process.env["DATA_DIR"] ?? "./data";

const FILES = {
  settings: "settings.json",
  content: "content.json",
  analytics: "analytics.json",
} as const;

// Per-file write queue so concurrent writes to the same file never interleave.
const locks = new Map<string, Promise<unknown>>();
function withLock<T>(file: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(file) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(
    file,
    next.catch(() => {}),
  );
  return next;
}

async function readJson<T>(file: string, schema: z.ZodType<T>, fallback: T): Promise<T> {
  try {
    const raw = await readFile(join(DATA_DIR, file), "utf8");
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, schema: z.ZodType<T>, value: T): Promise<T> {
  const data = schema.parse(value);
  return withLock(file, async () => {
    const path = join(DATA_DIR, file);
    await mkdir(dirname(path), { recursive: true });
    const tmp = `${path}.${randomUUID()}.tmp`;
    await writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
    await rename(tmp, path);
    return data;
  });
}

// --- Settings -------------------------------------------------------------
// On first read (no file yet) seed from env so a fresh deploy keeps whatever
// VITE_* values were already configured, then becomes admin-editable.
function seededSettings(): Settings {
  return settingsSchema.parse({
    assessmentUrl: process.env["VITE_ASSESSMENT_URL"] ?? DEFAULT_SETTINGS.assessmentUrl,
    metaPixelId: process.env["VITE_META_PIXEL_ID"] ?? DEFAULT_SETTINGS.metaPixelId,
    ga4Id: process.env["VITE_GA4_MEASUREMENT_ID"] ?? DEFAULT_SETTINGS.ga4Id,
    contactEmail: DEFAULT_SETTINGS.contactEmail,
    whatsappNumber: DEFAULT_SETTINGS.whatsappNumber,
  });
}

export function getSettings(): Promise<Settings> {
  return readJson(FILES.settings, settingsSchema, seededSettings());
}
export function saveSettings(value: Settings): Promise<Settings> {
  return writeJson(FILES.settings, settingsSchema, value);
}

// --- Content --------------------------------------------------------------
export function getContent(): Promise<Content> {
  return readJson(FILES.content, contentSchema, DEFAULT_CONTENT);
}
export function saveContent(value: Content): Promise<Content> {
  return writeJson(FILES.content, contentSchema, value);
}

// --- Analytics (lightweight aggregate counters) ---------------------------
export function getAnalytics(): Promise<Analytics> {
  return readJson(FILES.analytics, analyticsSchema, DEFAULT_ANALYTICS);
}
export async function incrementPageView(path: string): Promise<void> {
  const a = await getAnalytics();
  a.pageViews[path] = (a.pageViews[path] ?? 0) + 1;
  a.updatedAt = new Date().toISOString();
  await writeJson(FILES.analytics, analyticsSchema, a);
}
export async function incrementCta(location: string): Promise<void> {
  const a = await getAnalytics();
  a.ctaClicks[location] = (a.ctaClicks[location] ?? 0) + 1;
  a.updatedAt = new Date().toISOString();
  await writeJson(FILES.analytics, analyticsSchema, a);
}
export async function incrementBotHit(bot: string): Promise<void> {
  const a = await getAnalytics();
  a.botHits[bot] = (a.botHits[bot] ?? 0) + 1;
  a.updatedAt = new Date().toISOString();
  await writeJson(FILES.analytics, analyticsSchema, a);
}
