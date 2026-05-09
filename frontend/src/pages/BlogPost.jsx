import { useParams, Link } from "react-router-dom";
import { useBloggerFeed } from "../hooks/useBloggerFeed";
import { useEffect } from "react";

function BlogPost() {
  const { slug } = useParams();
  const { posts, loading, error } = useBloggerFeed();

  const decodedSlug = decodeURIComponent(slug);
  const post = posts.find((p) => p.postUrl === decodedSlug);

  // Scroll to top when post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <div className="error-state">
          <h2>Post not found</h2>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="btn btn-primary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.published.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (average 200 words per minute)
  const plainText = post.content.replace(/<[^>]+>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="blog-post-page">
      <article className="blog-post">
        {/* Back navigation */}
        <Link to="/blogs" className="back-link">
          ← Back to Blog
        </Link>

        {/* Post header */}
        <header className="blog-post__header">
          <div className="blog-post__meta">
            <time dateTime={post.published.toISOString()}>{formattedDate}</time>
            <span className="meta-separator">·</span>
            <span>{readingTime} min read</span>
            {post.categories.length > 0 && (
              <>
                <span className="meta-separator">·</span>
                <span className="blog-post__category">{post.categories[0]}</span>
              </>
            )}
          </div>
          <h1 className="blog-post__title">{post.title}</h1>
        </header>

        {/* Post content */}
        <div
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post footer */}
        <footer className="blog-post__footer">
          <div className="share-section">
            <span>Share this post:</span>
            <div className="share-links">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
                aria-label="Share on Twitter"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
                aria-label="Share on LinkedIn"
              >
                in
              </a>
              <button
                className="share-btn"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                aria-label="Copy link"
              >
                🔗
              </button>
            </div>
          </div>

          <Link to="/blogs" className="btn btn-secondary">
            ← More Posts
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default BlogPost;
