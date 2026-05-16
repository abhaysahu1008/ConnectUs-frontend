import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const AllRequests = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  if (!AllRequests || AllRequests.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/[0.06]">
            <svg
              className="w-7 h-7 text-violet-400/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-1">No pending requests</h3>
          <p className="text-white/30 text-sm">
            Connection requests will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <p className="text-violet-400/60 text-xs font-semibold uppercase tracking-wider mb-1">
            Invitations
          </p>
          <h2 className="text-3xl font-bold text-white">
            Requests
            <span className="text-violet-400/60 ml-3 text-xl font-normal">
              {AllRequests.length}
            </span>
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {firstName} {lastName}
                      </h3>
                      <p className="text-violet-400/60 text-xs mt-0.5">
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
                          className="px-2.5 py-1 text-xs font-medium text-violet-400/70 bg-violet-400/5 border border-violet-500/10 rounded-lg"
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

                <div className="flex gap-3 px-5 pb-5">
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="flex-1 py-2.5 border border-white/[0.08] hover:border-red-500/30 hover:bg-red-500/5 text-white/50 hover:text-red-400 font-medium text-sm rounded-xl transition-all duration-300"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/20"
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
