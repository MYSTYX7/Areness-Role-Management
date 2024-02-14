import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          navigate("/login");
        });
    }
  }, [user, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
