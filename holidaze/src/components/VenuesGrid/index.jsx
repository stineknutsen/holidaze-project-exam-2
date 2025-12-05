import { useApi } from "../../hooks/useApi";
import React, { useEffect, useState } from "react";
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

const VenuesGrid = () => {
  const { request, isLoading, isError } = useApi();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await request("/holidaze/venues");
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues: {isError}</div>;
  }

  if (venues.length === 0) {
    return <div>No venues available.</div>;
  }

  console.log(venues.length);

  return (
    <Grid>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </Grid>
  );
};

export default VenuesGrid;
