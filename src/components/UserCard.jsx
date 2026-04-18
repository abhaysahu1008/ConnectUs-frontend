import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";

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
    <div className="relative group w-full max-w-xs sm:max-w-sm mx-auto">
      {/* Corner accents */}
      <div className="absolute -top-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-t border-l border-cyan-500/60 z-10 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute -top-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-t border-r border-cyan-500/60 z-10 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute -bottom-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-b border-l border-cyan-500/60 z-10 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute -bottom-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-b border-r border-cyan-500/60 z-10 group-hover:border-cyan-400 transition-colors" />

      <div className="bg-gray-950 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
        {/* Photo */}
        <div className="relative h-48 sm:h-52 bg-black overflow-hidden">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2
              className="text-white font-black text-lg sm:text-xl leading-tight"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {firstName} {lastName}
            </h2>
            <p className="text-cyan-400 text-xs font-mono mt-0.5">
              {age} · {gender}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {about && (
            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
              {about}
            </p>
          )}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-500/20 uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => handleSendRequest("ignore", _id)}
              className="flex-1 py-2.5 border border-gray-700 hover:border-red-500/50 text-gray-500 hover:text-red-400 text-xs font-mono uppercase tracking-widest transition-all duration-200 touch-manipulation"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="flex-1 py-2.5 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-black text-xs font-mono uppercase tracking-widest transition-colors duration-200 touch-manipulation"
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
