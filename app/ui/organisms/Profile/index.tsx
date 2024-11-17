import React, { useEffect, useState } from "react";
import OrganizationProfile from "./OrganizationProfile";
import PersonalProfile from "./PersonalProfile";
// import { useProfile } from "../../../hooks/auth/auth.hook";
import { ACCOUNT_TYPE } from "@/app/utils/enums";

const Profile = () => {
  const initialProfileData = (() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null"
      ) {
        try {
          return JSON.parse(storedProfileData); // Return parsed data if valid
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      return null;
    }
  })();
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isProfileReady, setIsProfileReady] = useState(false);

  console.log(profileData, "profileData");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null" &&
        JSON.stringify(initialProfileData) !== storedProfileData
      ) {
        try {
          setProfileData(JSON.parse(storedProfileData));
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      setIsProfileReady(true);
    }
  }, [initialProfileData]);

  const userType = profileData?.accountType;
  return userType === ACCOUNT_TYPE.ORGANISATION ? (
    <OrganizationProfile />
  ) : (
    <PersonalProfile />
  );
};

export default Profile;
