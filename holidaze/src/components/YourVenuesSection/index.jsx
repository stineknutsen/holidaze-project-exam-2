import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal";
import AddVenueForm from "../Forms/AddVenueForm";
import { useApi } from "../../hooks/useApi";
import VenueCard from "../VenueCard";
import Button from "../Button";

const YourVenuesSection = () => {
  const { user, token } = useContext(UserContext);
  const { request } = useApi();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await request(`/holidaze/profiles/${user.name}/venues`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
          },
        });
        setVenues(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section>
      <header>
        <h2>Your venues</h2>
        <Button $variant="primary" onClick={() => setShowModal(true)}>
          New venue
        </Button>
      </header>

      {loading ? (
        <p>Loading venues...</p>
      ) : venues.length === 0 ? (
        <p>You have no venues yet.</p>
      ) : (
        venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </section>
  );
};

export default YourVenuesSection;
