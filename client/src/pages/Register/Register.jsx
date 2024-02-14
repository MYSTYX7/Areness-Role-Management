import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    role: "",
    password: "",
  });

  const registerUsers = async (e) => {
    e.preventDefault();
    const { email, username, role, password } = data;

    try {
      const { data } = await axios.post("/register", {
        email,
        username,
        role,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successful! Login here for your Profile!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={registerUsers}>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <select
          name="role"
          value={data.role}
          onChange={(e) => {
            setData({ ...data, role: e.target.value });
          }}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
