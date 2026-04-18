import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const inputClass =
  "w-full bg-black border border-gray-800 focus:border-cyan-500/60 text-white text-sm font-mono px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-700";
const labelClass =
  "block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true },
      );
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black px-4 pt-16 sm:pt-20 pb-12">
        <div
          className="fixed inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Layout: form + desktop preview side by side */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Form */}
          <div className="relative w-full max-w-xl mx-auto lg:mx-0">
            <div className="absolute -top-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400" />

            <div className="bg-gray-950 border border-cyan-500/20 p-5 sm:p-8">
              <div className="mb-6 sm:mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">
                    DevZoo
                  </p>
                  <h2
                    className="text-xl sm:text-2xl font-black text-white"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    Edit Profile
                  </h2>
                </div>
                {/* Mobile preview toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewOpen(!previewOpen)}
                  className="lg:hidden px-3 py-2 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest transition-all hover:bg-cyan-400/5"
                >
                  {previewOpen ? "Hide" : "Preview"}
                </button>
              </div>

              {/* Mobile preview panel */}
              {previewOpen && (
                <div className="lg:hidden mb-6 pb-6 border-b border-gray-800 flex justify-center">
                  <UserCard
                    user={{
                      firstName,
                      lastName,
                      age,
                      skills,
                      about,
                      gender,
                      photoUrl,
                    }}
                  />
                </div>
              )}

              <form onSubmit={editProfile} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="First"
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Last"
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Age</label>
                    <input
                      type="number"
                      value={age}
                      placeholder="25"
                      onChange={(e) => setAge(Number(e.target.value))}
                      className={inputClass}
                    />
                  </div>
                  <div>
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
                </div>

                <div>
                  <label className={labelClass}>Photo URL</label>
                  <input
                    type="url"
                    value={photoUrl}
                    placeholder="https://..."
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Skills</label>
                  <input
                    type="text"
                    value={Array.isArray(skills) ? skills.join(", ") : skills}
                    placeholder="React, Node.js, MongoDB"
                    onChange={(e) =>
                      setSkills(e.target.value.split(",").map((s) => s.trim()))
                    }
                    className={inputClass}
                  />
                  <p className="text-xs font-mono text-gray-700 mt-1">
                    Comma-separated
                  </p>
                </div>

                <div>
                  <label className={labelClass}>About</label>
                  <textarea
                    rows="3"
                    value={about}
                    placeholder="Tell something about yourself..."
                    onChange={(e) => setAbout(e.target.value)}
                    className={inputClass + " resize-none"}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-black text-sm font-mono uppercase tracking-widest transition-colors duration-200 touch-manipulation"
                >
                  Save Changes →
                </button>
              </form>
            </div>
          </div>

          {/* Desktop preview */}
          <div className="hidden lg:flex flex-col items-center gap-3 sticky top-24">
            <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              Preview
            </p>
            <UserCard
              user={{
                firstName,
                lastName,
                age,
                skills,
                about,
                gender,
                photoUrl,
              }}
            />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50">
          <div className="bg-black border border-cyan-500/40 px-5 py-3 font-mono text-sm text-cyan-400 shadow-2xl text-center sm:text-left sm:whitespace-nowrap">
            ✓ Profile updated successfully
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
