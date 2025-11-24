import React, { createContext, useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { request, isLoading, isError } = useApi();
  const username = localStorage.getItem("name");
  const token = localStorage.getItem("accessToken");
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await request(`/holidaze/profiles/${username}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-NOROFF-API-KEY": apiKey,
          },
        });

        setUser(data);
      } catch (err) {
        console.log("Failed to fetch user:", err);
      }
    }

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};
