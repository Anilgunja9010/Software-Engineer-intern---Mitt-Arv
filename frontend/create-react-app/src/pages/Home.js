import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const token = localStorage.getItem("token");
  return (
    <div className="home-container">
      <h1 className="hero-title">Stories, Ideas, and Perspectives</h1>
      <p className="hero-subtitle">
        Read the best writing on topics that matter to you.
      </p>
      <div className="hero-buttons">
        <Link to="/create" className="btn-primary">Write a Story</Link>
        <Link to="/blogs" className="btn-secondary">Explore All</Link>
        {token && <Link to = "/profile"> Profile</Link>}
      </div>
    </div>
  );
}

export default Home;