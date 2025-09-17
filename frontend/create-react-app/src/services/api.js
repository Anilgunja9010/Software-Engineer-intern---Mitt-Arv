
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Attach JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Blogs APIs
export const getBlogs = () => api.get("/blogs");
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (newBlog) => api.post("/blogs", newBlog);
export const updateBlog = (id, updatedBlog) =>
  api.put(`/blogs/${id}`, updatedBlog);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// User APIs
export const register = (data) => api.post("/users/register", data);
export const login = (data) => api.post("/users/login", data);

// Profile API (GET only)
export const getProfile = () => api.get("/users/me");

export default api;