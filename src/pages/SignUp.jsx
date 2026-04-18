import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const inputClass =
  "w-full bg-black border border-gray-800 focus:border-cyan-500/60 text-white text-sm font-mono px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-700";
const labelClass =
  "block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2";

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
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      setToast(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 sm:py-20">
        <div
          className="fixed inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative w-full max-w-lg sm:max-w-2xl">
          <div className="absolute -top-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400" />

          <div className="bg-gray-950 border border-cyan-500/20 p-6 sm:p-10">
            <div className="mb-7 sm:mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rotate-45" />
                <span
                  className="text-white font-black text-lg sm:text-xl tracking-tight"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  DEV<span className="text-cyan-400">ZOO</span>
                </span>
              </div>
              <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
                Create Account
              </p>
            </div>

            <form onSubmit={saveUser} className="space-y-4 sm:space-y-5">
              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    placeholder="user@domain.com"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Password *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    placeholder="First"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    placeholder="Last"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Photo + Age + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className={labelClass}>Age</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={age || ""}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={inputClass + " bg-black"}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass}>Photo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className={labelClass}>Skills</label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className={inputClass}
                />
                <p className="text-xs font-mono text-gray-700 mt-1">
                  Comma-separated
                </p>
              </div>

              {/* About */}
              <div>
                <label className={labelClass}>About</label>
                <textarea
                  rows="3"
                  placeholder="Tell something about yourself..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className={inputClass + " resize-none"}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-mono border border-red-500/20 bg-red-500/5 px-3 py-2 break-words">
                  ✗ {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-black text-sm font-mono uppercase tracking-widest transition-colors duration-200 touch-manipulation"
              >
                Create Account →
              </button>
            </form>

            <p className="text-center text-xs font-mono text-gray-600 mt-5 sm:mt-6">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50">
          <div className="bg-black border border-cyan-500/40 px-5 py-3 font-mono text-sm text-cyan-400 shadow-2xl shadow-cyan-500/20 text-center sm:text-left sm:whitespace-nowrap">
            ✓ Account created successfully
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
