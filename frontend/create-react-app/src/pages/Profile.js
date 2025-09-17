
import React, { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile Error:", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{profile.user.username}'s Profile</h2>
      <p><b>Email:</b> {profile.user.email}</p>

      <h3>My Blogs</h3>
      {profile.blogs.length > 0 ? (
        <ul>
          {profile.blogs.map((b) => (
            <li key={b._id}>
              <b>{b.title}</b> - {b.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs created yet.</p>
      )}
    </div>
  );
}

export default Profile;