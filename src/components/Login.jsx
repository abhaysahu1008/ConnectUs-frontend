import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!emailId || !password) {
      console.log("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="card w-96 bg-base-100 shadow-2xl border border-gray-700">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            {/* Email */}
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

            {/* Password */}
            <div className="form-control mt-4">
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

            {/* Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-orange-600 hover:bg-orange-700 text-white border-none"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <span className="text-orange-500 cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
