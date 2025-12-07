import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "../../Calendar";
import { useApi } from "../../../hooks/useApi";
import useNotification from "../../../hooks/useNotification";
import Button from "../../Button";

const Summary = styled.div`
  margin-top: 1rem;
  text-align: center;
  p {
    margin: 0.3rem 0;
  }
`;

export default function BookingForm({ venue }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { loading, error, request } = useApi();
  const { showNotification } = useNotification();

  const handleBookingSelect = (bookingData) => {
    setSelectedBooking(bookingData);
  };

  const handleConfirm = async () => {
    if (!selectedBooking) return;
    const token = localStorage.getItem("accessToken");

    const payload = {
      dateFrom: selectedBooking.start.toISOString(),
      dateTo: selectedBooking.end.toISOString(),
      guests: selectedBooking.guests,
      venueId: selectedBooking.venueId,
    };

    try {
      await request("/holidaze/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
        },
        body: payload,
      });
      showNotification(
        "success",
        "Booking confirmed! You can now see it on your profile."
      );
      setSelectedBooking(null);
    } catch (error) {
      showNotification("error", error.message || "Failed to confirm booking");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Book your stay at {venue.name}</h3>
      <Calendar venue={venue} onBookingSelect={handleBookingSelect} />

      {selectedBooking && (
        <Summary>
          <p>
            Selected: {selectedBooking.start.toLocaleDateString()} –{" "}
            {selectedBooking.end.toLocaleDateString()}
          </p>
          <p>Guests: {selectedBooking.guests}</p>
          <p>
            Total Price: <strong>{selectedBooking.totalPrice} NOK</strong>
          </p>
          <Button $variant="primary" onClick={handleConfirm} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>

          {error && <p>{error.message}</p>}
        </Summary>
      )}
    </div>
  );
}
