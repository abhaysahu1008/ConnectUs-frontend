import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, gender, skills, about, age } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    await axios.post(
      BASE_URL + `/request/send/${status}/${id}`,
      {},
      { withCredentials: true },
    );

    dispatch(removeFeedUser(id));
  };

  return (
    <div className="flex justify-center">
      <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
        <figure className="pt-6">
          <img
            src={photoUrl}
            alt="user"
            className="w-28 h-28 rounded-full object-cover border-4 border-base-200"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-bold">
            {firstName} {lastName}
          </h2>

          <p className="text-sm opacity-70">
            {age} • {gender}
          </p>

          {about && <p className="text-sm mt-2 text-gray-500">{about}</p>}

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {skills.map((skill, index) => (
                <span key={index} className="badge badge-outline badge-primary">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="card-actions justify-center gap-4 mt-5">
            <button
              className="btn btn-outline btn-error"
              onClick={() => handleSendRequest("ignore", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
