// src/api/api.js
import axios from "axios";

// Set the base URL for API requests
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Modify as needed
});

// User sign-up
export const signUp = async (userData) => {
  return await api.post("/signup", userData);
};

// User login
export const login = async (userData) => {
  return await api.post("/login", userData);
};

// Fetch user profile
export const fetchUserProfile = async () => {
  return await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  return await api.put("/profile", profileData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
