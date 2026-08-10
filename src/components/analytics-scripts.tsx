import { useEffect } from "react";
import { useSiteConfig } from "@/components/site-config";

// Injects GA4 + Meta Pixel base scripts on the client using the runtime IDs
// from settings, so enabling analytics is a dashboard change, not a redeploy.
export function AnalyticsScripts() {
  const { settings } = useSiteConfig();
  const { ga4Id, metaPixelId } = settings;

  useEffect(() => {
    if (!ga4Id) return;
    if (document.getElementById("ga4-src")) return;
    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(s);
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", ga4Id);
  }, [ga4Id]);

  useEffect(() => {
    if (!metaPixelId) return;
    const w = window as unknown as { fbq?: ((...a: unknown[]) => void) & { loaded?: boolean } };
    if (w.fbq) return;
    /* eslint-disable */
    (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    const fbq = (window as unknown as { fbq: (...a: unknown[]) => void }).fbq;
    fbq("init", metaPixelId);
    fbq("track", "PageView");
  }, [metaPixelId]);

  return null;
}
