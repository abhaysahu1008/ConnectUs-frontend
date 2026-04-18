import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("abhay@gmail.com");
  const [password, setPassword] = useState("Abhay@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!emailId || !password) return;
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      window.location.href = "/";
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute -top-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute -bottom-px -left-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute -bottom-px -right-px w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400" />

        <div className="bg-gray-950 border border-cyan-500/20 p-6 sm:p-10">
          {/* Header */}
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
              Access Terminal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                Email ID
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="user@domain.com"
                className="w-full bg-black border border-gray-800 focus:border-cyan-500/60 text-white text-sm font-mono px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-gray-800 focus:border-cyan-500/60 text-white text-sm font-mono px-4 py-3 outline-none transition-colors duration-200 placeholder-gray-700"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-mono border border-red-500/20 bg-red-500/5 px-3 py-2 break-words">
                ✗ {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-black text-sm font-mono uppercase tracking-widest transition-colors duration-200 mt-2 touch-manipulation"
            >
              Login →
            </button>
          </form>

          <p className="text-center text-xs font-mono text-gray-600 mt-5 sm:mt-6">
            No account?{" "}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
