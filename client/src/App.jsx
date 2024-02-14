import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import { Admin } from "./pages/Admin";
import { User } from "./pages/User";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "https://areness-role-management-server.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
      </UserContextProvider>
    </Router>
  );
};

export default App;
