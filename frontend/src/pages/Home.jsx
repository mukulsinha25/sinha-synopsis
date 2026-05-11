import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBloggerFeed } from "../hooks/useBloggerFeed";

function Home() {
  const { posts, loading } = useBloggerFeed();
  const featuredPosts = posts.slice(0, 6);
  const revealRefs = useRef([]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [posts]);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="home-page">
      {/* ===== HERO ===== */}
      <section className="hero-full">
        <div className="hero-full__bg">
          <div className="hero-full__grain" />
          <div className="hero-full__gradient" />
        </div>

        <div className="hero-full__content">
          <div className="hero-full__eyebrow" ref={addRevealRef}>
            <span className="reveal-item">Blog & Stories</span>
          </div>

          <h1 className="hero-full__title" ref={addRevealRef}>
            <span className="reveal-item">Sinha</span>
            <span className="reveal-item">Synopsis<span className="dot">.</span></span>
          </h1>

          <p className="hero-full__desc" ref={addRevealRef}>
            <span className="reveal-item">
              Stories, learnings &amp; ideas shaped by experience —
              exploring technology, business, and everyday observations.
            </span>
          </p>

          <div className="hero-full__actions" ref={addRevealRef}>
            <span className="reveal-item">
              <Link to="/blogs" className="btn-pill">
                Explore Stories
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </span>
          </div>


        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>Technology</span>
            <span className="marquee-dot">●</span>
            <span>Business</span>
            <span className="marquee-dot">●</span>
            <span>Creativity</span>
            <span className="marquee-dot">●</span>
            <span>Data</span>
            <span className="marquee-dot">●</span>
            <span>Observations</span>
            <span className="marquee-dot">●</span>
            <span>Technology</span>
            <span className="marquee-dot">●</span>
            <span>Business</span>
            <span className="marquee-dot">●</span>
            <span>Creativity</span>
            <span className="marquee-dot">●</span>
            <span>Data</span>
            <span className="marquee-dot">●</span>
            <span>Observations</span>
            <span className="marquee-dot">●</span>
          </div>
        </div>
      </section>

      {/* ===== FEATURED POSTS ===== */}
      <section className="featured-section">
        <div className="featured-section__header" ref={addRevealRef}>
          <span className="reveal-item">
            <h2>Latest Stories</h2>
          </span>
          <span className="reveal-item">
            <Link to="/blogs" className="link-arrow">
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </span>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
          </div>
        ) : (
          <div className="featured-grid">
            {/* Large featured card */}
            {featuredPosts[0] && (
              <Link
                to={`/blog/${featuredPosts[0].slug}`}
                className="feat-card feat-card--large"
                ref={addRevealRef}
              >
                <div className="feat-card__img">
                  {featuredPosts[0].thumbnail ? (
                    <img src={featuredPosts[0].thumbnail} alt={featuredPosts[0].title} />
                  ) : (
                    <div className="feat-card__placeholder" />
                  )}
                  <div className="feat-card__overlay" />
                </div>
                <div className="feat-card__content">
                  <span className="feat-card__tag">
                    {featuredPosts[0].categories[0] || "Blog"}
                  </span>
                  <h3 className="feat-card__title">{featuredPosts[0].title}</h3>
                  <p className="feat-card__excerpt">{featuredPosts[0].excerpt}</p>
                  <span className="feat-card__read">Read →</span>
                </div>
              </Link>
            )}

            {/* Side cards */}
            <div className="feat-card-stack">
              {featuredPosts.slice(1, 4).map((post, i) => (
                <Link
                  to={`/blog/${post.slug}`}
                  className="feat-card feat-card--row"
                  key={post.id}
                  ref={addRevealRef}
                >
                  <div className="feat-card__img feat-card__img--sm">
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt={post.title} />
                    ) : (
                      <div className="feat-card__placeholder" />
                    )}
                  </div>
                  <div className="feat-card__content">
                    <span className="feat-card__meta">
                      {post.published.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {post.categories[0] && ` · ${post.categories[0]}`}
                    </span>
                    <h4 className="feat-card__title-sm">{post.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===== HORIZONTAL SCROLL POSTS ===== */}
      {!loading && featuredPosts.length > 3 && (
        <section className="hscroll-section" ref={addRevealRef}>
          <div className="hscroll-header reveal-item">
            <h2>More to Read</h2>
          </div>
          <div className="hscroll-track">
            {featuredPosts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                className="hscroll-card"
                key={post.id}
              >
                <div className="hscroll-card__img">
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt={post.title} />
                  ) : (
                    <div className="hscroll-card__placeholder">
                      <span>{post.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="hscroll-card__body">
                  <span className="hscroll-card__date">
                    {post.published.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h4>{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="cta-dark" ref={addRevealRef}>
        <div className="cta-dark__content reveal-item">
          <h2>Let's connect.</h2>
          <p>Ideas, collaborations, or just a hello.</p>
          <div className="cta-dark__links">
            <Link to="/contact" className="btn-pill btn-pill--light">
              Get in Touch
            </Link>
            <Link to="/about" className="btn-pill btn-pill--outline">
              About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
