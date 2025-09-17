
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog } from "../services/api";

function SingleBlog() {
  const { id } = useParams(); // blog id from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        const data = await res.json();
        setBlog(data.blog || data); // some APIs wrap in { blog }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Delete failed!");
      }
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!blog) {
    return <p>No blog found</p>;
  }


  const currentUserId = localStorage.getItem("userId");
  const isOwner =
    blog.author === currentUserId || blog.author?._id === currentUserId;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>

      {blog.tags && blog.tags.length > 0 && (
        <p>
          <b>Tags:</b> {blog.tags.join(", ")}
        </p>
      )}

      <p>
        <i>
          By {blog.author?.username || "Unknown"} (
          {blog.author?.email || "no email"})
        </i>
      </p>

      {/* --- Edit/Delete Buttons only if owner --- */}
      {isOwner && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate(`/blogs/${id}/edit`)}
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Edit Blog
          </button>

          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
}

export default SingleBlog;