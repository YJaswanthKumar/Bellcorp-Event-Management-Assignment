import { useState} from "react";
import { AuthContext } from "./AuthContextObject";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("bellcorp_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("bellcorp_user", JSON.stringify(userData));
    localStorage.setItem("bellcorp_token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bellcorp_user");
    localStorage.removeItem("bellcorp_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};