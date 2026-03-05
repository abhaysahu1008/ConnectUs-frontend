import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const userProfile = useSelector((store) => store.user);
  // console.log("USER PROFILE:", userProfile);

  return <div>{userProfile && <EditProfile user={userProfile} />}</div>;
};

export default Profile;
