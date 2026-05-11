import { useState, useEffect } from "react";

const NAMESPACE = "sinhasynopsis";
const API_BASE = "https://api.counterapi.dev/v1";

/**
 * Tracks and returns visit count for a given key.
 * - On first call per session, increments the counter.
 * - Returns the current count.
 */
export function useVisitCounter(key) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 50) || "default";
    const sessionKey = `visited_${safeKey}`;
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    const endpoint = alreadyCounted
      ? `${API_BASE}/${NAMESPACE}/${safeKey}`
      : `${API_BASE}/${NAMESPACE}/${safeKey}/up`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          setCount(data.count);
        }
        if (!alreadyCounted) {
          sessionStorage.setItem(sessionKey, "true");
        }
      })
      .catch(() => {
        // Silently fail — don't break the page
        setCount(null);
      });
  }, [key]);

  return count;
}
