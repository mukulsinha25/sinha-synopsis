
// import "./App.css";
// import profilePic from "./assets/mukul.jpeg";
// import bgVideo from "./assets/background.mp4";

// import { Routes, Route, Link } from "react-router-dom";

// import About from "./pages/About";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import BlogReader from "./pages/BlogReader";

// /* ---------------- HOME PAGE ---------------- */

// function Home() {
//   return (
//     <div className="page home-page">
//       {/* VIDEO BACKGROUND */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src={bgVideo} type="video/mp4" />
//       </video>
//       <div className="video-overlay" />

//       <header className="header">
//         <div className="logo">
//           Sinha Synopsis<span>.</span>
//         </div>

//   {/* same menu */}

//         <nav className="nav">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/blogs">Blogs</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>

//         <div className="menu">
//           <span />
//           <span />
//           <span />
//         </div>
//       </header>

//        {/* NEW CODE ADDED ON 31-JAN */}

//         {/* END OF NEW CODE */}

//       {/* HERO */}
//       <section className="hero">
//         <div className="hero-left">
//           <span className="eyebrow"></span>

//           <h1 className="hero-title fade-in">
//             Sinha Synopsis
//           </h1>

//           <p className="hero-desc fade-in-delay">
//             Stories, learnings, and ideas shaped by experience — presented with
//             clarity and creativity.
//           </p>

//           <Link
//             to="/blogs"
//             className="hero-cta fade-in-delay-2"
//           >
//             Start Reading
//           </Link>
//         </div>

 

//         <div className="hero-right">
//           <div className="sun-wrapper">
//             <svg
//               className="sun"
//               width="240"
//               height="240"
//               viewBox="0 0 200 200"
//             >
//               <circle cx="100" cy="100" r="42" fill="#FDBA5F" />
//               {[...Array(12)].map((_, i) => (
//                 <rect
//                   key={i}
//                   x="98"
//                   y="10"
//                   width="4"
//                   height="20"
//                   rx="2"
//                   fill="#FDBA5F"
//                   transform={`rotate(${i * 30} 100 100)`}
//                 />
//               ))}
//             </svg>
//           </div>
//         </div>
//       </section>

//       {/* FLOATING PROFILE */}
//       <Link to="/about" className="floating-profile">
//         <img src={profilePic} alt="Sinha Synopsis" />
//       </Link>
//     </div>
//   );
// }

// /* ---------------- APP ROUTES ---------------- */

// export default function App() {
//   return (
//     <Routes>
//       <Route index element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/blogs" element={<Blogs />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/blog/:id" element={<BlogReader />} />
//     </Routes>
//   );
// }


import "./App.css";
import profilePic from "./assets/mukul.jpeg";
import bgVideo from "./assets/background.mp4";

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import BlogReader from "./pages/BlogReader";

/* ---------------- HOME PAGE ---------------- */

function Home() {
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("latestBlog");
    if (saved) {
      try {
        setLatestBlog(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse latestBlog from localStorage");
      }
    }
  }, []);

  return (
    <div className="page home-page">
      {/* VIDEO BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      <header className="header">
        <div className="logo">
          Sinha Synopsis<span>.</span>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="menu">
          <span />
          <span />
          <span />
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow"></span>

          <h1 className="hero-title fade-in">
            Sinha Synopsis
          </h1>

          <p className="hero-desc fade-in-delay">
            Stories, learnings, and ideas shaped by experience — presented with
            clarity and creativity.
          </p>

          <Link
            to="/blogs"
            className="hero-cta fade-in-delay-2"
          >
            Start Reading
          </Link>

          {/* ✅ LATEST BLOG (AUTO) */}
          {latestBlog && (
            <a
              href={latestBlog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="latest-blog-link fade-in-delay-3"
            >
              <div className="featured-book">
                <span className="featured-label">Latest Blog</span>

                <div className="book-spine featured">
                  <span className="book-title">
                    {latestBlog.title}
                  </span>
                </div>
              </div>
            </a>
          )}
        </div>

        <div className="hero-right">
          <div className="sun-wrapper">
            <svg
              className="sun"
              width="240"
              height="240"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="42" fill="#FDBA5F" />
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="98"
                  y="10"
                  width="4"
                  height="20"
                  rx="2"
                  fill="#FDBA5F"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* FLOATING PROFILE */}
      <Link to="/about" className="floating-profile">
        <img src={profilePic} alt="Sinha Synopsis" />
      </Link>
    </div>
  );
}

/* ---------------- APP ROUTES ---------------- */

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog/:id" element={<BlogReader />} />
    </Routes>
  );
}