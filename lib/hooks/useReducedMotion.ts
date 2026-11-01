import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMatches(mediaQuery.matches);

    const onChange = () => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return matches;
}
