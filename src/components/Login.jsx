import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="card w-96 bg-base-100 shadow-2xl border border-gray-700">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Welcome Back
          </h2>

          {/* Email */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Button */}
          <div className="form-control mt-6">
            <button className="btn bg-orange-600 hover:bg-orange-700 text-white border-none">
              Login
            </button>
          </div>

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
