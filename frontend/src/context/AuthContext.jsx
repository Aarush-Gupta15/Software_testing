import { createContext, useContext, useEffect, useState } from "react";

import { apiPost } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    try {
      const saved = localStorage.getItem("shopwave-auth");
      if (!saved) {
        return { token: null, user: null };
      }

      const parsed = JSON.parse(saved);
      return {
        token: typeof parsed?.token === "string" ? parsed.token : null,
        user: parsed?.user && typeof parsed.user === "object" ? parsed.user : null,
      };
    } catch {
      return { token: null, user: null };
    }
  });

  useEffect(() => {
    localStorage.setItem("shopwave-auth", JSON.stringify(authState));
  }, [authState]);

  async function login(credentials) {
    const data = await apiPost("/api/auth/login", credentials);
    setAuthState({ token: data.access_token, user: data.user });
  }

  async function register(details) {
    const data = await apiPost("/api/auth/register", details);
    setAuthState({ token: data.access_token, user: data.user });
  }

  function logout() {
    setAuthState({ token: null, user: null });
  }

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        user: authState.user,
        isAuthenticated: Boolean(authState.token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
