import { z } from "zod";

// ---------------------------------------------------------------------------
// Settings — runtime-editable configuration that replaces build-time env vars.
// ---------------------------------------------------------------------------
export const settingsSchema = z.object({
  assessmentUrl: z.string().default("#"),
  metaPixelId: z.string().default(""),
  ga4Id: z.string().default(""),
  contactEmail: z.string().default("connect@divineleads.guru"),
  whatsappNumber: z.string().default("919356819176"),
});
export type Settings = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS: Settings = settingsSchema.parse({});

// ---------------------------------------------------------------------------
// Content — the bounded set of landing-page copy that the admin can edit.
// Deeper structured lists (pricing, steps, fit lists) stay in code for now.
// ---------------------------------------------------------------------------
export const faqItemSchema = z.object({ q: z.string(), a: z.string() });
export type FaqItem = z.infer<typeof faqItemSchema>;

export const contentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subcopy: z.string(),
    specialties: z.string(),
  }),
  offer: z.object({
    statement: z.string(),
    tagline: z.string(),
  }),
  faq: z.object({
    heading: z.string(),
    items: z.array(faqItemSchema),
  }),
  finalCta: z.object({
    heading: z.string(),
    subcopy: z.string(),
  }),
});
export type Content = z.infer<typeof contentSchema>;

export const DEFAULT_CONTENT: Content = {
  hero: {
    eyebrow: "For aesthetic, dental, hair-transplant and elective clinics",
    headline:
      "Most clinics don’t have a lead problem. They have a gap between the enquiry and the chair.",
    subcopy:
      "Booking rates fall by more than half after the first five minutes, and by roughly eighty percent after the first hour. We install the engine that owns those first ninety minutes — instant response at any hour, follow-up that doesn’t stop at message two, and booking straight into your calendar.",
    specialties:
      "Hair transplant · Aesthetic dermatology · Cosmetic dentistry · Bariatric · Fertility & IVF",
  },
  offer: {
    statement:
      "We don’t sell you leads. We install the system that turns the enquiries you already get into consultations that actually show up — instant response, follow-up that doesn’t stop at message two, and booking straight into your calendar. You keep doing medicine. The engine handles everything before the chair.",
    tagline: "The AI patient-engine for clinics — booked consultations on autopilot.",
  },
  faq: {
    heading: "The questions clinic owners actually ask.",
    items: [
      {
        q: "₹1 lakh a month is a lot.",
        a: "It is a real number, so put it next to the figure on your own scorecard. If the recoverable value sitting in your enquiries is smaller than the retainer, we should not work together yet.",
      },
      {
        q: "We tried automation and patients hated it.",
        a: "They hated bad automation — generic, slow, obviously robotic. Speed is what patients actually want; they simply want it to sound like the clinic. Everything we install is written in your clinic's voice and escalates to a human at the right moment.",
      },
      {
        q: "Can we do a trial month?",
        a: "No. Setup work is front-loaded and a single month guarantees a bad result. If you are not ready for a proper install, take the scorecard and act on it yourself.",
      },
      {
        q: "Is this compliant / discreet?",
        a: "Patient enquiries stay in your systems. Communication is discreet by design, because discretion is why patients hesitate to enquire in the first place. We handle marketing data, never clinical records.",
      },
      {
        q: "What do you actually guarantee?",
        a: "Response time, follow-up persistence, and booking flow. Never a number of patients — nobody honest can promise that.",
      },
    ],
  },
  finalCta: {
    heading: "The report is yours either way.",
    subcopy:
      "Twelve questions, four minutes. The full diagnosis appears on screen the moment you finish — no email wall, no call required.",
  },
};

// ---------------------------------------------------------------------------
// Leads — inbox records. No on-site capture form yet; addLead is ready to wire.
// ---------------------------------------------------------------------------
export const leadSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string().default(""),
  clinic: z.string().default(""),
  city: z.string().default(""),
  contact: z.string().default(""),
  message: z.string().default(""),
  source: z.string().default("website"),
});
export type Lead = z.infer<typeof leadSchema>;

export const leadInputSchema = leadSchema.omit({ id: true, createdAt: true }).partial().extend({
  name: z.string().optional(),
});
export type LeadInput = z.infer<typeof leadInputSchema>;

// ---------------------------------------------------------------------------
// Analytics — lightweight first-party counters. GA4/Meta remain the rich source.
// ---------------------------------------------------------------------------
export const analyticsSchema = z.object({
  pageViews: z.record(z.string(), z.number()).default({}),
  ctaClicks: z.record(z.string(), z.number()).default({}),
  updatedAt: z.string().default(""),
});
export type Analytics = z.infer<typeof analyticsSchema>;

export const DEFAULT_ANALYTICS: Analytics = analyticsSchema.parse({});
