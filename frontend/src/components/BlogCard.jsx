import { Link } from "react-router-dom";

function BlogCard({ post, featured = false }) {
  const formattedDate = post.published.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className={`blog-card ${featured ? "blog-card--featured" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        {post.thumbnail && (
          <div className="blog-card__image">
            <img src={post.thumbnail} alt={post.title} loading="lazy" />
          </div>
        )}
        <div className="blog-card__body">
          <div className="blog-card__meta">
            <time dateTime={post.published.toISOString()}>{formattedDate}</time>
            {post.categories.length > 0 && (
              <span className="blog-card__tag">{post.categories[0]}</span>
            )}
            {post.isLatest && <span className="blog-card__badge">New</span>}
          </div>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

export default BlogCard;
