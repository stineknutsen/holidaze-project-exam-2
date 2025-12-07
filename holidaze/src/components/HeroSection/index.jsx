import { useState, useEffect } from "react";
import VenuesGrid from "../VenuesGrid";
import styled from "styled-components";
import { useApi } from "../../hooks/useApi";
import Button from "../Button";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 50px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.5rem;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid white;
  border-radius: 25px;
  width: 100%;
  font-size: 1rem;
`;

const GuestsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GuestsInput = styled.input`
  width: 80px;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GuestsLabel = styled.span`
  font-size: 1rem;
  color: #111;
  white-space: nowrap;
`;

const PaginationButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const ITEMS_PER_PAGE = 12;

export default function VenueSearchPage() {
  const { request, isLoading, isError } = useApi();

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);

  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await request("/holidaze/venues?_limit=500");
        const safeData = Array.isArray(data) ? data : [];

        const sortedVenues = safeData
          .filter((v) => v && v.created)
          .sort((a, b) => new Date(b.created) - new Date(a.created));

        setVenues(sortedVenues);
        applyFilterAndPagination(sortedVenues, 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenues();
  }, []);

  const applyFilterAndPagination = (list, pageNumber = 1) => {
    const query = destination.toLowerCase();

    let results = list.filter((venue) => {
      if (!venue || !venue.name) return false;

      const matchesDestination =
        query === "" ||
        venue.name?.toLowerCase().includes(query) ||
        venue.description?.toLowerCase().includes(query) ||
        venue.location?.city?.toLowerCase().includes(query) ||
        venue.location?.country?.toLowerCase().includes(query);

      const matchesGuests = venue.maxGuests >= guests;

      return matchesDestination && matchesGuests;
    });

    results.sort((a, b) => new Date(b.created) - new Date(a.created));

    const start = (pageNumber - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setFilteredVenues(results.slice(start, end));
    setPage(pageNumber);
    setTotalPages(Math.ceil(results.length / ITEMS_PER_PAGE));
  };

  const handleSearch = () => applyFilterAndPagination(venues, 1);
  const handlePageChange = (newPage) =>
    applyFilterAndPagination(venues, newPage);

  return (
    <div>
      <SearchWrapper>
        <SearchContainer>
          <Input
            placeholder="Destination, city, or country"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <GuestsWrapper>
            <GuestsInput
              type="number"
              min={1}
              value={guests}
              onChange={(event) =>
                setGuests(Math.max(1, parseInt(event.target.value) || 1))
              }
            />
            <GuestsLabel>{guests === 1 ? "guest" : "guests"}</GuestsLabel>
          </GuestsWrapper>
          <Button type="button" $variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </SearchContainer>
      </SearchWrapper>

      {isLoading && <p>Loading venues...</p>}
      {isError && <p>Error: {isError}</p>}

      {!isError && <VenuesGrid venues={filteredVenues} />}

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <PaginationButton
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </PaginationButton>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            return (
              <PaginationButton
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationButton>
            );
          })}
          <PaginationButton
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </PaginationButton>
        </div>
      )}

      {!isLoading && !isError && filteredVenues.length === 0 && (
        <p>No venues match your search.</p>
      )}
    </div>
  );
}
