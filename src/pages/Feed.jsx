import axios from "axios";
import React, { useEffect } from "react";
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
    <div className="min-h-screen bg-black flex flex-col justify-center items-center pt-14 sm:pt-16 px-4 py-8">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {userFeed?.length > 0 ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            {userFeed.length} developer{userFeed.length !== 1 ? "s" : ""} in
            feed
          </p>
          <UserCard user={userFeed[0]} />
        </div>
      ) : (
        <div className="text-center px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-cyan-500/20 rotate-45 mx-auto mb-5 sm:mb-6" />
          <p className="text-gray-600 font-mono text-xs sm:text-sm uppercase tracking-widest">
            No more developers
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
