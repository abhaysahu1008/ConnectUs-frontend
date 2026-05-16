import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { to: "/", label: "Feed" },
    { to: "/connections", label: "Connections" },
    { to: "/requests", label: "Requests" },
    { to: "/premium", label: "Premium" },
    { to: "/profile", label: "Profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45 rounded-sm group-hover:rotate-[60deg] transition-transform duration-500 shadow-lg shadow-cyan-500/20" />
            <span className="text-white font-bold text-xl tracking-tight">
              Dev<span className="text-cyan-400">Zoo</span>
            </span>
          </Link>

          {userData ? (
            <div className="flex items-center gap-1">
              <div className="hidden lg:flex items-center gap-0.5 mr-2">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive(to)
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {label}
                    {isActive(to) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="hidden lg:block relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      alt="avatar"
                      src={
                        userData.photoUrl ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                          userData.firstName
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white/90 text-sm font-medium leading-tight">
                      {userData.firstName}
                    </p>
                    <p className="text-white/30 text-[10px] leading-tight">
                      Online
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-white/30 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#12121a] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-white/[0.06]">
                      <p className="text-white font-medium text-sm">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {userData.emailId}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.04] transition-all text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Edit Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/5 transition-all text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.04] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-white/70 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                  />
                  <span
                    className={`block h-0.5 bg-white/70 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block h-0.5 bg-white/70 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                  />
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-white/50 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {userData && (
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${menuOpen ? "visible" : "invisible"}`}
        >
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#0f0f16] border-l border-white/[0.06] transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-6 pt-20">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.06]">
                <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={
                      userData.photoUrl ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                        userData.firstName
                    }
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-white/40 text-xs">{userData.emailId}</p>
                </div>
              </div>
              <div className="space-y-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(to)
                        ? "text-cyan-400 bg-cyan-500/10"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {label}
                    {isActive(to) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-white/[0.06]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/5 transition-all text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
