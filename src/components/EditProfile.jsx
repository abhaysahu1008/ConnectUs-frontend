import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    // console.log("Selected:", e.target.value);
  };

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true },
      );
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      // console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 gap-6">
        <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Edit Profile
          </h2>

          <form className="space-y-6" onSubmit={editProfile}>
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter first name"
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter last name"
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">Photo URL</label>
                <input
                  type="url"
                  value={photoUrl}
                  placeholder="Enter photo Url"
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Age</label>
                <input
                  type="number"
                  value={age}
                  placeholder="Enter age"
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Gender</label>
                <select
                  className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm text-gray-300">Skills</label>
              <input
                type="text"
                value={skills}
                placeholder="e.g. React, Node.js, MongoDB"
                className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
              />
            </div>

            {/* About */}
            <div>
              <label className="text-sm text-gray-300">About</label>
              <textarea
                value={about}
                rows="4"
                placeholder="Tell something about yourself..."
                className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition font-semibold text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <UserCard
          user={{ firstName, lastName, age, skills, about, gender, photoUrl }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile edited successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
