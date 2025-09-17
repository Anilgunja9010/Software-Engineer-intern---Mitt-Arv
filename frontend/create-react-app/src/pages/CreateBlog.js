
import React, { useState } from "react";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBlog.css"

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
      };
      await createBlog(newBlog);
      alert("Blog created successfully!");
      setTitle("");
      setContent("");
      setTags("");
      navigate("/blogs");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="create-container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" className="create-btn">
           Create Own Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;