import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, gender, skills, about, age } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    await axios.post(
      BASE_URL + `/request/send/${status}/${id}`,
      {},
      { withCredentials: true },
    );
    dispatch(removeFeedUser(id));
  };

  return (
    <div className="relative w-full max-w-sm mx-auto group">
      <div className="bg-[#12121a]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 hover:border-white/[0.12] hover:shadow-cyan-500/5">
        {/* Photo */}
        <div className="relative h-64 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
          <img
            src={
              photoUrl ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + firstName
            }
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/40 to-transparent" />

          {/* Top badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80">
              {age} years
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-white font-bold text-xl leading-tight">
              {firstName} {lastName}
            </h2>
            <p className="text-cyan-400/80 text-sm font-medium mt-1 capitalize">
              {gender}
            </p>
          </div>
        </div>

        <div className="p-5">
          {about && (
            <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-3">
              {about}
            </p>
          )}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium text-cyan-400/80 bg-cyan-400/5 border border-cyan-500/10 rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-3 py-1 text-xs font-medium text-white/30 bg-white/[0.02] border border-white/[0.06] rounded-lg">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => handleSendRequest("ignore", _id)}
              className="flex-1 py-3 border border-white/[0.08] hover:border-red-500/30 hover:bg-red-500/5 text-white/50 hover:text-red-400 text-sm font-medium rounded-xl transition-all duration-300"
            >
              Pass
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
