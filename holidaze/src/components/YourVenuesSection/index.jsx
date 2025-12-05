import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal";
import AddVenueForm from "../Forms/AddVenueForm";
import { useApi } from "../../hooks/useApi";
import YourVenueCard from "../YourVenueCard";
import Button from "../Button";
import styled from "styled-components";

const YourVenuesSectionWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

const YourVenuesHeader = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const YourVenuesSection = () => {
  const { user, token } = useContext(UserContext);
  const { request } = useApi();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await request(
          `/holidaze/profiles/${user.name}/venues?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setVenues(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <YourVenuesSectionWrapper>
      <YourVenuesHeader>
        <h2>Your venues</h2>
        <Button $variant="primary" onClick={() => setShowAddVenueModal(true)}>
          New venue
        </Button>
      </YourVenuesHeader>

      {loading ? (
        <p>Loading venues...</p>
      ) : venues.length === 0 ? (
        <p>You have no venues yet.</p>
      ) : (
        venues.map((venue) => <YourVenueCard key={venue.id} venue={venue} />)
      )}

      {showAddVenueModal && (
        <Modal onClose={() => setShowAddVenueModal(false)}>
          <AddVenueForm
            onSubmit={async (data) => {
              const created = await request("/holidaze/venues", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
                  "Content-Type": "application/json",
                },
                body: data,
              });

              setVenues((prev) => [...prev, created]);
              setShowAddVenueModal(false);
            }}
            onCancel={() => setShowAddVenueModal(false)}
          />
        </Modal>
      )}
    </YourVenuesSectionWrapper>
  );
};

export default YourVenuesSection;
