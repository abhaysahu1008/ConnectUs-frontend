import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const userProfile = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {userProfile && <EditProfile user={userProfile} />}
    </div>
  );
};

export default Profile;
