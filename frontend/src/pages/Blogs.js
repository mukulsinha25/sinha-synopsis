

// export default Blogs;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import bgVideo from "../assets/background.mp4";

const CALLBACK_NAME = "__bloggerFeedCallback__";

const BLOGGER_JSONP_URL =
  "https://sinhasynopsis.blogspot.com/feeds/posts/default" +
  "?alt=json-in-script&callback=" +
  CALLBACK_NAME;

function Blogs() {
  console.log("✅ Blogs component mounted");

  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null);
  const [error, setError] = useState(null);

  /* 🔹 Reset popup state when Blogs page mounts */
  useEffect(() => {
    setActiveBook(null);
  }, []);

  /* 🔹 Load Blogger feed */
  useEffect(() => {
    console.log("▶️ Loading Blogger feed");

    window[CALLBACK_NAME] = (data) => {
      console.log("📥 Blogger callback fired");

      if (!data?.feed?.entry) {
        setError("No blogs found in Blogger feed");
        return;
      }

//       // NEW CODE ADDED ON 31-JAN
//         // ✅ STORE LATEST BLOG FOR HOME PAGE (SAFE, SIDE-EFFECT FREE)
// try {
//   const latestEntry = data.feed.entry[0];

//   const latestTitle = latestEntry?.title?.$t || "Latest Blog";
//   const latestUrl =
//     latestEntry?.link?.find((l) => l.rel === "alternate")?.href || "";

//   localStorage.setItem(
//     "latestBlog",
//     JSON.stringify({
//       title: latestTitle,
//       url: latestUrl,
//       updatedAt: Date.now()
//     })
//   );
// } catch (e) {
//   console.warn("Failed to cache latest blog", e);
// }



//       // END OF NEW CODE

      const formatted = data.feed.entry.map((entry, index) => {
        const titleText = entry.title?.$t || "Untitled";
        const rawText = entry.content?.$t || "";
        const cleanText = rawText.replace(/<[^>]+>/g, "");

        const postUrl =
          entry.link?.find((l) => l.rel === "alternate")?.href || "";

        return {
          id: index,

          // ✅ ADDITION #1: mark latest blog
          isLatest: index === 0,

          title:
            titleText.length > 42
              ? titleText.slice(0, 39) + "…"
              : titleText,
          excerpt:
            cleanText.split(".")[0] || "Read full story",
          postUrl: postUrl ? encodeURIComponent(postUrl) : "",
          tilt: (Math.random() * 10 - 5).toFixed(1),
          color: `hsl(${(index * 32) % 360}, 55%, 60%)`,
        };
      });

      setBooks(formatted);
    };

    // remove any stale script
    const oldScript = document.getElementById("blogger-jsonp");
    if (oldScript) oldScript.remove();

    // inject fresh script (cache-busted)
    const script = document.createElement("script");
    script.id = "blogger-jsonp";
    script.src = BLOGGER_JSONP_URL + "&_=" + Date.now();
    script.async = true;
    script.onerror = () =>
      setError("Failed to load Blogger feed");

    document.body.appendChild(script);

    return () => {
      delete window[CALLBACK_NAME];
      script.remove();
    };
  }, []);

  return (
    <div className="page blogs-page">
      {/* BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          Sinha Synopsis<span>.</span>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* BLOG LIST */}
      <section className="library">
        {error && (
          <p style={{ color: "red", zIndex: 10 }}>
            {error}
          </p>
        )}

        {!error && books.length === 0 && (
          <p style={{ color: "white", zIndex: 10 }}>
            Loading blogs…
          </p>
        )}

        {books.map((book) => {
          const isActive = activeBook === book.id;

          return (
            <div
              key={book.id}

              // ✅ ADDITION #2: apply "latest" class
              className={`book ${book.isLatest ? "latest" : ""} ${isActive ? "active" : ""}`}

              style={{
                "--tilt": `${book.tilt}deg`,
                "--color": book.color,
              }}
              onClick={() =>
                setActiveBook(isActive ? null : book.id)
              }
            >
              {/* BOOK SPINE */}
              <div className="book-spine">
                <span className="book-title">
                  {book.title}
                </span>
              </div>

              {/* BOOK DETAIL */}
              <div
                className="book-detail clickable"
                onClick={(e) => {
                  e.stopPropagation();
                  if (book.postUrl) {
                    window.open(
                      decodeURIComponent(book.postUrl),
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                }}
              >
                <h3>{book.title}</h3>
                <p>{book.excerpt}…</p>
                <span className="read-more">
                  Read full story →
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* BACKDROP */}
      {activeBook !== null && (
        <div
          className="backdrop"
          onClick={() => setActiveBook(null)}
        />
      )}
    </div>
  );
}

export default Blogs;
