import React from "react";
import OrganizationProfile from "./OrganizationProfile";
import UserProfile from "./UserProfile";

const Profile = () => {
  const userType = "organization";
  return userType === "organization" ? (
    <OrganizationProfile />
  ) : (
    <UserProfile />
  );
};

export default Profile;
