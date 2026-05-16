import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userFeed || userFeed.length === 0) fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      {userFeed?.length > 0 ? (
        <div className="relative z-10 flex flex-col items-center gap-6 w-full">
          <div className="text-center">
            <p className="text-white/30 text-sm font-medium mb-1">
              {userFeed.length} developer{userFeed.length !== 1 ? "s" : ""}{" "}
              available
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-auto" />
          </div>
          <UserCard user={userFeed[0]} />
        </div>
      ) : (
        <div className="relative z-10 text-center px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl rotate-45 mx-auto mb-6 flex items-center justify-center border border-white/[0.06]">
            <svg
              className="w-8 h-8 text-cyan-400/50 -rotate-45"
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
          <h3 className="text-white font-semibold text-lg mb-2">
            No more developers
          </h3>
          <p className="text-white/30 text-sm max-w-sm">
            You&apos;ve seen all available profiles. Check back later for new
            connections.
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
