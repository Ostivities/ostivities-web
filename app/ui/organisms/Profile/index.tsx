import React from "react";
import OrganizationProfile from "./OrganizationProfile";
import PersonalProfile from "./PersonalProfile";
import { useProfile } from "../../../hooks/auth/auth.hook";
import { ACCOUNT_TYPE } from "@/app/utils/enums";

const Profile = () => {
  const { profile } = useProfile();
  const userType = profile?.data?.data?.data?.accountType;
  return userType === ACCOUNT_TYPE.ORGANISATION ? (
    <OrganizationProfile />
  ) : (
    <PersonalProfile />
  );
};

export default Profile;
