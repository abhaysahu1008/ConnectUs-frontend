import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();

  const AllRequests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    const data = res.data.map((request) => request);
    dispatch(addRequest(res.data));
    console.log("Request data:", data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  if (!AllRequests || AllRequests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-info shadow-lg w-fit">
          <span>No connections found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">All Requests</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div key={_id} className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={photoUrl}
                  alt="user"
                  className="rounded-xl h-32 w-32 object-cover"
                />
              </figure>

              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm opacity-70">
                  {age} • {gender}
                </p>

                {about && <p className="text-sm mt-2">{about}</p>}

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 justify-center">
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
                <div className="card-actions justify-center mt-3">
                  <button className="btn bg-blue-700">Reject</button>
                  <button className="btn bg-pink-800">Accept</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
