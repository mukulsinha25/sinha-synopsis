

// import { useParams, Link } from "react-router-dom";
// import "../App.css";
// import bgVideo from "../assets/background.mp4";

// function BlogReader() {
//   const { id } = useParams();
//   const decodedUrl = decodeURIComponent(id);

//   return (
//     <div className="page blog-reader">
//       {/* BACKGROUND */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src={bgVideo} type="video/mp4" />
//       </video>
//       <div className="video-overlay" />

//       {/* HEADER */}
//       <header className="header">
//         <div className="logo">
//           Sinha Synopsis<span>.</span>
//         </div>
//         <nav className="nav">
//           <Link to="/blogs">← Back to Library</Link>
//         </nav>
//       </header>

//       {/* BLOG IFRAME */}
//       <div className="iframe-wrapper">
//         <iframe
//           src={decodedUrl}
//           title="Blog post"
//           loading="lazy"
//         />
//       </div>
//     </div>
//   );
// }




import "../App.css";

function Blogs() {
  console.log("🔥 BLOG PAGE MOUNTED");

  return (
    <div
      style={{
        color: "white",
        padding: "100px",
        fontSize: "32px",
        zIndex: 9999,
      }}
    >
      BLOG PAGE IS RENDERING
    </div>
  );
}

export default Blogs;
