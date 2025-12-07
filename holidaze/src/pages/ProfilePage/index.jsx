import React, { useContext } from "react";
import ProfileInformation from "../../components/ProfileInformation";
import { UserContext } from "../../context/UserContext";
import ProfileBookings from "../../components/ProfileBookings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button";
import YourVenuesSection from "../../components/YourVenuesSection";

const ProfilePage = () => {
  const { user, userLoading, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  if (userLoading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <ProfileInformation user={user} />
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button $variant="danger" onClick={logout}>
          Log out
        </Button>
      </div>
      {user.venueManager && <YourVenuesSection />}
      {!user.venueManager && <ProfileBookings profileName={user.name} />}
    </div>
  );
};

export default ProfilePage;
