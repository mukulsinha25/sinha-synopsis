const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BLOGGER_FEED_URL =
  "https://sinhasynopsis.blogspot.com/feeds/posts/default?alt=json&max-results=50";

// Proxy endpoint for Blogger feed (avoids CORS issues)
app.get("/api/posts", async (req, res) => {
  try {
    const response = await fetch(BLOGGER_FEED_URL);
    if (!response.ok) {
      throw new Error(`Blogger API returned ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch Blogger feed:", err.message);
    res.status(502).json({ error: "Failed to fetch blog posts" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
