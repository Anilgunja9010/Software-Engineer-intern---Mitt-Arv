
import React, { useState } from "react";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

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
      navigate("/blogs"); // redirect to blog list
    } catch (err) {
      console.error("Error creating blog:", err);
      alert(" Failed to create blog");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            height: "120px",
          }}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "5px 0" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;