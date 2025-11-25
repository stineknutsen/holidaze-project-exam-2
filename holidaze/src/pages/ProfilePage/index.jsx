import React, { useContext } from "react";
import ProfileInformation from "../../components/UserInformation";
import { UserContext } from "../../context/UserContext";
import Bookings from "../../components/ProfileBookings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button";

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
      <Button $variant="logout" onClick={logout}>
        Log out
      </Button>
      {/* <Bookings user={user} /> */}
    </div>
  );
};

export default ProfilePage;
