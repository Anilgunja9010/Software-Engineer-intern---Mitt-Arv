import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetails from "./pages/BlogDetails";
import BlogList from "./pages/BlogList";
import Profile from "./pages/Profile"; // Profile import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
      </Routes>
    </Router>
  );
}

export default App;