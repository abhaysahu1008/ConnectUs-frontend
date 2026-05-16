import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 focus:bg-white/[0.05] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-white/20";
const labelClass = "block text-sm font-medium text-white/60 mb-2";

const SignUp = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    skills: "",
    about: "",
    photoUrl: "",
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  async function saveUser(e) {
    e.preventDefault();
    const { emailId, password, firstName, lastName } = formData;
    if (!emailId || !password || !firstName || !lastName) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          ...formData,
          age: formData.age ? Number(formData.age) : undefined,
          skills: formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      setToast(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-2xl">
        <div className="bg-[#12121a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 shadow-2xl shadow-black/40">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45 rounded-lg mx-auto mb-4 shadow-lg shadow-cyan-500/20" />
            <h1 className="text-2xl font-bold text-white mb-1">
              Create account
            </h1>
            <p className="text-white/40 text-sm">
              Join the developer community
            </p>
          </div>

          <form onSubmit={saveUser} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.emailId}
                  onChange={(e) => handleChange("emailId", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Password *</label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Age</label>
                <input
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}
                >
                  <option value="" className="bg-[#12121a]">
                    Select
                  </option>
                  <option value="Male" className="bg-[#12121a]">
                    Male
                  </option>
                  <option value="Female" className="bg-[#12121a]">
                    Female
                  </option>
                  <option value="Other" className="bg-[#12121a]">
                    Other
                  </option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Photo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.photoUrl}
                  onChange={(e) => handleChange("photoUrl", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Skills</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB, TypeScript..."
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-white/30 mt-1.5 ml-1">
                Separate with commas
              </p>
            </div>

            <div>
              <label className={labelClass}>About</label>
              <textarea
                rows="3"
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
                value={formData.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className={inputClass + " resize-none"}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-sm">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
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
                <>Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
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
              Account created successfully
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
