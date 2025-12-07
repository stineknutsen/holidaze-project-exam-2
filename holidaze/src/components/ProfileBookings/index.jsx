import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styled from "styled-components";
import useNotification from "../../hooks/useNotification";
import { Link } from "react-router-dom";

const TableWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 60px 60px;
  background: ${(props) => props.theme.colors.primary};
  padding: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  border-bottom: 2px solid ${(props) => props.theme.colors.tertiary};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 60px 60px;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.tertiary};

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProfileBookings({ profileName }) {
  const { request, isLoading, isError } = useApi();
  const [bookings, setBookings] = useState([]);

  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const data = await request(
          `/holidaze/profiles/${profileName}?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );

        const sorted = (data.bookings || [])
          .filter((b) => new Date(b.dateTo) > new Date())
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

        setBookings(sorted);
      } catch (error) {
        showNotification("error", error.message || "Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [profileName]);

  const handleDelete = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await request(`/holidaze/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
        },
      });

      setBookings(bookings.filter((b) => b.id !== bookingId));

      showNotification("success", "Booking deleted successfully");
    } catch (error) {
      showNotification("error", error.message || "Failed to delete booking");
    }
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings: {isError}</p>;
  if (bookings.length === 0) return <p>No upcoming bookings.</p>;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Upcoming bookings
      </h2>
      <TableWrapper>
        <TableHeader>
          <span>Venue</span>
          <span>Dates</span>
          <span>Guests</span>
          <span>Delete</span>
        </TableHeader>

        {bookings.map((b) => (
          <Link to={`/venues/${b.venue?.id}`} key={b.id}>
            <TableRow>
              <span>{b.venue?.name || "Unknown venue"}</span>
              <span>
                {new Date(b.dateFrom).toLocaleDateString("no-NO")}–
                {new Date(b.dateTo).toLocaleDateString("no-NO")}
              </span>
              <span>{b.guests}</span>
              <DeleteButton onClick={() => handleDelete(b.id)}>
                Delete
              </DeleteButton>
            </TableRow>
          </Link>
        ))}
      </TableWrapper>
    </div>
  );
}
