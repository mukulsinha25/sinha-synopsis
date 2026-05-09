import { useState } from "react";
import { useBloggerFeed } from "../hooks/useBloggerFeed";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const { posts, loading, error } = useBloggerFeed();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories
  const allCategories = ["All", ...new Set(posts.flatMap((p) => p.categories))];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.categories.includes(selectedCategory));

  if (error) {
    return (
      <div className="blogs-page">
        <div className="error-state">
          <p>Something went wrong loading the blog posts.</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1>Blog</h1>
        <p>Thoughts on technology, business, and life.</p>
      </div>

      {/* Category Filter */}
      {allCategories.length > 1 && (
        <div className="category-filter">
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
