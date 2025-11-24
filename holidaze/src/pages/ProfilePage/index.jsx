import React, { useContext } from "react";
import ProfileInformation from "../../components/UserInformation";
import { UserContext } from "../../context/UserContext";
import Bookings from "../../components/ProfileBookings";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isLoading, isError } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading profile</p>;

  if (!user) return null;

  return (
    <div>
      <ProfileInformation user={user} />

      {/* <Bookings user={user} /> */}
    </div>
  );
};

export default ProfilePage;
