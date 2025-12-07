import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import styled from "styled-components";
import Modal from "../../components/Modal";
import EditVenueForm from "../../components/Forms/EditVenueForm";
import { useVenueActions } from "../../hooks/useVenueActions";
import useNotification from "../../hooks/useNotification";
import BookingForm from "../../components/Forms/BookingForm";

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Banner = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Location = styled.p`
  margin: 0 0 1.5rem 0;
`;

const InfoBox = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.primary};
`;

const Section = styled.section`
  margin-top: 3rem;
`;

const Amenities = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ImgList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const SmallImg = styled.img`
  width: 180px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const VenuePage = () => {
  const { id } = useParams();
  const { request, isLoading } = useApi();
  const { user, token } = useContext(UserContext);
  const [showEditVenueModal, setShowEditVenueModal] = useState(false);
  const [venue, setVenue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateVenue, deleteVenue } = useVenueActions();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    async function loadVenue() {
      try {
        const data = await request(
          `/holidaze/venues/${id}?_owner=true&_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
            },
          }
        );
        setVenue(data);
      } catch (error) {
        showNotification("error", error.message || "Failed to load venue");
      }
    }

    loadVenue();
  }, []);

  if (isLoading || !venue) return <p>Loading...</p>;

  const isOwner = user?.name === venue.owner?.name;

  const handleUpdateVenue = async (formData) => {
    setIsSubmitting(true);
    try {
      const updated = await updateVenue(id, formData);
      setVenue(updated);
      setShowEditVenueModal(false);
    } catch (error) {
      showNotification("error", error.message || "Failed to update venue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVenue = async () => {
    if (!confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(id);
      setShowEditVenueModal(false);
      showNotification("success", `Venue "${venue.name}" has been deleted!`);
      navigate("/profile");
    } catch (error) {
      showNotification("error", error.message || "Failed to delete venue");
    }
  };

  return (
    <PageWrapper>
      <Banner
        src={venue.media?.[0]?.url}
        alt={venue.media?.[0]?.alt || venue.name}
      />

      <Title>{venue.name}</Title>
      <Location>
        {venue.location?.address && `${venue.location.address}, `}
        {venue.location?.city && `${venue.location.city}, `}
        {venue.location?.country}
      </Location>

      <InfoBox>
        <p>
          <strong>{venue.price} NOK</strong> / night
        </p>
        <p>Max guests: {venue.maxGuests}</p>
      </InfoBox>

      <Amenities>
        <p>Wifi: {venue.meta?.wifi ? "Yes" : "No"}</p>
        <p>Parking: {venue.meta?.parking ? "Yes" : "No"}</p>
        <p>Breakfast: {venue.meta?.breakfast ? "Yes" : "No"}</p>
        <p>Pets: {venue.meta?.pets ? "Yes" : "No"}</p>
      </Amenities>

      <Section>
        <h2>Description</h2>
        <p>{venue.description}</p>
      </Section>

      {venue.media?.length > 1 && (
        <Section>
          <h2>Photos</h2>
          <ImgList>
            {venue.media.slice(1).map((image, i) => (
              <SmallImg key={i} src={image.url} alt={image.alt} />
            ))}
          </ImgList>
        </Section>
      )}

      <Section>
        {isOwner ? (
          <Button
            $variant="secondary"
            onClick={() => setShowEditVenueModal(true)}
          >
            Manage Venue
          </Button>
        ) : (
          <BookingForm venue={venue} />
        )}
      </Section>

      {showEditVenueModal && (
        <Modal onClose={() => setShowEditVenueModal(false)}>
          <EditVenueForm
            venueData={venue}
            onSubmit={handleUpdateVenue}
            onCancel={() => setShowEditVenueModal(false)}
            onDelete={handleDeleteVenue}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </PageWrapper>
  );
};

export default VenuePage;
