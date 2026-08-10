// Server-only auth: single admin, password from env, signed cookie session.
// The plaintext password lives only in the ADMIN_PASSWORD env var — never in
// code or git. Sessions are stateless HMAC-signed tokens.
import "@tanstack/react-start/server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const isProd = process.env["NODE_ENV"] === "production";

function secret(): string {
  const s = process.env["SESSION_SECRET"];
  if (s && s.length > 0) return s;
  // Dev fallback so local runs don't crash; production MUST set SESSION_SECRET.
  if (isProd) {
    console.error("SESSION_SECRET is not set — admin sessions are insecure.");
  }
  return "dev-insecure-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env["ADMIN_PASSWORD"] ?? "";
  if (expected.length === 0) return false; // login disabled until a password is set
  // Compare HMACs of equal length to avoid leaking length via timing.
  return safeEqual(sign(`pw:${input}`), sign(`pw:${expected}`));
}

export function setSession(): void {
  const issuedAt = Date.now().toString();
  const token = `${issuedAt}.${sign(issuedAt)}`;
  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export function clearSession(): void {
  deleteCookie(COOKIE_NAME, { path: "/" });
}

export function isAuthed(): boolean {
  const token = getCookie(COOKIE_NAME);
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const issuedAt = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(issuedAt))) return false;
  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age >= 0 && age < MAX_AGE_SECONDS * 1000;
}

export function requireAdmin(): void {
  if (!isAuthed()) {
    throw redirect({ to: "/admin/login" });
  }
}
