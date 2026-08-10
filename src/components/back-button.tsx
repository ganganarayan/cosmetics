import { useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

// Small "Back" control for the top-left of interior pages. Returns to the
// previous page in history; if there's no history (e.g. opened in a new tab or
// landed directly), it falls back to the home page.
export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  function goBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      void router.navigate({ to: "/" });
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.85rem] text-muted-foreground transition-colors hover:text-ink",
        className,
      )}
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}
