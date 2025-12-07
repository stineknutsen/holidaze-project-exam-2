import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import formatDate from "../../utils/formatDate";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.tertiary};

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 100%;
    height: 200px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
`;

const Country = styled.p`
  font-size: 0.9rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.4rem;
`;

const Price = styled.p`
  margin-top: 0.5rem;
  font-weight: 500;
`;

const Guests = styled.p`
  font-size: 0.9rem;
`;

const BookingButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 1rem;
`;

const BookingDiv = styled.div`
  display: flex;
  padding: 0.5rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.tertiary};
`;

const YourVenueCard = ({ venue }) => {
  const { id, media, location, name, price, maxGuests, bookings } = venue;
  const [showVenueBookingsModal, setShowVenueBookingsModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setShowVenueBookingsModal(true);
  };

  const closeModal = () => setShowVenueBookingsModal(false);

  return (
    <section>
      <Link to={`/venues/${id}`}>
        <Card>
          <Image src={media?.[0]?.url} alt={media?.[0]?.alt || name} />

          <Info>
            <Country>
              {location?.city}, {location?.country}
            </Country>
            <Title>{name}</Title>
            <Price>{price} NOK /night</Price>
            <Guests>Maximum {maxGuests} guests</Guests>

            <BookingButtonWrapper>
              <Button $variant="secondary" type="button" onClick={openModal}>
                View bookings ({bookings?.length || 0})
              </Button>
            </BookingButtonWrapper>
          </Info>
        </Card>
      </Link>

      {showVenueBookingsModal && (
        <Modal onClose={closeModal}>
          <div>
            <h2>Bookings for {name}</h2>

            <div style={{ display: "flex", fontWeight: 600 }}>
              <span style={{ flex: 1 }}>Customer</span>
              <span style={{ flex: 1 }}>Dates</span>
              <span style={{ width: "80px" }}>Guests</span>
            </div>

            {bookings?.map((booking) => (
              <BookingDiv key={booking.id}>
                <span style={{ flex: 1 }}>{booking.customer?.name}</span>

                <span style={{ flex: 1 }}>
                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </span>

                <span style={{ width: "80px", textAlign: "right" }}>
                  {booking.guests}
                </span>
              </BookingDiv>
            ))}

            <div style={{ marginTop: "2rem", textAlign: "right" }}>
              <Button $variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default YourVenueCard;
