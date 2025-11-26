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
        <Button $variant="logout" onClick={logout}>
          Log out
        </Button>
      </div>
      {/* <ProfileBookings/> */}
      {user.venueManager && <YourVenuesSection />}
      {!user.venueManager && <p>You are not a manager</p>}
    </div>
  );
};

export default ProfilePage;
