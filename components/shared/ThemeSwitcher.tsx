"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Theme toggle using the View Transitions API (Chrome 111+, Firefox 130+).
 *
 * HOW IT WORKS:
 *   document.startViewTransition() tells the browser to:
 *     1. Capture a GPU screenshot of the current page ("old" snapshot)
 *     2. Run our callback (setTheme → next-themes swaps .dark on <html> → CSS vars change instantly)
 *     3. Capture a GPU screenshot of the new page ("new" snapshot)
 *     4. Cross-fade the two snapshots at the compositor level — no JS, no repaints, no layout
 *
 * WHY THIS BEATS lockTransition():
 *   lockTransition injects a <style> forcing transitions on every * element.
 *   That triggers a full style-recalculation + repaint on every DOM node at once = jitter.
 *   View Transitions bypass all that — it's a GPU texture blend, not a CSS transition storm.
 *
 * FALLBACK:
 *   Browsers without startViewTransition get an instant swap (no jank, just no animation).
 */

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    // Primary: View Transitions API — compositor-level GPU cross-fade, zero jank
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition(() => {
        setTheme(next);
      });
      return;
    }

    // Fallback: instant swap (no animation, but also no jank)
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    // Placeholder matches the button size to avoid layout shift
    return <div style={{ width: "5.5rem", height: "2.25rem", borderRadius: "999px", background: "var(--cream-3)" }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.35rem 0.85rem 0.35rem 0.5rem",
        borderRadius: "999px",
        border: "1px solid var(--card-border)",
        background: "var(--surface-1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        cursor: "pointer",
        fontSize: "0.8rem",
        fontWeight: 600,
        fontFamily: "var(--font-display)",
        color: "var(--ink-1)",
        letterSpacing: "-0.01em",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "50%",
          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
        }}
      >
        {isDark ? (
          <Sun size={13} strokeWidth={2.5} style={{ color: "#f59e0b" }} />
        ) : (
          <Moon size={13} strokeWidth={2.5} style={{ color: "#6d28d9" }} />
        )}
      </span>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
