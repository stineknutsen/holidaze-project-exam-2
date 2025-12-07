import React from "react";
import styled from "styled-components";
import VenueCard from "../VenueCard";

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  a {
    color: inherit;
    text-decoration: none;
  }

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const VenuesGrid = ({ venues = [] }) => {
  return (
    <Grid>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </Grid>
  );
};

export default VenuesGrid;
