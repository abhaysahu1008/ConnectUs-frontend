import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const AllRequests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(addRequest(res.data));
  };

  const reviewRequest = async (status, _id) => {
    await axios.post(
      BASE_URL + `/request/review/${status}/${_id}`,
      {},
      { withCredentials: true },
    );
    dispatch(removeRequest(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!AllRequests || AllRequests.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-violet-500/20 rotate-45 mx-auto mb-5 sm:mb-6" />
          <p className="text-gray-600 font-mono text-xs sm:text-sm uppercase tracking-widest">
            No pending requests
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
            "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
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
            Requests
            <span className="text-violet-400 ml-2 sm:ml-3 text-lg sm:text-xl">
              [{AllRequests.length}]
            </span>
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {AllRequests.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              about,
              gender,
              photoUrl,
              age,
              skills,
            } = request.fromUserId;
            return (
              <div
                key={_id}
                className="group bg-gray-950 border border-gray-800 hover:border-violet-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
                <div className="flex gap-3 sm:gap-4 p-4 sm:p-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border border-gray-700 group-hover:border-violet-500/40 transition-colors">
                      <img
                        src={photoUrl}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-black text-white text-sm truncate"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {firstName} {lastName}
                    </h3>
                    <p className="text-violet-400 text-xs font-mono mb-2">
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
                            className="px-2 py-0.5 text-xs font-mono text-violet-400 bg-violet-400/5 border border-violet-500/20"
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

                <div className="flex gap-2 sm:gap-3 px-4 sm:px-5 pb-4 sm:pb-5">
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="flex-1 py-2 sm:py-2.5 border border-gray-700 hover:border-red-500/50 text-gray-500 hover:text-red-400 font-mono text-xs uppercase tracking-widest transition-all duration-200 touch-manipulation"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="flex-1 py-2 sm:py-2.5 bg-violet-400/10 hover:bg-violet-400 border border-violet-500/30 hover:border-violet-400 text-violet-400 hover:text-black font-mono font-black text-xs uppercase tracking-widest transition-all duration-200 touch-manipulation"
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Request;
