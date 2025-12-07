import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 340px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

export const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 0.5rem;

  button {
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
`;

export const Day = styled.div`
  padding: 0.6rem 0;
  border-radius: 8px;
  cursor: ${({ $booked }) => ($booked ? "not-allowed" : "pointer")};
  background: ${({ $booked, $selected, theme }) =>
    $booked
      ? theme.colors.primary
      : $selected
      ? theme.colors.tertiary
      : "transparent"}; // default, calendar background shows through

  color: ${({ $booked, $selected, theme }) =>
    $booked
      ? "#999"
      : $selected
      ? "#fff"
      : theme.colors.text}; // normal text color

  transition: background 0.2s ease;

  &:hover {
    background: ${({ $booked, $selected, theme }) =>
      $booked
        ? theme.colors.primary
        : $selected
        ? theme.colors.tertiary
        : theme.colors.secondary}; // hover for available day
  }
`;

export default function Calendar({ venue, onBookingSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [guestCount, setGuestCount] = useState(1);

  useEffect(() => {
    if (venue.bookings && venue.bookings.length > 0) {
      const ranges = venue.bookings.map((b) => ({
        from: new Date(b.dateFrom),
        to: new Date(b.dateTo),
      }));
      setBookedRanges(ranges);
    }
  }, [venue.bookings]);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isBooked = (day) =>
    bookedRanges.some((range) => day >= range.from && day <= range.to);

  const isSelected = (day) => {
    if (!selectedStart) return false;
    if (selectedStart && !selectedEnd)
      return day.getTime() === selectedStart.getTime();
    return day >= selectedStart && day <= selectedEnd;
  };

  const handleDayClick = (day) => {
    if (isBeforeToday(day) || isBooked(day)) return;
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day);
      setSelectedEnd(null);
    } else if (day > selectedStart) {
      setSelectedEnd(day);
    }
  };

  useEffect(() => {
    if (selectedStart && selectedEnd) {
      const nights =
        Math.ceil((selectedEnd - selectedStart) / (1000 * 60 * 60 * 24)) + 1;
      const totalPrice = nights * venue.price;
      onBookingSelect({
        start: selectedStart,
        end: selectedEnd,
        guests: guestCount,
        totalPrice,
        venueId: venue.id,
      });
    }
  }, [selectedStart, selectedEnd, guestCount]);

  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const days = getDaysInMonth(year, month);
    const blanks = Array(startOffset).fill(null);

    return [...blanks, ...days].map((day, i) => {
      if (!day) return <div key={i} />;
      const booked = isBooked(day);
      const selected = isSelected(day);
      return (
        <Day
          key={i}
          onClick={() => handleDayClick(day)}
          $booked={booked}
          $selected={selected}
        >
          {day.getDate()}
        </Day>
      );
    });
  };

  return (
    <CalendarContainer>
      <MonthHeader>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() - 1,
                1
              )
            )
          }
        >
          ‹
        </button>
        <h3>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth() + 1,
                1
              )
            )
          }
        >
          ›
        </button>
      </MonthHeader>

      <WeekDays>
        {["mo", "tu", "we", "th", "fr", "sa", "su"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </WeekDays>

      <DaysGrid>{renderDays()}</DaysGrid>

      <div style={{ marginTop: "1rem" }}>
        <label>Guests: </label>
        <input
          type="number"
          min="1"
          max={venue.maxGuests}
          value={guestCount}
          onChange={(event) =>
            setGuestCount(Math.min(Number(event.target.value), venue.maxGuests))
          }
        />
      </div>
    </CalendarContainer>
  );
}
