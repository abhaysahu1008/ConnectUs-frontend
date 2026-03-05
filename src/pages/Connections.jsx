import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!userConnections || userConnections.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <span>No connections found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Your Connections</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div key={_id} className="card lg:card-side bg-base-100 shadow-xl">
              <figure className="p-6">
                <img
                  src={photoUrl}
                  alt="user"
                  className="rounded-xl h-32 w-32 object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm opacity-70">
                  {age} • {gender}
                </p>

                {about && <p className="text-sm">{about}</p>}

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-primary badge-outline"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
