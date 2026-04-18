import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 bg-black border-b border-cyan-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-5 h-5 sm:w-7 sm:h-7 bg-cyan-400 rotate-45 group-hover:bg-violet-400 transition-colors duration-300" />
            <span
              className="text-white font-black text-lg sm:text-xl tracking-tight"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              DEV<span className="text-cyan-400">ZOO</span>
            </span>
          </Link>

          {userData && (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="px-3 py-1.5 text-xs font-mono text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-200 uppercase tracking-wider"
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1.5 text-xs font-mono text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>

              {/* Desktop avatar */}
              <div className="hidden md:block relative">
                <div className="w-8 h-8 border border-cyan-500/40 overflow-hidden bg-gray-900">
                  <img
                    alt="avatar"
                    src={userData.photoUrl || null}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full" />
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className="block w-5 h-0.5 bg-cyan-400 transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen
                      ? "rotate(45deg) translate(3px, 3px)"
                      : "none",
                  }}
                />
                <span
                  className="block w-5 h-0.5 bg-cyan-400 transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block w-5 h-0.5 bg-cyan-400 transition-all duration-300 origin-center"
                  style={{
                    transform: menuOpen
                      ? "rotate(-45deg) translate(3px, -3px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {userData && (
        <div
          className={`md:hidden fixed top-14 left-0 right-0 z-40 bg-black border-b border-cyan-500/20 transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 border-b border-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 border border-cyan-500/30 overflow-hidden bg-gray-900 flex-shrink-0">
              <img
                alt="avatar"
                src={userData.photoUrl || null}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest truncate">
              {userData.firstName} {userData.lastName}
            </p>
          </div>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-sm font-mono text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 border-b border-gray-900 uppercase tracking-widest transition-all"
            >
              {label}
              <span className="text-cyan-500/40">→</span>
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left px-6 py-4 text-sm font-mono text-red-500 hover:text-red-400 hover:bg-red-500/5 uppercase tracking-widest transition-all"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
