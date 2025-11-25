import React, { createContext, useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [username, setUsername] = useState(localStorage.getItem("name"));
  const [userLoading, setUserLoading] = useState(true);

  const { request } = useApi();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function loadUser() {
      if (!username || !token) {
        setUser(null);
        setUserLoading(false);
        return;
      }

      try {
        setUserLoading(true);
        const data = await request(`/holidaze/profiles/${username}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-NOROFF-API-KEY": apiKey,
          },
        });

        setUser(data);
      } catch (error) {
        console.log("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    }

    loadUser();
  }, [username, token]);

  const updateUserProfile = async (updates) => {
    try {
      const updated = await request(`/holidaze/profiles/${username}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-NOROFF-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: updates,
      });

      setUser(updated);
      return updated;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  const login = (profile, newToken) => {
    localStorage.setItem("name", profile.name);
    localStorage.setItem("accessToken", newToken);

    setUsername(profile.name);
    setToken(newToken);
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("accessToken");

    setUsername(null);
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userLoading,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
