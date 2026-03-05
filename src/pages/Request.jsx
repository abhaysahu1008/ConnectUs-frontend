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
    const data = res.data.map((request) => request);
    dispatch(addRequest(res.data));
    console.log("Request data:", data);
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <span>No request found.</span>
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
            <div
              key={_id}
              className="card lg:card-side bg-base-100 shadow-xl p-4 items-center"
            >
              <figure>
                <img
                  src={photoUrl}
                  alt="user"
                  className="rounded-xl h-28 w-28 object-cover"
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

                <div className="card-actions mt-3">
                  <button
                    className="btn bg-red-800 btn-sm"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn bg-blue-800 btn-sm"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
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
