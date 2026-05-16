import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const userConnections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  if (!userConnections || userConnections.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/[0.06]">
            <svg
              className="w-7 h-7 text-cyan-400/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-1">No connections yet</h3>
          <p className="text-white/30 text-sm">
            Start connecting with developers in your feed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <p className="text-cyan-400/60 text-xs font-semibold uppercase tracking-wider mb-1">
            Network
          </p>
          <h2 className="text-3xl font-bold text-white">
            Connections
            <span className="text-cyan-400/60 ml-3 text-xl font-normal">
              {userConnections.length}
            </span>
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userConnections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              about,
              gender,
              photoUrl,
              age,
              skills,
            } = connection;
            return (
              <div
                key={_id}
                className="group bg-[#12121a]/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-black/20"
              >
                <div className="p-5">
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                          src={
                            photoUrl ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                              firstName
                          }
                          alt={`${firstName} ${lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#12121a]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {firstName} {lastName}
                      </h3>
                      <p className="text-cyan-400/60 text-xs mt-0.5">
                        {age} · {gender}
                      </p>
                      {about && (
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mt-2">
                          {about}
                        </p>
                      )}
                    </div>
                  </div>

                  {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium text-cyan-400/70 bg-cyan-400/5 border border-cyan-500/10 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-white/20 bg-white/[0.02] border border-white/[0.06] rounded-lg">
                          +{skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5">
                  <Link to={"/chat/" + _id}>
                    <button className="w-full py-2.5 bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.08] hover:border-cyan-500/30 text-white/60 hover:text-cyan-400 font-medium text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
