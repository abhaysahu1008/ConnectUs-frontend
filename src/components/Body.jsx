import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  // console.log("Body render");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(error);

        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // console.log("Body useEffect called");

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
