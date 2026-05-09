import profilePic from "../assets/mukul.jpeg";

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-image">
          <img src={profilePic} alt="Mukul Sinha" />
        </div>

        <div className="about-content">
          <h1>About</h1>
          <h2>Curious Thinker, Data Professional &amp; Creative Storyteller.</h2>

          <p>
            I work at the intersection of data, logic, and creativity — breaking
            down complex ideas and turning them into simple, meaningful insights
            that connect with people.
          </p>

          <p>
            Through this blog, I explore technology, business, and everyday
            observations, blending analytical thinking with imagination to share
            perspectives that are practical, thoughtful, and a little
            unconventional.
          </p>

          <div className="about-links">
            <a
              href="https://www.linkedin.com/in/mukulsinha25/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn
            </a>
            <a href="mailto:mukulsinha25@gmail.com" className="btn btn-secondary">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
