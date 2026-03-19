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
    if (!userFeed || userFeed.length === 0) {
      fetchFeed();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center">
      {userFeed?.length > 0 ? (
        <div className="w-[350px]">
          <UserCard user={userFeed[0]} />
        </div>
      ) : (
        <p className="text-white">No users found</p>
      )}
    </div>
  );
};

export default Feed;
