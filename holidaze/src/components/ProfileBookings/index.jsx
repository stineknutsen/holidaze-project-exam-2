import React from "react";

const ProfileBookings = ({ user }) => {
  if (user.isManager) {
    return (
      <div className="bookings">
        <h3>Your Venues</h3>
        {user.venues.map((venue) => (
          <div key={venue.id} className="venue">
            <h4>{venue.name}</h4>
            <p>Upcoming bookings: {venue.bookings.length}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="bookings">
        <h3>Your Upcoming Bookings</h3>
        {user.bookings.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          user.bookings.map((booking) => (
            <div key={booking.id} className="booking">
              <p>{booking.venueName}</p>
              <p>{booking.date}</p>
            </div>
          ))
        )}
      </div>
    );
  }
};

export default ProfileBookings;
