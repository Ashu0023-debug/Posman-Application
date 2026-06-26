import React from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <img
            src="/postman-logo.png"
            alt="Postman Logo"
            className="postman-logo"
          />
          <h2 className="logo-text">Postman Clone</h2>
        </div>

        <div className="nav-buttons">
          <button
            onClick={() => navigate("/login")}
            className="nav-btn nav-btn-primary"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="nav-btn nav-btn-primary"
          >
            Sign Up for Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            AI needs context. <span>APIs deliver it.</span>
          </h1>
          <p>
            Build, test, and manage APIs that connect your applications and
            empower teams to work faster together.
          </p>

          <div className="cta-buttons">
            <button
              onClick={() => navigate("/register")}
              className="btn-primary"
            >
              Get Started for Free
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80"
            alt="Postman Clone API Dashboard"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
