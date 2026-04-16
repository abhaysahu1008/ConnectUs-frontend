import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData);

  return (
    <div className="navbar fixed bg-base-300 shadow-md px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          DevZoo.in
        </Link>
      </div>

      {/* Right side */}
      {userData && (
        <div className="flex items-center gap-4">
          {/* Welcome text */}
          <p className="hidden sm:block">
            Welcome, <span className="font-semibold">{userData.firstName}</span>
          </p>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border">
                <img alt="User Avatar" src={userData.photoUrl || null} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>

              <li>
                <Link to="/premium">Premium</Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
