// Indian-system number formatting for rupee figures.

export function formatINR(value: number): string {
  return "\u20B9" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

export function formatIndianWords(value: number): string {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `\u2248 \u20B9${cr.toFixed(cr < 10 ? 2 : 1)} crore a month`;
  }
  if (value >= 100000) {
    const lakh = value / 100000;
    return `\u2248 \u20B9${lakh.toFixed(lakh < 10 ? 2 : 1)} lakh a month`;
  }
  return `\u2248 ${formatINR(value)} a month`;
}
