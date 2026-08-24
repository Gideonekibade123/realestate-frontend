// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("re_user");
//     return saved ? JSON.parse(saved) : null;
//   });
//   const [token, setToken] = useState(() => localStorage.getItem("re_token") || null);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem("re_user", JSON.stringify(userData));
//     localStorage.setItem("re_token", authToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("re_user");
//     localStorage.removeItem("re_token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);




import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("re_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("re_token") || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("re_refresh") || null);

  const login = (userData, authToken, refreshTokenValue) => {
    setUser(userData);
    setToken(authToken);
    setRefreshToken(refreshTokenValue);
    localStorage.setItem("re_user", JSON.stringify(userData));
    localStorage.setItem("re_token", authToken);
    localStorage.setItem("re_refresh", refreshTokenValue);
  };

  // Called by authFetch when the access token is refreshed silently
  const updateToken = (newAccessToken) => {
    setToken(newAccessToken);
    localStorage.setItem("re_token", newAccessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("re_user");
    localStorage.removeItem("re_token");
    localStorage.removeItem("re_refresh");
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);