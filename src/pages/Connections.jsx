import axios from "axios";
import React, { useEffect, useState } from "react";
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rotate-45 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!userConnections || userConnections.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-cyan-500/20 rotate-45 mx-auto mb-5 sm:mb-6" />
          <p className="text-gray-600 font-mono text-xs sm:text-sm uppercase tracking-widest">
            No connections yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-12 px-4 sm:px-6">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="mb-7 sm:mb-10">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">
            DevZoo
          </p>
          <h2
            className="text-2xl sm:text-3xl font-black text-white"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Connections
            <span className="text-cyan-400 ml-2 sm:ml-3 text-lg sm:text-xl">
              [{userConnections.length}]
            </span>
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group relative bg-gray-950 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                <div className="flex gap-3 sm:gap-4 p-4 sm:p-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-gray-700 group-hover:border-cyan-500/40 transition-colors">
                      <img
                        src={photoUrl}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-black text-white text-sm truncate"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {firstName} {lastName}
                    </h3>
                    <p className="text-cyan-400 text-xs font-mono mb-2">
                      {age} · {gender}
                    </p>
                    {about && (
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                        {about}
                      </p>
                    )}
                    {skills && skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 2).map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 2 && (
                          <span className="px-2 py-0.5 text-xs font-mono text-gray-600 border border-gray-800">
                            +{skills.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <Link to={"/chat/" + _id}>
                    <button className="w-full py-2 sm:py-2.5 bg-cyan-400/10 hover:bg-cyan-400 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-black font-mono font-black text-xs uppercase tracking-widest transition-all duration-200 touch-manipulation">
                      Chat →
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
