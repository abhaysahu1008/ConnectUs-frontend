import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function saveUser(e) {
    e.preventDefault();

    if (!emailId || !password || !firstName || !lastName) {
      setError("Please fill required fields");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          emailId,
          photoUrl,
          password,
          skills: skills.split(",").map((s) => s.trim()),
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));

      setToast(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 gap-6">
        <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Create Profile
          </h2>

          <form className="space-y-6" onSubmit={saveUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div className="form-control mt-4 mb-2">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

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
                  value={age || ""}
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
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Skills</label>
              <input
                type="text"
                value={skills}
                placeholder="React, Node.js, MongoDB"
                className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition font-semibold text-white"
              >
                Sign Up
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Existing User?{" "}
            <span className="text-orange-500 cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile created successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
