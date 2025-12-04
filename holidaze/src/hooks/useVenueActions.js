import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useApi } from "./useApi";

export function useVenueActions() {
  const { request } = useApi();
  const { token } = useContext(UserContext);

  const sanitizeVenuePayload = (data) => {
    const fieldsToRemove = [
      "id",
      "owner",
      "created",
      "updated",
      "bookings",
      "_count",
    ];

    const cleaned = {};
    for (const key in data) {
      if (!fieldsToRemove.includes(key)) {
        cleaned[key] = data[key];
      }
    }
    return cleaned;
  };

  const updateVenue = async (id, data) => {
    const cleanData = sanitizeVenuePayload(data);

    return await request(`/holidaze/venues/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
      },
      body: cleanData,
    });
  };

  const deleteVenue = async (id) => {
    return await request(`/holidaze/venues/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
      },
    });
  };

  return { updateVenue, deleteVenue };
}
