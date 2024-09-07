import React from "react";
import OrganizationProfile from "./OrganizationProfile";
import PersonalProfile from "./PersonalProfile";

const Profile = () => {
  const userType = "organization";
  return userType === "organization" ? (
    <OrganizationProfile />
  ) : (
    <OrganizationProfile />
  );
};

export default Profile;
