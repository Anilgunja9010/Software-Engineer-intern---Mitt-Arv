import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data.user);
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (!profile) return <h2>Profile not found. Please log in again.</h2>;

  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={profile.profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>{profile.username}</h2>
            <p>{profile.email}</p>
          </div>
        </div>

        <div className="profile-right">
          <button
            className="create-blog-btn"
            onClick={() => navigate("/create-blog")}
          >
            Create Blog
          </button>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="profile-blogs">
        <h3>My Blogs</h3>
        {blogs.length === 0 ? (
          <p>No blogs created yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <h4>{blog.title}</h4>
              <p>{blog.content.substring(0, 100)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;