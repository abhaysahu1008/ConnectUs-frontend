import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, skills, about } = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body flex items-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <div className="card-actions justify-center mt-3">
            <button className="btn bg-blue-700">Ignore</button>
            <button className="btn bg-pink-800">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
