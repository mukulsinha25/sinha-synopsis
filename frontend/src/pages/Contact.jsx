// import "../App.css";
// import bgVideo from "../assets/background.mp4";
// import { Link } from "react-router-dom";


// function Contact() {
//   return (
//     <div className="page">

//       {/* VIDEO BACKGROUND */}
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
//           <a href="/">Home</a>
//           <a href="/about">About</a>
//           <a href="/contact">Contact</a>
//         </nav>
//       </header>

//       {/* CONTACT CONTENT */}
//       <section className="contact">

//         {/* LEFT – ANIMATION */}
//         <div className="contact-left">
//           <div className="orbit">
//             <span className="dot dot-1" />
//             <span className="dot dot-2" />
//             <span className="dot dot-3" />
//           </div>
//         </div>

//         {/* RIGHT – CONTACT LINKS */}
//         <div className="contact-right">
//           <span className="contact-eyebrow">Get in touch</span>

//           <h1>Let’s talk.</h1>

//           {/* EMAIL */}
//           <a href="mailto:mukulsinha25@gmail.com" className="contact-item svg-link">
//             <svg viewBox="0 0 24 24" className="icon">
//               <path d="M3 6h18v12H3z" />
//               <path d="M3 6l9 7 9-7" />
//             </svg>
//             <span>mukulsinha25@gmail.com</span>
//           </a>

//           {/* LINKEDIN */}
//           <a
//             href="https://www.linkedin.com/in/mukulsinha25/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="contact-item svg-link"
//           >
//             <svg viewBox="0 0 24 24" className="icon">
//               <path d="M4 4h16v16H4z" />
//               <path d="M8 10v6" />
//               <path d="M8 7v.01" />
//               <path d="M12 10v6" />
//               <path d="M12 13c0-2 4-2 4 0v3" />
//             </svg>
//             <span>Linkedin- Mukul Sinha</span>
//           </a>

//           <p className="contact-note">
//             Ideas, collaborations, or just a hello — my inbox is always open.
//           </p>
//         </div>

//       </section>
//     </div>
//   );
// }

// export default Contact;

import "../App.css";
import bgVideo from "../assets/background.mp4";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="page contact-page">

      {/* VIDEO BACKGROUND */}
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
          <Link to="/blogs">Blogs</Link>
          {/* <Link to="/contact">Contact</Link> */}
        </nav>
      </header>

      {/* CONTACT CONTENT */}
      <section className="contact">

        {/* LEFT – ANIMATION */}
        <div className="contact-left">
          <div className="orbit">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
          </div>
        </div>

        {/* RIGHT – CONTACT LINKS */}
        <div className="contact-right">
          <span className="contact-eyebrow">Get in touch</span>

          <h1>Let’s talk.</h1>

          {/* EMAIL */}
          <a
            href="mailto:mukulsinha25@gmail.com"
            className="contact-item svg-link"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M3 6h18v12H3z" />
              <path d="M3 6l9 7 9-7" />
            </svg>
            <span>mukulsinha25@gmail.com</span>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/mukulsinha25/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item svg-link"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M4 4h16v16H4z" />
              <path d="M8 10v6" />
              <path d="M8 7v.01" />
              <path d="M12 10v6" />
              <path d="M12 13c0-2 4-2 4 0v3" />
            </svg>
            <span>LinkedIn – https://www.linkedin.com/in/mukulsinha25/</span>
          </a>

          <p className="contact-note">
            Ideas, collaborations, or just a hello , my inbox is always open.
          </p>
        </div>

      </section>
    </div>
  );
}

export default Contact;