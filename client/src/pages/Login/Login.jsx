import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      setData({ email: "", password: "" });
      const profileResponse = await axios.get("/profile");
      const { role } = profileResponse.data;
      setUser({ ...profileResponse.data, role });
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
