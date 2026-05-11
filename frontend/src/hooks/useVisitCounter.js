import { useState, useEffect } from "react";

const NAMESPACE = "sinhasynopsis";
const API_BASE = "https://api.countapi.xyz";

/**
 * Tracks and returns visit count for a given key.
 * - On first call per session, increments the counter.
 * - Returns the current count.
 */
export function useVisitCounter(key) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const sessionKey = `visited_${key}`;
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    const endpoint = alreadyCounted
      ? `${API_BASE}/get/${NAMESPACE}/${key}`
      : `${API_BASE}/hit/${NAMESPACE}/${key}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
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
