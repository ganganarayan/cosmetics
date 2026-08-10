import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a raw WhatsApp number (digits only, e.g. "919356819176") for display,
// e.g. "+91 93568 19176". Falls back to a simple "+<digits>" for other formats.
export function formatWhatsApp(digits: string): string {
  const d = (digits ?? "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  return d ? `+${d}` : "";
}
