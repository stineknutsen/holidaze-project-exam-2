import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal";
import EditProfileForm from "../Forms/EditProfileForm";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useNotification from "../../hooks/useNotification";

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  max-height: 200px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const UnderBanner = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  padding: 20px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const EditButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
`;

const ProfileInformation = ({ user }) => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { updateUserProfile } = useContext(UserContext);
  const { showNotification } = useNotification();
  return (
    <>
      <UserProfile>
        <Banner>
          <EditButton>
            <Button
              $variant="secondary"
              onClick={() => setShowEditProfileModal(true)}
            >
              Edit Profile
            </Button>
          </EditButton>
          <BannerImage
            src={user.banner.url}
            alt={user.banner.alt}
            className="profile-image"
          />
        </Banner>

        <UnderBanner>
          <Avatar
            src={user.avatar.url}
            alt={user.avatar.alt}
            className="profile-image"
          />
          <Information>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.bio || "Edit profile to add a bio"} </p>
            <p>{user.venueManager ? "Venue Manager" : "Customer"}</p>
          </Information>
        </UnderBanner>
      </UserProfile>

      {showEditProfileModal && (
        <Modal onClose={() => setShowEditProfileModal(false)}>
          <EditProfileForm
            profile={user}
            onSubmit={async (data) => {
              try {
                await updateUserProfile(data);
                setShowEditProfileModal(false);
              } catch (error) {
                showNotification(
                  "error",
                  error.message || "Failed to update profile"
                );
              }
            }}
            onCancel={() => setShowEditProfileModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfileInformation;
