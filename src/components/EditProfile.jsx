import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 focus:bg-white/[0.05] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-white/20";
const labelClass = "block text-sm font-medium text-white/60 mb-2";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [toast, setToast] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const editProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true },
      );
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const previewUser = {
    firstName,
    lastName,
    age,
    skills,
    about,
    gender,
    photoUrl,
  };

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0f] px-4 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-center relative z-10">
          {/* Form */}
          <div className="w-full max-w-xl">
            <div className="bg-[#12121a]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-cyan-400/60 text-xs font-semibold uppercase tracking-wider mb-1">
                    Profile Settings
                  </p>
                  <h2 className="text-2xl font-bold text-white">
                    Edit Profile
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewOpen(!previewOpen)}
                  className="lg:hidden px-4 py-2 bg-white/[0.03] border border-white/[0.08] text-cyan-400 text-sm font-medium rounded-lg hover:bg-white/[0.06] transition-all"
                >
                  {previewOpen ? "Hide Preview" : "Show Preview"}
                </button>
              </div>

              {previewOpen && (
                <div className="lg:hidden mb-8 pb-8 border-b border-white/[0.06]">
                  <UserCard user={previewUser} />
                </div>
              )}

              <form onSubmit={editProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      className={inputClass + " appearance-none cursor-pointer"}
                    >
                      <option value="" className="bg-[#12121a]">
                        Select
                      </option>
                      <option className="bg-[#12121a]">Male</option>
                      <option className="bg-[#12121a]">Female</option>
                      <option className="bg-[#12121a]">Other</option>
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
                      setSkills(
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                    className={inputClass}
                  />
                  <p className="text-xs text-white/30 mt-1.5 ml-1">
                    Separate with commas
                  </p>
                </div>

                <div>
                  <label className={labelClass}>About</label>
                  <textarea
                    rows="4"
                    value={about}
                    placeholder="Tell something about yourself..."
                    onChange={(e) => setAbout(e.target.value)}
                    className={inputClass + " resize-none"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Desktop preview */}
          <div className="hidden lg:flex flex-col items-center gap-4 sticky top-24">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              Live Preview
            </p>
            <UserCard user={previewUser} />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[#12121a] border border-cyan-500/30 rounded-xl px-6 py-3.5 flex items-center gap-3 shadow-2xl shadow-cyan-500/10">
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-cyan-400">
              Profile updated successfully
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
