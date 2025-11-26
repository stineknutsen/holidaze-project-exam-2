import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";

const Card = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 700px) {
    width: 100%;
    height: 200px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Country = styled.p`
  font-size: 0.9rem;
  color: #666;
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
  color: #444;
`;

const BookingButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 1rem;
`;

const BookingButton = styled(Button)`
  background: #f2e8ff;
  color: #4a1cae;
  border: 1px solid #d7c7f5;
  width: 200px;
  text-align: center;
  font-weight: 600;

  &:hover {
    background: #e8dfff;
  }
`;

const VenueCard = ({ venue }) => {
  const { id, media, location, name, price, maxGuests, bookings } = venue;

  return (
    <Link
      to={`/venues/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <Image src={media?.[0]?.url} alt={media?.[0]?.alt || name} />

        <Info>
          <Country>{location?.country}</Country>
          <Title>{name}</Title>
          <Price>{price} NOK /night</Price>
          <Guests>Maximum {maxGuests} guests</Guests>

          <BookingButtonWrapper>
            <BookingButton type="button" onClick={(e) => e.preventDefault()}>
              View bookings ({bookings?.length || 0})
            </BookingButton>
          </BookingButtonWrapper>
        </Info>
      </Card>
    </Link>
  );
};

export default VenueCard;
