import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userProfile = useSelector((store) => store.user);
  console.log("USER PROFILE:", userProfile);

  return <div>{userProfile && <EditProfile user={userProfile} />}</div>;
};

export default Profile;
