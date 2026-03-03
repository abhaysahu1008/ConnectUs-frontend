import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  // console.log("User Data", userData);
  // if (!userData) return null;

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm fixed">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            <p>🗣️ConnectUs</p>
          </Link>
        </div>
        <div className="flex gap-2 mx-5">
          {userData && (
            <div className="flex items-center">
              <p className="">Welcome {userData.firstName}</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={"/profile"} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/settings"}>Settings</Link>
                  </li>
                  <li>
                    <button>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
