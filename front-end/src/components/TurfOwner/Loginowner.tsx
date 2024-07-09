import { useState, FormEvent } from "react";
import { axiosInstance } from "../../utils/axios/axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ownerLogin } from "../../services/Redux/slice/ownerSlices";
import React from "react";

function Loginowner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/owner/ownerlogin", {
        email,
        password,
      });
  
      if (response.status === 200 && response.data.status === 200) {
        const token = response.data.token;
        localStorage.setItem("ownerToken", token);
        dispatch(ownerLogin(response.data));

        if (!response.data.turfAdded) {
          navigate("/owner/ownerhome");
        } else {
          navigate("/owner/ownerdashboard");
        }
      } else {
        console.log("Server error occurred");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  


  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className="bg-white shadow-md rounded-lg px-10 pt-8 pb-8 w-96 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Owner Login
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 "
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link
            to="/owner/forgotpassword"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <p className="text-sm">
            Don't have an account?
            <Link
              to="/owner/ownersignup"
              className="text-blue-500 hover:text-blue-700 ml-3"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Loginowner;
