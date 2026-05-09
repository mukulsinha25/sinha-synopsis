import { useState, useEffect } from "react";

const CALLBACK_NAME = "__bloggerFeedCallback__";
const BLOGGER_JSONP_URL =
  "https://sinhasynopsis.blogspot.com/feeds/posts/default" +
  "?alt=json-in-script&callback=" +
  CALLBACK_NAME +
  "&max-results=50";

export function useBloggerFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window[CALLBACK_NAME] = (data) => {
      if (!data?.feed?.entry) {
        setError("No posts found");
        setLoading(false);
        return;
      }

      const formatted = data.feed.entry.map((entry, index) => {
        const title = entry.title?.$t || "Untitled";
        const rawContent = entry.content?.$t || "";
        const plainText = rawContent.replace(/<[^>]+>/g, "");
        const excerpt = plainText.slice(0, 160).trim() + "…";

        // Extract first image from content
        const imgMatch = rawContent.match(/<img[^>]+src="([^"]+)"/);
        const thumbnail = imgMatch ? imgMatch[1] : null;

        // Get published date
        const published = entry.published?.$t
          ? new Date(entry.published.$t)
          : new Date();

        // Create a URL-safe slug from the post URL
        const postUrl =
          entry.link?.find((l) => l.rel === "alternate")?.href || "";
        const slug = encodeURIComponent(postUrl);

        // Extract categories/tags
        const categories = entry.category
          ? entry.category.map((c) => c.term)
          : [];

        return {
          id: index,
          title,
          excerpt,
          content: rawContent,
          thumbnail,
          published,
          slug,
          postUrl,
          categories,
          isLatest: index === 0,
        };
      });

      setPosts(formatted);
      setLoading(false);
    };

    // Remove stale script
    const oldScript = document.getElementById("blogger-jsonp");
    if (oldScript) oldScript.remove();

    // Inject fresh script
    const script = document.createElement("script");
    script.id = "blogger-jsonp";
    script.src = BLOGGER_JSONP_URL + "&_=" + Date.now();
    script.async = true;
    script.onerror = () => {
      setError("Failed to load blog feed");
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      delete window[CALLBACK_NAME];
      script.remove();
    };
  }, []);

  return { posts, loading, error };
}
