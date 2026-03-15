import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);
  // console.log("FEED: ", userFeed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
      // console.log("FEED:", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-950 min-h-[80vh]">
      {userFeed?.length > 0 ? (
        <UserCard user={userFeed[0]} />
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Feed;
