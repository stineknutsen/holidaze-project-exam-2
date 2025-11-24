import React from "react";
import styled from "styled-components";
import Button from "../Button";

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border: none;
  border-radius: 20px;
`;

const Banner = styled.div`
  width: 100%;
  object-fit: cover;
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UnderBanner = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: center;
`;

const EditButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
`;

const ProfileInformation = ({ user }) => {
  return (
    <UserProfile>
      <Banner>
        <EditButton>
          <Button variant="secondary">Edit Profile</Button>
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
          <p>{user.isManager ? "Venue Manager" : "Customer"}</p>
        </Information>
      </UnderBanner>
    </UserProfile>
  );
};

export default ProfileInformation;
