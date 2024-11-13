// src/components/Profile/Profile.js
import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../../api/api";

const Profile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await fetchUserProfile();
      setProfileData(data);
      setEditData(data);
    };
    getProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(editData);
    setProfileData(editData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
