import { useState } from "react";

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const request = async (endpoint, { method = "GET", body, headers } = {}) => {
    setIsLoading(true);
    setIsError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const response = await fetch(`${baseUrl}${endpoint}`, options);
      const json = await response.json();
      const data = json.data || json;

      if (!response.ok) {
        const errorMessage = data?.errors?.[0]?.message;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      setIsError(error.message);
      alert(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { request, isLoading, isError };
}
