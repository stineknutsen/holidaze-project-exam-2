import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  height: 100%;

  &:hover {
    border-radius: 10px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 235px;

  object-fit: cover;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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

const VenueCard = ({ venue }) => {
  const { id, media, location, name, price } = venue;

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
        </Info>
      </Card>
    </Link>
  );
};

export default VenueCard;
