import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user && user.role !== "user") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello User @{user.username}</h1>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
